import React, { Component } from 'react'
// import { Button,message} from 'antd'  //引入antd
import { BrowserRouter,Route,Switch} from 'react-router-dom' //引入路由包裹
import Login from './pages/login' //引入登陆路由组件
import Admin from './pages/admin' //引入管理路由组件


export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
          <Switch>  {/**只要匹配到一个就不继续往下匹配了，path路径不能写 '.'**/}
              <Route path='/login' component={Login}></Route> 
              <Route path='/admin' component={Admin}></Route>
          </Switch>
      </BrowserRouter>
    )
  }
}

