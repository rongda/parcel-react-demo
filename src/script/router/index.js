import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import AuthRouter from '../component/AuthRouter'
import Login from '../container/login'
import Register from '../container/register'

class RouterConfig extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <AuthRouter />
          <Switch>
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />
            <Redirect to='/login' />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default RouterConfig
