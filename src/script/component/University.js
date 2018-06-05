import React from 'react'
import PropTypes from 'prop-types'

class University extends React.Component {
  render() {
    const {university, handleClick} = this.props
    return (
      <div
        style={{
          margin: 10,
          padding: 10,
          background: '#333',
          color: '#fff'
        }}
        onClick={handleClick}
      >{university}</div>
    )
  }
}
University.propTypes = {
  university: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default University
