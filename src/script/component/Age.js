import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addAge, reduceAge } from '../store/actions'

@connect(
  state => ({
    age: state.age
  }),
  dispatch => ({
    addAge: () => dispatch(addAge()),
    reduceAge: () => dispatch(reduceAge())
  })
)

class Age extends Component {
  render() {
    const {
      age,
      addAge,
      reduceAge
    } = this.props
    return (
      <div>
        <p>我的年纪：{age}</p>
        <button onClick={addAge}>增加一岁</button>
        <button onClick={reduceAge}>减少一岁</button>
      </div>
    )
  }
}

export default Age
