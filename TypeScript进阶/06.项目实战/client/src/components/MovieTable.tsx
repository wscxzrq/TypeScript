import React from 'react'
import { IMovieState } from '../redux/reducers/MovieReducer'
import {Table,Switch} from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { IMovie } from '../pages/services/MovieService'
import defaultposterImg from '../assets/defaultposter.png'
import { SwitchType } from '../pages/services/CommonType'

export interface IMovieTableEvents {
  /**
   * 完成加载之后的事件
   */
  onLoad: () => void,
  /**
   * 是否热映改变事件
   */
  onSwitchChange: (type:SwitchType, newState:boolean, id:string) => void
}


export default class extends React.Component<IMovieState & IMovieTableEvents> {
  // 组件完成加载
  componentDidMount(): void {
    if(this.props.onLoad) {
      this.props.onLoad();
    }
  }
  // 获取列的配置
  private getColums():ColumnProps<IMovie>[] {
    return [
      {
        title:'类型',
        dataIndex:'poster',
        render: poster => {
          return poster ? <img className='tablePoster' src={poster}></img> : <img className='tablePoster' src={defaultposterImg}></img>
        }
      },
      {title:'电影名称',dataIndex:'name'},
      {
        title:'类型',
        dataIndex:'types',
        render:(text:string[]) => {
          return text.join(', ') 
        }
      },
      {
        title:'时长',
        dataIndex:'timeLong',
        render: timeLog => {
          return timeLog + '分钟'
        }
      },
      {
        title:'正在热映',
        dataIndex:'isHot',
        render: (isHot,record) => {
          return <Switch checked={isHot} onChange={(newVal) => {
            this.props.onSwitchChange(SwitchType.isHot,newVal,record._id!)
          }} />
        }
      },
      {
        title:'即将上映',
        dataIndex:'isComing',
        render: (isComing,record) => {
          return <Switch checked={isComing} onChange={(newVal) => {
            this.props.onSwitchChange(SwitchType.isComing,newVal,record._id!)
          }} />
        }
      },
      {
        title:'经典影片',
        dataIndex:'isClasic',
        render: (isClasic,record) => {
          return <Switch checked={isClasic} onChange={(newVal) => {
            this.props.onSwitchChange(SwitchType.isClasic,newVal,record._id!)
          }} />
        }
      },

    ]
  }
  render() {
    return (
      <Table rowKey='_id' dataSource={this.props.data} columns={this.getColums()}></Table>
    )
  }
}