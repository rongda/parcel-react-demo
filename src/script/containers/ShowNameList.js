import { connect } from 'react-redux'
import NameList from '../component/NameList.js'
import { addName } from '../store/actions'
const mapStateToProps = state => ({
  names: state.names
})
const mapDispatchToProps = dispatch => ({
  handleAddName: (name, index) => dispatch(addName(name, index))
})
const ShowNameList = connect(
  mapStateToProps,
  mapDispatchToProps
)(NameList)

export default ShowNameList