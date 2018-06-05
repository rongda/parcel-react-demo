import { connect } from 'react-redux'
import UniversityList from '../component/UniversityList.js'
import { addUniversity } from '../store/actions'
const mapStateToProps = state => ({
  universitys: state.universitys
})
const mapDispatchToProps = dispatch => ({
  handleAddUniversity: (university, index) => dispatch(addUniversity(university, index))
})
const ShowUniversityList = connect(
  mapStateToProps,
  mapDispatchToProps
)(UniversityList)

export default ShowUniversityList
