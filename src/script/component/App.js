import React from "react"
import axios from "axios"
import ShowNameList from '../containers/ShowNameList.js'
import ShowUniversityList from '../containers/ShowUniversityList.js'

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
			<div>
				<ShowNameList />
				<ShowUniversityList />
				<div>Hello React @2018</div>
			</div>
		);
	}
}

export default App
