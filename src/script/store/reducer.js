import { combineReducers } from 'redux'
import {
  SHOW_SEARCH_BARS,
  HIDDEN_SEARCH_BARS,
  AUTHORIZATION_SUCCESS,
  AUTHORIZATION_EXIT,
  GET_ITEMSOURCE_SUCCESS,
  CLEAN_ITEMSOURCE,
  LOADING_ITEMSOURCE,
  NONE_ITEMSOURCE,
  GET_PROCESSES_DETAILS,
  CLEAN_PROCESSES_DETAILS,
  UNDOBYME,
  SHOW_CHOICE,
  HIDDEN_CHOICE,
  SHOW_CHOICE_BARS,
  HIDDEN_CHOICE_BARS,
  GET_CHOICESOURCE_SUCCESS,
  CLEAN_CHOICESOURCE,
  SET_CHOICE_CONDITION,
  INIT_CHOICE_CONDITION,
  SET_CURRENT_CHOICESOURCE,
  INIT_CHOICESOURCE,
  SET_SEARCH_SOURCE,
  INIT_SEARCH_SOURCE,
  SET_SEARCH_CONDITION,
  CLEAN_SEARCH_CONDITION,
  ACCEPT_REJECT_SUCCESS,
  INIT_OPERATE_STATUS
} from './type'

const search = (state = {
  isShowSearch: true,
  isShowSearchBars: false,
  isShowChoice: false,
  isShowChoiceBars: false,
  isShowListItem: true
}, action) => {
  switch (action.type) {
    case SHOW_SEARCH_BARS:
      return {
        ...state,
        isShowSearchBars: true
      }
    case HIDDEN_SEARCH_BARS:
      return {
        ...state,
        isShowSearchBars: false
      }
    case SHOW_CHOICE:
      return {
        ...state,
        isShowSearch: false,
        isShowSearchBars: false,
        isShowChoice: true,
        isShowChoiceBars: false,
        isShowListItem: false
      }
    case HIDDEN_CHOICE:
      return {
        ...state,
        isShowSearch: true,
        isShowChoice: false,
        isShowListItem: true
      }
    case SHOW_CHOICE_BARS:
      return {
        ...state,
        isShowChoiceBars: true
      }
    case HIDDEN_CHOICE_BARS:
      return {
        ...state,
        isShowChoiceBars: false
      }
    default:
      return state
  }
}

const choiceSource = (state = {
  dataSource: null,
  _dataSource: null,
  aggregatedData: null
}, action) => {
  switch (action.type) {
    case GET_CHOICESOURCE_SUCCESS:
      return {
        ...state,
        dataSource: action.payload.dataSource,
        _dataSource: action.payload.dataSource,
        aggregatedData: action.payload.aggregatedData
      }
    case SET_CURRENT_CHOICESOURCE:
      return {
        ...state,
        dataSource: {
          ...state.dataSource,
          [action.payload.type]: {
            ...state.dataSource[action.payload.type],
            current: action.payload.current
          }
        }
      }
    case INIT_CHOICESOURCE:
      return {
        ...state,
        dataSource: state._dataSource
      }
    case CLEAN_CHOICESOURCE:
      return {
        ...state,
        dataSource: null,
        _dataSource: null,
        aggregatedData: null
      }
    default:
      return state
  }
}

const authorization = (state = {
  isAuth: false,
  userInfo: null
}, action) => {
  switch (action.type) {
    case AUTHORIZATION_SUCCESS:
      return {
        ...state,
        isAuth: true,
        userInfo: action.payload
      }
    case AUTHORIZATION_EXIT:
      return {
        ...state,
        isAuth: false,
        userInfo: null
      }
    default:
      return state
  }
}

const itemsource = (state = {
  isLoading: true,
  hasMore: true,
  dataSource: []
}, action) => {
  switch (action.type) {
    case LOADING_ITEMSOURCE:
      return {
        ...state,
        isLoading: true
      }
    case GET_ITEMSOURCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasMore: action.payload.hasMore,
        dataSource: [...state.dataSource, ...action.payload.data]
      }
    case CLEAN_ITEMSOURCE:
      return {
        ...state,
        isLoading: true,
        hasMore: true,
        dataSource: []
      }
    case NONE_ITEMSOURCE:
      return {
        ...state,
        isLoading: false,
        hasMore: false
      }
    default:
      return state
  }
}

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
    case CLEAN_PROCESSES_DETAILS:
      return {
        ...state,
        dataSource: {
          itemSource: [],
          progressSource: [],
          isUnApproval: false,
          allowRejecting: false,
          templateId: null
        }
      }
    default:
      return state
  }
}

const undoByme = (state = {
  undo: false
}, action) => {
  switch (action.type) {
    case UNDOBYME:
      return {
        ...state,
        undo: action.payload
      }
    default:
      return state
  }
}
const choiceCondition = (state = {
  dataSource: null
}, action) => {
  switch (action.type) {
    case SET_CHOICE_CONDITION:
      return {
        ...state,
        dataSource: action.payload
      }
    case INIT_CHOICE_CONDITION:
      return {
        ...state,
        dataSource: null
      }
    default:
      return state
  }
}

const searchSource = (state = {
  dataSource: null,
  initSearchSource: null
}, action) => {
  switch (action.type) {
    case INIT_SEARCH_SOURCE:
      return {
        ...state,
        dataSource: action.payload,
        initSearchSource: action.payload
      }
    case SET_SEARCH_SOURCE:
      return {
        ...state,
        dataSource: action.payload
      }
    default:
      return state
  }
}

const searchCondition = (state = {
  searchUserId: null
}, action) => {
  switch (action.type) {
    case SET_SEARCH_CONDITION:
      return {
        ...state,
        searchUserId: action.payload
      }
    case CLEAN_SEARCH_CONDITION:
      return {
        ...state,
        searchUserId: null
      }
    default:
      return state
  }
}
const operate = (state = {
  isSuccess: false
}, action) => {
  switch (action.type) {
    case INIT_OPERATE_STATUS:
      return {
        ...state,
        isSuccess: false
      }
    case ACCEPT_REJECT_SUCCESS:
      return {
        ...state,
        isSuccess: true
      }
    default:
      return state
  }
}

const reducer = combineReducers({
  search,
  undoByme,
  authorization,
  itemsource,
  detailSource,
  choiceSource,
  choiceCondition,
  searchSource,
  searchCondition,
  operate
})

export default reducer
