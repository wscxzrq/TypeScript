import React from 'react';
import Layout from './pages/Layout';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Layout}></Route>

      </Routes>
    </BrowserRouter>
  );  
}

export default App;
