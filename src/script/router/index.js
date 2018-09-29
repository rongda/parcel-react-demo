import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import configItem from './config'
import Auth from '../component/Auth'
import { pathname } from '../config'

@connect(
  state => state.authorization,
  null
)
class RouterConfig extends React.Component {
  render() {
    const { isAuth } = this.props
    const isLoading = window.location.pathname === pathname
    return (
      <BrowserRouter>
        <React.Fragment>
          <Auth />
          {isAuth && <Switch>
            {configItem.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                component={item.component}
                exact
              />
            ))}
            {!isLoading && <Redirect to='/todo' />}
          </Switch>}
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default RouterConfig
