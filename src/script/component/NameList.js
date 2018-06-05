import React from 'react'
import PropTypes from 'prop-types'
import Name from './Name.js'

class NameList extends React.Component {
  render() {
    const {names, handleAddName} = this.props
    return (
      <div>
        {names.map((name, index) =>
          <Name
            name={name}
            key={index}
            handleClick={() => handleAddName(`JiaKai${index}`, index)}
          />
        )}
      </div>
    )
  }
}
NameList.propTypes = {
  names: PropTypes.array.isRequired,
  handleAddName: PropTypes.func.isRequired
}

export default NameList
