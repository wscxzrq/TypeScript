import { ISearchConditions } from "../../services/CommonType"
import { IMovie } from "../../services/MovieService"
import { IAction } from "./ActionTypes"

// action 的创建函数
export type saveMoviesAction = IAction<"movie_save",{
  movies:IMovie[],
  total:number
}> 

// eslint-disable-next-line @typescript-eslint/no-redeclare
function saveMoviesAction (movies:IMovie[],total:number):saveMoviesAction {
  return {
    type:'movie_save', // 保存一个电影
    payload:{
      // 负载、载荷
      movies,
      total
    }
  }
}

export type SetLoadingAction = IAction<"move_setLoading",boolean>
/**
 * 设置加载状态的 Action
 * @param isLoading 
 * @returns 
 */
function setLoadingAction(isLoading:boolean):SetLoadingAction {
  return {
    type:'move_setLoading',
    payload:isLoading
  }
}

export type SetConditionAction = IAction<"movie_setConition",ISearchConditions>
/**
 * 设置查询条件的 Action
 * @param condition 
 * @returns 
 */
function setCondition(condition:ISearchConditions):SetConditionAction {
  return {
    type:"movie_setConition",
    payload:condition
  }
}

export type DeleteAction = IAction<"movie_delete",string>;
/**
 * 删除 Action
 * @param id 
 * @returns 
 */
function deleteAction(id:string):DeleteAction {
  return {
    type:"movie_delete",
    payload:id
  }
}

export type MovieActions = saveMoviesAction | SetLoadingAction | SetConditionAction | DeleteAction
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  saveMoviesAction,
  setLoadingAction,
  setCondition,
  deleteAction
}