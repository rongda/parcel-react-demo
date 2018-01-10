import React, { Component } from 'react';
import { Button } from 'antd-mobile';

class App extends Component {
	constructor() {
		super(...arguments);
		console.log("Hello Parcel React");
	}

	// methods
	render() {
		return (
			<div>
				<p>Hello Parcel React</p>
				<Button type="primary">BUTTON</Button>
			</div>
		);
	}
}

export default App
