import React from "react"
import axios from "axios"
import {
	BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import {
	routes
} from './../router'

class App extends React.Component {
	componentWillMount() {
		axios
		.get('/api/test')
		.then((response) => {
			console.log('axios', response.data);
		});
	}
	render() {
		return (
			<Router>
				<div>
					<ul>
						<li><Link to="/">Home</Link></li>
						<li><Link to="/about">About</Link></li>
						<li><Link to="/process">Process</Link></li>
					</ul>
					{
						routes.map((route, index) => (
							<Route key={index} exact path={route.path} component={route.component}/>
						))
					}
				</div>
			</Router>
		);
	}
}

export default App
