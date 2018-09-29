import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Toast } from 'antd-mobile'
import querystring from 'querystring'
import session from '../api/session'
import storage from '../utils/storage'
import urlFormat from '../utils/urlFormat'
import { authSuccess, authExit } from '../store/actions'
const client = session()

@withRouter
@connect(
  null,
  { authSuccess, authExit }
)
export default class Auth extends React.Component {
  toAuth(code) {
    const { authSuccess, authExit } = this.props
    if (code) {
      client.create(code).then(({data}) => {
        authSuccess(data)
        storage.set(data.id)
        window.location.href = querystring.parse(window.location.search)['?referer']
      }).catch(() => {
        Toast.offline('登录失败，请联系OA管理员', 1)
        authExit()
      })
    } else {
      window.location.href = urlFormat(window.location.href)
    }
  }
  componentDidMount() {
    const token = storage.get()
    const { authSuccess } = this.props
    const { code } = querystring.parse(window.location.search)
    if (token === null) {
      this.toAuth(code)
    } else {
      client.get(token).then(({data}) => {
        authSuccess(data)
      }).catch(() => {
        this.toAuth(code)
      })
    }
  }
  render() {
    return null
  }
}
