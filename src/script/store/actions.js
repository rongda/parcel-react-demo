import axios from 'axios';
import {
  ADD_AGE,
  REDECE_AGE,
  RENAME,
  LOGIN,
  LOGOUT
} from './type'

// action
const addAge = () => ({
  type: ADD_AGE
})
const reduceAge = () => ({
  type: REDECE_AGE
})

const reName = (name) => ({
  type: RENAME,
  name
})
// async action 
const asyncReName = (name) => {
  return (dispatch) => {
    (
      async () => {
        try {
          const res = await axios.get('https://easy-mock.com/mock/5b2b75349bd86a040ba4cb15/test/get_name');
          console.log(res.data.name)
          dispatch(reName(res.data.name))
        }
        catch(error) {
          console.log('error', error);
        }
      }
    )()
  }
}

// token
const login = () => ({
  type: LOGIN
})

const logout = () => ({
  type: LOGOUT
})

export {
  addAge,
  reduceAge,
  reName,
  asyncReName,
  login,
  logout
}
