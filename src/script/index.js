import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from "./component/App.js"
import rootReducer from './store/reducers'

let store = createStore(rootReducer)
console.log('store', store)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)
