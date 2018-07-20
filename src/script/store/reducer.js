import { combineReducers } from 'redux'
import {
  ERROR_MSG,
  REGISTER_SUCCESS
} from './type'

const initState = {
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
        isAuth: false
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        msg: '',
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
