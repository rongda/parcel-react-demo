import React from 'react'
import { connect } from 'react-redux'
import { reName, asyncReName } from '../store/actions'

// 有了@修饰符 根本不需要容器组件
@connect(
  state => ({
    name: state.name
  }),
  dispatch => ({
    reName: (name) => dispatch(reName(name)),
    asyncReName: (name) => dispatch(asyncReName(name))
  })
)

class Name extends React.Component {
  render() {
    const {
      name,
      reName,
      asyncReName
    } = this.props
    return (
      <div>
        <p>我的名字：{name}</p>
        <button onClick={() => reName('Hero')}>马上改名</button>
        <button onClick={() => asyncReName('Shadow')}>两年后改名</button>
      </div>
    )
  }
}

export default Name
