import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import AuthRouter from '../component/AuthRouter'
import Login from '../container/login'
import Register from '../container/register'

const GenuisInfo = () => {
  return <div>GenuisInfo</div>
}

const BossInfo = () => {
  return <div>BossInfo</div>
}

class RouterConfig extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <AuthRouter />
          <Switch>
            <Route path='/login' exact component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/genuisinfo' component={GenuisInfo} />
            <Route path='/bossinfo' component={BossInfo} />
            <Redirect to='/login' />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default RouterConfig
