import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './redux/store';
import MovieAction from './redux/actions/MovieAction';

store.dispatch(MovieAction.fetchMovies({page:2}))


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// redux
// 大型项目中使用
// 不是所有的状态数据都要放到 redux 中
// action:平面对象 plain object 它描述了数据变化的方式
// reducer：数据变化的具体内容，它需要一个 action 来出发
// store：表示存储数据的仓库
// 副作用：redux-thunk、redux-saga、dva