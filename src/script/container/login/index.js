import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Logo from '../../component/Logo'
import { login } from '../../store/actions'

import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile'

@connect(
  state => state.user,
  {login}
)
class Login extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {
      user: '',
      pwd: ''
    }
    this.login = this.login.bind(this)
    this.register = this.register.bind(this)
  }
  register() {
    this.props.history.push('/register')
  }
  login() {
    this.props.login(this.state)
  }
  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  render() {
    console.log(this.props)
    return (
      <div>
        {this.props.redirectTo && <Redirect to={this.props.redirectTo} />}
        <Logo />
        {this.props.msg && <p style={{
          color: 'red',
          textAlign: 'center'
        }}>{this.props.msg}</p>}
        <WingBlank>
          <List>
            <InputItem
              onChange={v => this.handleChange('user', v)}
            >
              用户
            </InputItem>
            <WhiteSpace />
            <InputItem
              type='password'
              onChange={v => this.handleChange('pwd', v)}
            >
              密码
            </InputItem>
          </List>
          <WhiteSpace />
          <Button onClick={this.login} type='primary'>登录</Button>
          <WhiteSpace />
          <Button onClick={this.register} type='primary'>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login
