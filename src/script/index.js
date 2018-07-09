import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './store/reducer';
import RouterConfig from './router';

const store = createStore(reducer, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : () => {}
));
ReactDOM.render(
  <Provider store={store}>
    <RouterConfig/>
  </Provider>,
  document.getElementById('root')
);
