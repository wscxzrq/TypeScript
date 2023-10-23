import React from "react";
import { NavLink, Route } from "react-router-dom";
import MovieList from "./movie/MovieList";
import AddMovie from "./movie/addMovie";
import Home from "./movie/Home";
import EditMovie from "./movie/EditMovie";

const Layout: React.FC = function () {
  return (
    <div>
      <header>
        <ul>
          <li>
            <NavLink to="/">首页</NavLink>
          </li>
          <li>
            <NavLink to="/movie">电影列表</NavLink>
          </li>
          <li>
            <NavLink to="/movie/add">添加电影</NavLink>
          </li>
          <li>
            <NavLink to="/movie/edit/312312">修改电影</NavLink>
          </li>
        </ul>
        <div>
            {/*
               exact 表示精确匹配路由
              react 路由匹配默认为模糊匹配
            */}
            <Route path='/' exact={true} component={Home}></Route>
            <Route path='/movie' exact={true} component={MovieList}></Route>
            <Route path='/movie/add' component={AddMovie}></Route>
            <Route path='/movie/edit/:id' component={EditMovie}></Route> 
        </div>
      </header>
    </div>
  );
};

export default Layout;
