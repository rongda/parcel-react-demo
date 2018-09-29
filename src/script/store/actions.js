/* eslint camelcase: 0 */
import { Toast } from 'antd-mobile'
import url from 'url'
import process from '../api/process'
import contacts from '../api/contacts'
import { CATEGORY } from '../config'
import {
  fiterDepartment,
  fiterKeyValues,
  fiterDetailSource,
  fiterChoiceSource,
  fiterSearchSource,
  filterReasonTextbox
} from '../utils/fiterApiData'
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

// action
const InitOperateStatus = () => ({
  type: INIT_OPERATE_STATUS
})

const acceptRejectSuccess = () => ({
  type: ACCEPT_REJECT_SUCCESS
})

const showSearchBars = () => ({
  type: SHOW_SEARCH_BARS
})

const hiddenSearchBars = () => ({
  type: HIDDEN_SEARCH_BARS
})

const showChoice = () => ({
  type: SHOW_CHOICE
})

const hiddenChoice = () => ({
  type: HIDDEN_CHOICE
})

const showChoiceBars = () => ({
  type: SHOW_CHOICE_BARS
})

const hiddenChoiceBars = () => ({
  type: HIDDEN_CHOICE_BARS
})

const authSuccess = data => ({
  type: AUTHORIZATION_SUCCESS,
  payload: data
})

const authExit = () => ({
  type: AUTHORIZATION_EXIT
})

const getDataSourceSuccess = data => ({
  type: GET_ITEMSOURCE_SUCCESS,
  payload: data
})

const getChoiceSourceSuccess = data => ({
  type: GET_CHOICESOURCE_SUCCESS,
  payload: data
})

const cleanDataSource = () => ({
  type: CLEAN_ITEMSOURCE
})
const cleanChoiceSource = () => ({
  type: CLEAN_CHOICESOURCE
})

const startLoading = () => ({
  type: LOADING_ITEMSOURCE
})

const noneDataSource = () => ({
  type: NONE_ITEMSOURCE
})

const hasDoByme = data => ({
  type: UNDOBYME,
  payload: data
})

const getDetailSourceSuccess = data => ({
  type: GET_PROCESSES_DETAILS,
  payload: data
})

const cleanDetailSource = () => ({
  type: CLEAN_PROCESSES_DETAILS
})

const setChoiceCondition = data => ({
  type: SET_CHOICE_CONDITION,
  payload: data
})

const initChoiceCondition = () => ({
  type: INIT_CHOICE_CONDITION
})

const choiceCurrent = data => ({
  type: SET_CURRENT_CHOICESOURCE,
  payload: data
})
const setSearchCondition = data => ({
  type: SET_SEARCH_CONDITION,
  payload: data
})

const cleanSearchCondition = () => ({
  type: CLEAN_SEARCH_CONDITION
})

const initSearchSource = data => ({
  type: INIT_SEARCH_SOURCE,
  payload: data
})

const setSearchSource = data => ({
  type: SET_SEARCH_SOURCE,
  payload: data
})

const getSearchSource = () => {
  return async dispatch => {
    try {
      const { data } = await contacts().getContacts()
      dispatch(initSearchSource(fiterSearchSource(data)))
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(noneDataSource())
      }
    }
  }
}

const fitlerSearchSource = filter => {
  return (dispatch, getState) => {
    const filterData = getState().searchSource.initSearchSource.filter(
      item => item.value.indexOf(filter) !== -1
    )
    dispatch(setSearchSource(filterData))
  }
}
const getChoiceSource = (apistate, userid) => {
  return async dispatch => {
    try {
      const extras = await process()[`${apistate}Extras`](userid)
      const { aggregated_data } = extras.data
      dispatch(getChoiceSourceSuccess({
        dataSource: fiterChoiceSource(aggregated_data),
        _dataSource: fiterChoiceSource(aggregated_data),
        aggregatedData: aggregated_data
      }))
    } catch (error) {
      if (error.response.status === 404) {
        Toast.fail('没有源数据', 1)
      }
    }
  }
}

const initChoiceSource = () => ({
  type: INIT_CHOICESOURCE
})

const getDataSource = (userid, apistate, curPage, pageSize, extrasValue, searchUserId) => {
  return async(dispatch, getState) => {
    try {
      dispatch(startLoading())
      let idArr = []
      const { data } = await process().getProcessTemplates(userid)
      data.map(item => item.category === CATEGORY ? idArr.push(item.id) : null)
      const templateData = await process()[apistate](
        userid,
        idArr.join(','),
        curPage,
        pageSize,
        extrasValue,
        searchUserId
      )
      const total = templateData.headers['content-range'].split('/')[1]
      const fiterData = templateData.data.map(item => ({
        id: item.id,
        template_name: item.template.name,
        allow_rejecting: item.template.allow_rejecting,
        created_datetime: item.created_datetime,
        status: item.status,
        reason_textbox: filterReasonTextbox(item, getState().authorization.userInfo.user.id),
        associated_instance: item.associated_instance,
        item: [{
          '发起人': item.user.name,
          '部门': fiterDepartment(item.user.department.family)
        }].concat(fiterKeyValues(item, getState().choiceSource.aggregatedData))
      }))
      dispatch(getDataSourceSuccess({
        data: fiterData,
        hasMore: curPage * pageSize < total
      }))
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(noneDataSource())
      }
    }
  }
}

const getDetailSource = processId => async(dispatch, getState) => {
  try {
    Toast.loading('Loading')
    const { data } = await process().getProcessesDetail(processId)
    dispatch(getDetailSourceSuccess(
      fiterDetailSource(data, getState().authorization.userInfo.user.id)
    ))
    Toast.hide()
  } catch (error) {
    console.log('error', error)
    if (error.response && error.response.status === 404) {
      Toast.fail('没有源数据', 1, () => {
        window.location.href = url.format({
          host: window.location.host,
          protocol: window.location.protocol,
          port: window.location.port,
          pathname: '/todo'
        })
      })
    }
  }
}
// acceptRejectSuccess
const approval = (operate, id, data) => async dispatch => { // operate -> Processes accept reject
  try {
    Toast.loading('正在审批', 0)
    const response = await process()[`${operate}Processes`](id, data)
    if (response.status === 200 && response.statusText === 'OK') {
      Toast.hide()
      Toast.success('已审批成功', 1, () => dispatch(acceptRejectSuccess()))
    } else if (response.status === 240) {
      Toast.hide()
      Toast.fail('请进入表单详情，完善数据', 1)
    }
  } catch (error) {
    if (error.response.status === 400) {
      Toast.hide()
      Toast.fail('手机端暂不支持编辑功能，请登录PC端进行处理', 1)
    }
  }
}

export {
  showSearchBars,
  hiddenSearchBars,
  authSuccess,
  authExit,
  getDataSource,
  getChoiceSource,
  cleanDataSource,
  getDetailSource,
  cleanDetailSource,
  hasDoByme,
  showChoice,
  hiddenChoice,
  showChoiceBars,
  hiddenChoiceBars,
  cleanChoiceSource,
  setChoiceCondition,
  initChoiceCondition,
  choiceCurrent,
  initChoiceSource,
  getSearchSource,
  fitlerSearchSource,
  setSearchCondition,
  cleanSearchCondition,
  InitOperateStatus,
  approval
}
