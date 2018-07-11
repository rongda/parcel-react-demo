import { combineReducers } from 'redux'
import {
  ADD_AGE,
  REDECE_AGE,
  RENAME,
  LOGIN,
  LOGOUT
} from './type'

const age = (state = 18, action) => {
  switch (action.type) {
    case ADD_AGE:
      return state + 1
    case REDECE_AGE:
      return state - 1
    default:
      return state
  }
}
const name = (state = 'Roda', action) => {
  switch (action.type) {
    case RENAME:
      return action.name
    default:
      return state
  }
}

const token = (state = {
  isAuth: false,
  user: 'Roda'
}, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuth: true
      }
    case LOGOUT:
      return {
        ...state,
        isAuth: false
      }
    default:
      return state
  }
}

const reducer = combineReducers({
  age,
  name,
  token
})

export default reducer
