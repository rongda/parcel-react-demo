import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd-mobile';

class Home extends Component {
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
				<div>{this.props.home}</div>
			</div>
		);
	}
}

Home.propTypes = {
	home: PropTypes.string.isRequired
}

export default Home
