import { connect } from "react-redux";

import Home from "../component/Home";

const mapStateToProps = (state) => {
	return {
		home: state.roda
	}
}

const Roda = connect(
	mapStateToProps
)(Home)

export default Roda
