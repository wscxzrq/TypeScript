import React from "react";
import {NavLink} from 'react-router-dom'
const Layout:React.FC = function () {
  return (
    <div>
      <header>
          <ul>
            <li>
              <NavLink to='/'>首页</NavLink>
            </li>
          </ul>
      </header>
    </div>
  )
}

export default Layout