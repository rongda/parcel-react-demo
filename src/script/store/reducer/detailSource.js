import {
  GET_PROCESSES_DETAILS
} from '../type.js'

const detailSource = (state = {
  dataSource: {
    itemSource: [],
    progressSource: [],
    isUnApproval: false,
    allowRejecting: false,
    templateId: null
  }
}, action) => {
  switch (action.type) {
    case GET_PROCESSES_DETAILS:
      return {
        ...state,
        dataSource: action.payload
      }
    default:
      return state
  }
}

export default detailSource
