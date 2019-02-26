import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import configItem from './config'

class RouterConfig extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            {configItem.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                component={item.component}
                exact
              />
            ))}
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

export default RouterConfig
