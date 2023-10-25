import { ISearchConditions, SwitchType } from "../../pages/services/CommonType"
import { IMovie, MovieService } from "../../pages/services/MovieService"
import { IAction } from "./ActionTypes"
import { ThunkAction} from "redux-thunk"
import { IRootState } from '../reducers/RootReducer';
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
function setConditionAction(condition:ISearchConditions):SetConditionAction {
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

export type MovieActions = saveMoviesAction | SetLoadingAction | SetConditionAction | DeleteAction | MovieChangeSwitchAction

// 根据条件从服务器获取电影数据
function fetchMovies(condition:ISearchConditions):ThunkAction<Promise<void>,IRootState,any,MovieActions> {
  return async (dispatch,getState) => {
    // 1.设置加载状态
    dispatch(setLoadingAction(true));
    // 2.设置条件
    dispatch(setConditionAction(condition));
    // 3.获取服务器数据
    const curCondition = getState().movie.condition;
    const resp = await MovieService.getMovies(curCondition);
    // 4.更改仓库数据
    dispatch(saveMoviesAction(resp.data,resp.total))
    // 关闭加载状态
    dispatch(setLoadingAction(false));
  }
}

// 根据条件从服务器删除电影数据
function deleteMovie(id:string) :ThunkAction<Promise<void>,IRootState,any,MovieActions>  {
  return async (dispatch) => {
    dispatch(setLoadingAction(true));
    await MovieService.delete(id);
    dispatch(deleteAction(id)); // 删除本地仓库中的数据
    dispatch(setLoadingAction(false));
  }
}

export type MovieChangeSwitchAction = IAction<'movie_switch',{
  type:SwitchType,newVal:boolean,id:string
}>

function changeSwitchAction(type:SwitchType,newVal:boolean,id:string):MovieChangeSwitchAction {
  return {
    type:'movie_switch',
    payload: {
      type,
      newVal,
      id
    }
  }
}

function changeSwitch(type:SwitchType,newVal:boolean,id:string):ThunkAction<Promise<void>,IRootState,any,MovieActions> {
  return async (dispatch) => {
    dispatch(changeSwitchAction(type,newVal,id));
    await MovieService.edit(id,{[type]:newVal})
  }
}

export default {
  saveMoviesAction,
  setLoadingAction,
  setConditionAction,
  deleteAction,
  fetchMovies,
  deleteMovie,
  changeSwitchAction,
  changeSwitch,
}