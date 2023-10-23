/* eslint-disable import/no-anonymous-default-export */
import React from 'react'
import { RouteComponentProps } from 'react-router'
// 生成类组件
// RouteComponentProps 一个路由组件的内置接口

interface IParams {
  id:string
}
export default class extends React.Component<RouteComponentProps<IParams> > {
  render() {
    console.log('this.props',this.props.match.params.id)
    return(
      <h1>修改电影</h1>
    )
  }
}