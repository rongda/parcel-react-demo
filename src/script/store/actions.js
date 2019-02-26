/* eslint camelcase: 0 */
import {
  GET_PROCESSES_DETAILS
} from './type'

// action

const getDetailSource = data => ({
  type: GET_PROCESSES_DETAILS,
  payload: data
})

export {
  getDetailSource
}
