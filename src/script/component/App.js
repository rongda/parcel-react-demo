import React from "react";
import axios from "axios";

class App extends React.Component {
	componentWillMount() {
		axios
		.get('/api/test')
		.then((response) => {
			console.log(response.data);
		});
	}
	render() {
		return (
			<div>Hello React @2018</div>
		);
	}
}

export default App;
