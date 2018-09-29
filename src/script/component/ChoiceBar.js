import React from 'react'
import { connect } from 'react-redux'
import { NoticeBar } from 'antd-mobile'
import {
  hiddenChoiceBars,
  initChoiceCondition,
  initChoiceSource
} from '../store/actions'
import { EXTRASID } from '../config'

@connect(
  state => ({
    search: state.search,
    choiceCondition: state.choiceCondition
  }),
  {
    hiddenChoiceBars,
    initChoiceCondition,
    initChoiceSource
  }
)
class ChoiceBar extends React.Component {
  constructor() {
    super(...arguments)
    this.handleClose = this.handleClose.bind(this)
  }
  handleClose() {
    const {
      hiddenChoiceBars,
      initChoiceCondition,
      initChoiceSource
    } = this.props
    hiddenChoiceBars()
    initChoiceSource()
    initChoiceCondition()
  }
  render() {
    const { isShowChoiceBars } = this.props.search
    const { dataSource } = this.props.choiceCondition
    let condition = ''
    dataSource && EXTRASID.map(item => {
      if (dataSource[item].value !== '-') {
        condition = `${condition}${dataSource[item].description}、`
      }
    })
    return isShowChoiceBars && condition !== '' && (
      <NoticeBar
        mode='closable'
        icon={null}
        onClick={this.handleClose}
      >筛选条件：{condition}</NoticeBar>
    )
  }
}
export default ChoiceBar
