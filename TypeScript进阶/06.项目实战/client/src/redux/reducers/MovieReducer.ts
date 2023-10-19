// 描述电影列表的状态类型

import { Reducer } from "react";
import { ISearchConditions } from "../../services/CommonType";
import { IMovie } from "../../services/MovieService";
import { DeleteAction, MovieActions, SetConditionAction, SetLoadingAction, saveMoviesAction } from "../actions/MovieAction";

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

type MovieReducer<A> = Reducer<IMovieState,A>

const saveMovie:MovieReducer<saveMoviesAction> = function (state,action) {
  return {
    ...state,
    data:action.payload.movies,
    total:action.payload.total
  }
}

const setCondition:MovieReducer<SetConditionAction> = function (state,action) {
  return {
    ...state,
    condition:{
      ...state.condition,
      ...action.payload
    }
  }
}

const setLoading:MovieReducer<SetLoadingAction> = function (state,action) {
  return {
    ...state,
    isLoading:action.payload
  }
}

const deleteMovie:MovieReducer<DeleteAction> = function (state,action) {
  return {
    ...state,
    data:state.data.filter(m => m._id !== action.payload),
    total:state.total - 1
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state:IMovieState = defaultState , action:MovieActions) {
  switch (action.type) {
    case "movie_delete":
      return deleteMovie(state,action);
    case "move_setLoading":
      return setLoading(state,action);
    case "movie_save":
      return saveMovie(state,action);
    case "movie_setConition":
      return setCondition(state,action);
    default:
      return state
  }
}