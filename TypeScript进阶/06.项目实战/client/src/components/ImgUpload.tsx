import { Icon, Upload,message,Modal } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import React from "react";
import { IResponseData, IResponseError } from "../pages/services/CommonType";
// 图片上传

interface IImgUploaderProps {
  value?:string // 当前图片地址
  onChange:(imgUrl:string) => void // 上传成功后的触发事件
}

interface IImgState {
  showModal:boolean
}
export default class extends React.Component<IImgUploaderProps,IImgState> {

  state:IImgState = {
    showModal:false
  }

  private getUploadContent() {
    if(this.props.value) {
      return null
    }else {
      return ( 
        <div>
          <Icon type="plus" />
          <div>点击上传</div>
        </div>
      )
    }
  }

  /**
   * 生成图片数组
   */
  private getFileList():UploadFile[] {
    if(this.props.value) {
      return [
        {
          uid:this.props.value,
          name:this.props.value,
          url:this.props.value
        }
      ]
    }
    return []
  }

  /**
   * 图片上传函数
   * @param info 图片上传信息
   */
  async handleRequest(p:any) {
    let formData = new FormData();
    formData.append(p.filename,p.file);
    // fetch api
    const request = new Request(p.action,{
      method: 'post', // 请求方法
      body:formData, // 上传的数据
    })
    const resp:IResponseData<string> | IResponseError =  await fetch(request).then(resp => resp.json())
    if(resp.err) {
      // 有错误
      message.error('上传失败')
    }else {
      // 触发回调
      this.props.onChange(resp.data!)
    }
  }

  render() {
    return(
      <div>
      <Upload action='/api/upload' name="imgfile" accept=".jpg,.png,.gif" listType="picture-card" fileList={this.getFileList()}
        customRequest={this.handleRequest.bind(this)} onRemove={() => {
          this.props.onChange('')
        }} onPreview={() => {
          this.state.showModal = true
        }}>
        {this.getUploadContent()}
      </Upload>
        <Modal visible={this.state.showModal} footer={null} onCancel={() => {
          this.state.showModal = false
        }}>
          <img alt="example" style={{ width: '100%' }} src={this.props.value} />
        </Modal>
      </div>
    )
  }
}