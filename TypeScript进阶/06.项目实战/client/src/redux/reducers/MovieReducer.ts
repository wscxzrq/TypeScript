// 描述电影列表的状态类型

import { ISearchConditions } from "../../services/CommonType";
import { IMovie } from "../../services/MovieService";
import { IAction } from "../actions/ActionTypes";
import { MovieActions } from "../actions/MovieAction";

// Required 是 TypeScript 的内置工具之一，接受一个泛型参数，返回一个新的类型，并将其中所有属性变为必填属性 
export type IMovieCondition = Required<ISearchConditions>

/**
 * 电影状态
 */
export interface IMovieState {
  /**
   * 电影数组
   */
  data:IMovie[]
  /**
   * 查询条件
   */
  condition:IMovieCondition
  /**
   * 总记录数
   */
  total:number
  /**
   * 是否正在加载数据
   */
  isLoading:boolean
}

/**
 * 默认电影状态
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const defaultState:IMovieState = {
  data:[],
  condition:{
    page:1,
    limit:10,
    key:''
  },
  total:0,
  isLoading:false
}

export default function (state:IMovieState = defaultState , action:MovieActions) {
  // action.
}