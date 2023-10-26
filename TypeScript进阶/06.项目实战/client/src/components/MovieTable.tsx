import React from 'react'
import { IMovieState } from '../redux/reducers/MovieReducer'
import {Table,Switch,Button,message,Popconfirm,Icon,Input } from 'antd'
import { ColumnProps, PaginationConfig } from 'antd/lib/table'
import { IMovie } from '../pages/services/MovieService'
import defaultposterImg from '../assets/defaultposter.png'
import { SwitchType } from '../pages/services/CommonType'
import {NavLink} from 'react-router-dom'
export interface IMovieTableEvents {
  /**
   * 完成加载之后的事件
   */
  onLoad: () => void,
  /**
   * 是否热映改变事件
   */
  onSwitchChange: (type:SwitchType, newState:boolean, id:string) => void,
  /**
   * 删除电影事件
   */
  onDelete:(id:string) => Promise<void>,
  /**
   *  分页事件
   */
  onChange:(newPage:number) => void,
  /**
   * 根据名称查找电影
   */
  onKeyChange:(key:string) => void
  /**
   * 点击按钮进行搜索电影
   */
  onSearch:() => void
}


export default class extends React.Component<IMovieState & IMovieTableEvents> {
  // 组件完成加载
  componentDidMount(): void {
    if(this.props.onLoad) {
      this.props.onLoad();
    }
  }


  // 筛选
  private getFilterDropDown(p:any) {
    return (
      <div style={{ padding: 8 }}>
        <Input
          value={this.props.condition.key}
          onChange={e => this.props.onKeyChange(e.target.value)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
          onPressEnter={this.props.onSearch}
        />
        <Button
          type="primary"
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
          onClick={this.props.onSearch}
        >
          搜索
        </Button>
        <Button  size="small" style={{ width: 90 }} onClick={() => {
          this.props.onKeyChange('')
          this.props.onSearch()
        }}>
          重置
        </Button>
      </div>
    )
  }

  // 获取列的配置
  private getColums():ColumnProps<IMovie>[] {
    return [
      {
        title:'类型',
        dataIndex:'poster',
        render: poster => {
          return poster ? <img alt='' className='tablePoster' src={poster}></img> : <img alt='' className='tablePoster' src={defaultposterImg}></img>
        }
      },
      {
        title:'电影名称',
        dataIndex:'name',
        filterDropdown: this.getFilterDropDown.bind(this),
        filterIcon:<Icon type='search'></Icon>
      },
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
      {
        title:'操作',
        dataIndex:'_id',
        render: (id:string) => {
          return (
            <div>
              <NavLink to={"/movie/edit/" + id}>
                <Button type='primary' size="small" >编辑</Button>
              </NavLink>
              <Popconfirm
                title="确定要删除吗?"
                onConfirm={async () => {
                  await this.props.onDelete(id);
                  message.success('删除成功');
                }}
                okText="确定"
                cancelText="取消"
              >
              <Button type="danger" size="small">删除</Button>
            </Popconfirm>,
            </div>
          )
        }
      },
    ]
  }
  // 分页配置函数
  getPageConfig():PaginationConfig | false {
    if(this.props.total === 0) {
      return false
    } else {
      return {
        current:this.props.condition.page,
        pageSize:this.props.condition.limit,
        total:this.props.total
      }
    } 
  }
  // 分页函数
  handleChange(pagination:PaginationConfig) {
    this.props.onChange(pagination.current!)
  }
  render() {
    return (
      <Table rowKey='_id' dataSource={this.props.data} columns={this.getColums()} pagination={this.getPageConfig()}
        onChange={this.handleChange.bind(this)} loading={this.props.isLoading}></Table>
    )
  }
}