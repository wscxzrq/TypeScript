// 描述电影列表的状态类型

import { Reducer } from "react";
import { ISearchConditions } from "../../pages/services/CommonType";
import { IMovie } from "../../pages/services/MovieService";
import { DeleteAction, MovieActions, MovieChangeSwitchAction, SetConditionAction, SetLoadingAction, saveMoviesAction } from "../actions/MovieAction";

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
  isLoading:boolean,
  /**
   * 总页数
   */
  totalPage:number
}

/**
 * 默认电影状态
 */
const defaultState:IMovieState = {
  data:[],
  condition:{
    page:1,
    limit:10,
    key:''
  },
  total:0,
  isLoading:false,
  totalPage:0
}

type MovieReducer<A> = Reducer<IMovieState,A>

const saveMovie:MovieReducer<saveMoviesAction> = function (state,action) {
  return {
    ...state,
    data:action.payload.movies,
    total:action.payload.total,
    totalPage:Math.ceil(action.payload.total / state.condition.limit)
  }
}

const setCondition:MovieReducer<SetConditionAction> = function (state,action) {
  const newState = {
    ...state,
    condition:{
      ...state.condition,
      ...action.payload
    }
  }
  newState.totalPage = Math.ceil(newState.total / newState.condition.limit)
  return newState
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
    total:state.total - 1,
    totalPage:Math.ceil(state.total - 1 / state.condition.limit)
  }
}

const changeSwitch:MovieReducer<MovieChangeSwitchAction> = function (state,action) {
  const movie = state.data.find(d => d._id === action.payload.id);
  if(!movie) {
    return state;
  }
  const newMovie = {...movie};
  newMovie[action.payload.type] = action.payload.newVal;
  // 将对象重新放入数组
  const newData = state.data.map(d => {
    if(d._id === action.payload.id) {
      return newMovie
    }
    return d
  })
  return {
    ...state,
    data:newData
  }
}

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
    case 'movie_switch':
      return changeSwitch(state,action);
    default:
      return state
  }
}