import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../store/actions'

@connect(
  state => ({
    token: state.token
  }),
  dispatch => ({
    login: () => dispatch(login())
  })
)
class Auth extends React.Component {
  async componentDidMount() {
    console.log('test')
  }
  render() {
    const { login, token } = this.props
    return (
      <div>
        {token.isAuth ? <Redirect to='/' /> : (
          <div>
            <h1>您还没有权限哦</h1>
            <button onClick={login}>请登录</button>
          </div>
        )}
      </div>
    )
  }
}

export default Auth
