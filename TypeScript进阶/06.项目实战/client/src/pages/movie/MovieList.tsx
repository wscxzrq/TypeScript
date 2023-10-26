import React, { Dispatch } from "react"
import MovieTable, { IMovieTableEvents } from "../../components/MovieTable";
import {connect} from 'react-redux'
import { IRootState } from "../../redux/reducers/RootReducer";
import MovieAction from "../../redux/actions/MovieAction";
import { IMovieState } from "../../redux/reducers/MovieReducer";

// 数据与界面进行连接
function mapStateToProps(state:IRootState):IMovieState {
  return state.movie;
}

const HOC = connect(mapStateToProps,mapDispatchToProps) // 返回一个函数是一个高阶组件
const MovieContainer = HOC(MovieTable) // 容器组件

function mapDispatchToProps(dispatch:Dispatch<any>):IMovieTableEvents {
  return {
    onLoad() {
      dispatch(MovieAction.fetchMovies({
        page:1,
        limit:10,
        key:''
      }))
    },
    onSwitchChange(type,newState,id) {
      dispatch(MovieAction.changeSwitch(type,newState,id));
    },
    async onDelete(id) {
     await dispatch(MovieAction.deleteMovie(id));
    },
    onChange(newPage) {
      dispatch(MovieAction.fetchMovies({page:newPage}))
    },
    onKeyChange(key) {
      dispatch(MovieAction.fetchMovies({key}))
    },
    onSearch() {
      dispatch(MovieAction.fetchMovies({
        page:1,
      }))
    },
  }
}
export default class extends React.Component {
    render(){
        return (
            <MovieContainer />
        );
    }
}