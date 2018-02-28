import React, { Component } from 'react';
import PropTypes from 'prop-types';
class About extends Component {
	constructor() {
		super(...arguments);
		console.log("Hello Parcel React");
	}

	// methods
	render() {
		return (
			<div>
				<p>Hello Parcel React About About About</p>
				<div onClick={this.props.handleClick.bind(this, "HAHAAHHAHAHAHA")}>{this.props.about}</div>
			</div>
		);
	}
}

About.propTypes = {
	about: PropTypes.string.isRequired,
	handleClick: PropTypes.func.isRequired
}

export default About
