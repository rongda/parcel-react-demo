import React from 'react'
import PropTypes from 'prop-types'

class Name extends React.Component {
  render() {
    const {name, handleClick} = this.props
    return (
      <div
        style={{
          margin: 10,
          padding: 10,
          background: '#ccc'
        }}
        onClick={handleClick}
      >{`Im ${name}`}</div>
    )
  }
}
Name.propTypes = {
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default Name
