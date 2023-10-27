import { Icon, Upload } from "antd";
import React from "react";
// 图片上传
export default class extends React.Component {
  render() {
    return(
      <Upload action='/api/upload' name="imgfile" accept=".jpg,.png,.gif" listType="picture-card">
        <div>
          
          <Icon type="plus" />
          <div>点击上传</div>
      </div>
      </Upload>
    )
  }
}