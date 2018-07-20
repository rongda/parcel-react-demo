import axios from 'axios'
import {
  ERROR_MSG,
  REGISTER_SUCCESS
} from './type'

// action

const errorMsg = msg => ({
  msg,
  type: ERROR_MSG
})

const registerSuccess = data => ({
  type: REGISTER_SUCCESS,
  payload: data
})

const register = ({
  user,
  pwd,
  repeatpwd,
  type
}) => {
  if (!user || !pwd || !type) {
    return errorMsg('用户名密码必须填写')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('密码和确认密码不同')
  }
  return dispatch => {
    axios.post('/user/register', {
      user,
      pwd,
      type
    }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(registerSuccess({
          user,
          pwd,
          type
        }))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export {
  errorMsg,
  register
}
