import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Radio,
  Button
} from 'antd-mobile'
import Logo from '../../component/Logo'
import { register } from '../../store/actions'
const RadioItem = Radio.RadioItem

@connect(
  state => state.user,
  {register}
)

class Register extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {
      user: '',
      pwd: '',
      repeatpwd: '',
      type: 'genius'
    }
    this.handleRegister = this.handleRegister.bind(this)
  }
  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  handleRegister() {
    console.log(this.state)
    this.props.register(this.state)
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
              用户名
            </InputItem>
            <WhiteSpace />
            <InputItem
              type='password'
              onChange={v => this.handleChange('pwd', v)}
            >
              密码
            </InputItem>
            <WhiteSpace />
            <InputItem
              type='password'
              onChange={v => this.handleChange('repeatpwd', v)}
            >
              确认密码
            </InputItem>
            <WhiteSpace />
            <RadioItem
              checked={this.state.type === 'genius'}
              onChange={() => this.handleChange('type', 'genius')}
            >
              牛人
            </RadioItem>
            <WhiteSpace />
            <RadioItem
              checked={this.state.type === 'boss'}
              onChange={() => this.handleChange('type', 'boss')}
            >
              BOSS
            </RadioItem>
            <WhiteSpace />
            <Button
              type='primary'
              onClick={this.handleRegister}
            >
              注册
            </Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default Register
