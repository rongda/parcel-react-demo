import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ChoiceItem from './ChoiceItem'
import { Button } from 'antd-mobile'
import {
  hiddenChoice,
  setChoiceCondition,
  showChoiceBars,
  getChoiceSource
} from '../store/actions'
import { EXTRASID, mapCurrentPathToApi } from '../config'

@withRouter
@connect(
  state => ({
    search: state.search,
    authorization: state.authorization,
    choiceSource: state.choiceSource
  }),
  {
    hiddenChoice,
    setChoiceCondition,
    showChoiceBars,
    getChoiceSource
  }
)
class Choice extends React.Component {
  constructor() {
    super(...arguments)
    const { getChoiceSource, authorization, location } = this.props
    getChoiceSource(
      mapCurrentPathToApi[location.pathname],
      authorization.userInfo.user.id
    )
    this.choicing = this.choicing.bind(this)
  }
  choicing() {
    // choice
    const {
      choiceSource,
      hiddenChoice,
      setChoiceCondition,
      showChoiceBars
    } = this.props
    hiddenChoice()
    setChoiceCondition({
      [EXTRASID[0]]: choiceSource.dataSource[EXTRASID[0]].current,
      [EXTRASID[1]]: choiceSource.dataSource[EXTRASID[1]].current
    })
    showChoiceBars()
  }
  render() {
    const { choiceSource, search } = this.props
    const { isShowChoice } = search
    return isShowChoice && choiceSource.dataSource && (
      <React.Fragment>
        <div className='my-choice'>
          <section>报销类型</section>
          <ChoiceItem
            type={EXTRASID[0]}
            source={choiceSource.dataSource[EXTRASID[0]].source}
            current={choiceSource.dataSource[EXTRASID[0]].current}
          />
          <section>所属主体</section>
          <ChoiceItem
            type={EXTRASID[1]}
            source={choiceSource.dataSource[EXTRASID[1]].source}
            current={choiceSource.dataSource[EXTRASID[1]].current}
          />
          <Button
            className='my-choice-btn'
            type='primary'
            onClick={this.choicing}
          >
            确定
          </Button>
        </div>
      </React.Fragment>
    )
  }
}
export default Choice
