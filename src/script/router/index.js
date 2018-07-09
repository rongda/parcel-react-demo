import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import App from '../component/App';
import Age from '../component/Age';
import Name from '../component/Name';
import Hello from '../component/Hello';
import Auth from '../component/Auth';

class RouterConfig extends React.Component{
  render() {
    return (
      <BrowserRouter>
        <div>
          <App />
          <Switch>
            <Route path='/' exact component={Hello}></Route>
            <Route path='/age' component={Age}></Route>
            <Route path='/name' component={Name}></Route>
            <Route path='/auth' component={Auth}></Route>
            <Route path='/:location' component={Hello}></Route>
            <Redirect to='/'></Redirect>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default RouterConfig;
