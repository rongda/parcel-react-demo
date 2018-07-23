import { combineReducers } from 'redux'
import {
  ERROR_MSG,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS
} from './type'
import { getRedirectPath } from '../util'

const initState = {
  redirectTo: '',
  isAuth: false,
  msg: '',
  pwd: '',
  type: ''
}

const user = (state = initState, action) => {
  switch (action.type) {
    case ERROR_MSG:
      return {
        ...state,
        msg: action.msg,
        isAuth: false,
        redirectTo: ''
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        msg: '',
        redirectTo: getRedirectPath(action.payload),
        isAuth: true,
        ...action.payload
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        msg: '',
        redirectTo: getRedirectPath(action.payload),
        isAuth: true,
        ...action.payload
      }
    default:
      return state
  }
}
const reducer = combineReducers({
  user
})

export default reducer
