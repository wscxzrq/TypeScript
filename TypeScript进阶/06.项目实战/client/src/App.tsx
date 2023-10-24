import React from 'react';
import Layout from "./pages/Layout";
import { BrowserRouter, Route } from "react-router-dom";
import {Provider} from 'react-redux'
import { store } from './redux/store';

const App: React.FC = () => {
    return (
      // Provider 根节点，为整个组件树提供数据 
      <Provider store={store}>
        <BrowserRouter>
            <Route path="/" component={Layout}></Route>
        </BrowserRouter>
      </Provider>
    );
}

export default App;
