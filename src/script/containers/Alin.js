import { connect } from "react-redux";
import { sayAlin } from "../actions";
import About from "../component/About";

const mapStateToProps = (state) => {
	return {
		about: state.alin
	}
}

const mapDispatchToProps = {
	handleClick: sayAlin
}

const Alin = connect(
	mapStateToProps,
	mapDispatchToProps
)(About)

export default Alin
