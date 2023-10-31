import React from 'react'
import {Button, Checkbox, Form, Input, InputNumber, Switch, message} from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { IMovie } from '../pages/services/MovieService';
import ImgUpload from './ImgUpload';
import { IResponseData, IResponseError } from '../pages/services/CommonType';
import { RouteComponentProps, withRouter } from 'react-router';
// 表单组件
// RouteComponentProps react 的路由组件，可以访问路由属性
interface IFormProp extends RouteComponentProps<any> {
  form:WrappedFormUtils
  onSubmit:(movie:IMovie) => Promise<string>
}
const formItemLayout = {
  labelCol: {
    span:4
  },
  wrapperCol: {
    span:19,
    offset:1
  },
};
const AllAreas:{label:string,value:string}[] = [
  { label: '中国大陆', value: '中国大陆' },
  { label: '美国', value: '美国' },
  { label: '中国台湾', value: '中国台湾' },
  { label: '中国香港', value: '中国香港' },
];

const AllTypes:{label:string,value:string}[] = [
  { label: '喜剧', value: '喜剧' },
  { label: '灾难', value: '灾难' },
  { label: '动作', value: '动作' },
  { label: '爱情', value: '爱情' },
];

const AreaGroups = Checkbox.Group
class MovieForm extends React.Component<IFormProp> {
  /**
   * 提交函数
   */
  private handleSubmit(e:React.FormEvent<any>) {
    e.preventDefault();
    // 获取表单数据
    this.props.form.validateFields(async error => {
      if(!error) {
        const formData = this.props.form.getFieldsValue();
        const result = await this.props.onSubmit(formData as IMovie);
        if(!result) {
          message.success('提交成功',1,() => {
            // 跳转页面
            this.props.history.push('/movie')
          })
        }else {
          message.error(result)
        }
      }
    })
  }
  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <Form style={{width:'400px'}} {...formItemLayout} onSubmit={
        this.handleSubmit.bind(this)
      }>
        <Form.Item label='电影名称'>
          {/* 装饰表单域 */}
          {/* getFieldDecorator<IMovie> 对表单中的 key 进行约束 */}
          {getFieldDecorator<IMovie>("name",{
            rules:[{required:true,message:'电影名称不允许为空'}]
          })(<Input/>) }
        </Form.Item>
        <Form.Item label='封面图'>
          {getFieldDecorator<IMovie>("poster",{
            // valuePropName:"对应的 key" 高阶函数默认会对包装的组件传递一个为 value 的值，如果组件内部接收的值不是 value 字段，可以使用valuePropName进行重新映射
          })(<ImgUpload />) }
        </Form.Item>
        <Form.Item label='地区'>
          {getFieldDecorator<IMovie>("areas",{
            rules:[{required:true,message:'请选择地区'}]
          })(<AreaGroups options={AllAreas} />) }
        </Form.Item>
        <Form.Item label='类型'>
          {getFieldDecorator<IMovie>("types",{
            rules:[{required:true,message:'请选择类型'}]
          })(<AreaGroups options={AllTypes} />) }
        </Form.Item>
        <Form.Item label='时长(分钟)'>
          {getFieldDecorator<IMovie>("timeLong",{
            rules:[{required:true,message:'请输入时长'}]
          })(<InputNumber min={1} step={10}/>) }
        </Form.Item>
        <Form.Item label='正在上映'>
          {getFieldDecorator<IMovie>("isHot",{
            initialValue:false
          })(<Switch/>) }
        </Form.Item>
        <Form.Item label='即将上映'>
          {getFieldDecorator<IMovie>("isComing",{
            initialValue:false
          })(<Switch/>) }
        </Form.Item>
        <Form.Item label='经典影片'>
          {getFieldDecorator<IMovie>("isClasic",{
            initialValue:false
          })(<Switch/>) }
        </Form.Item>
        <Form.Item label='描述'>
          {getFieldDecorator<IMovie>("description",{
          })(<Input.TextArea/>) }
        </Form.Item>
        <Form.Item labelCol={{span:0}} wrapperCol={{span:20,offset:4}}>
          <Button type='primary' htmlType='submit'>提交</Button>
        </Form.Item>
      </Form>
    )
  }
}
// withRouter react 路由高阶组件
export default withRouter(Form.create<IFormProp>()(MovieForm))