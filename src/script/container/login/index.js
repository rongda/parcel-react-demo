import React from 'react'
import Logo from '../../component/Logo'

class Login extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <Logo />
        <p>Login page</p>
      </div>
    )
  }
}

export default Login
