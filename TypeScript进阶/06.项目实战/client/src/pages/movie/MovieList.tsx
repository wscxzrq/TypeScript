import React from "react"
import MovieTable from "../../components/MovieTable";
import {connect} from 'react-redux'
import { IRootState } from "../../redux/reducers/RootReducer";

// 数据与界面进行连接
function mapStateToProps(state:IRootState) {
  return state.movie;
}

const HOC = connect(mapStateToProps) // 返回一个函数是一个高阶组件
const MovieContainer = HOC(MovieTable) // 容器组件
export default class extends React.Component {
    render(){
        return (
            <MovieContainer />
        );
    }
}