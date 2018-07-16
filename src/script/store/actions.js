import axios from 'axios'
import {
  ADD_AGE,
  REDECE_AGE,
  RENAME,
  LOGIN,
  LOGOUT,
  REQUEST,
  RECEIVE
} from './type'

// action
const showLoading = () => ({
  type: REQUEST
})
const hideLoading = () => ({
  type: RECEIVE
})

const addAge = () => ({
  type: ADD_AGE
})
const reduceAge = () => ({
  type: REDECE_AGE
})

const reName = name => ({
  type: RENAME,
  name
})
// async action
const asyncReName = name => dispatch => (
  async() => {
    try {
      dispatch(showLoading())
      const res = await axios.get('https://easy-mock.com/mock/5b2b75349bd86a040ba4cb15/test/get_name')
      const test = await axios.get('/api/test')
      const user = await axios.get('/api/user')

      dispatch(reName(res.data.name))

      console.log(res.data.name)
      console.log(test.data)
      console.log(user.data)
      dispatch(hideLoading())
    } catch (error) {
      console.log('error', error)
      dispatch(hideLoading())
    }
  }
)()

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
