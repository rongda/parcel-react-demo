import React from 'react'
import PropTypes from 'prop-types'
import University from './University.js'

class UniversityList extends React.Component {
  render() {
    const {universitys, handleAddUniversity} = this.props
    return (
      <div>
        {universitys.map((university, index) =>
          <University
            university={university}
            key={index}
            handleClick={() => handleAddUniversity('泉州大学', index)}
          />
        )}
      </div>
    )
  }
}
UniversityList.propTypes = {
  universitys: PropTypes.array.isRequired,
  handleAddUniversity: PropTypes.func.isRequired
}

export default UniversityList
