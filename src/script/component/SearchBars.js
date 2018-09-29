import React from 'react'
import { SearchBar, Flex } from 'antd-mobile'
import { connect } from 'react-redux'
import {
  hiddenSearchBars,
  fitlerSearchSource,
  setSearchCondition,
  cleanSearchCondition,
  hiddenChoiceBars,
  initChoiceCondition,
  initChoiceSource
} from '../store/actions'

@connect(
  state => state.searchSource,
  {
    hiddenSearchBars,
    fitlerSearchSource,
    setSearchCondition,
    cleanSearchCondition,
    hiddenChoiceBars,
    initChoiceCondition,
    initChoiceSource
  }
)
class SearchBars extends React.PureComponent {
  constructor() {
    super(...arguments)
    this.state = {
      currentValue: '',
      currentId: null,
      isShowSearchBox: true
    }
    this.props.cleanSearchCondition()
  }
  componentDidMount() {
    this.autoFocusInst.focus()
  }
  componentWillUnmount() {
    clearTimeout(this.timerBlur)
    clearTimeout(this.timerFocus)
  }
  handleBlur() {
    this.timerBlur = setTimeout(() => this.setState({
      isShowSearchBox: false
    }), 10)
  }
  handleFocus() {
    const { fitlerSearchSource } = this.props
    const { currentValue } = this.state
    fitlerSearchSource(currentValue)
    this.timerFocus = setTimeout(() => this.setState({
      isShowSearchBox: true
    }), 250)
  }
  handleChange(val) {
    const { fitlerSearchSource } = this.props
    fitlerSearchSource(val)
    this.setState({
      currentValue: val,
      isShowSearchBox: true
    })
  }
  handleSubmit(val) {
    // 点击键盘上的enter事件，去搜索
  }
  handleCancel(val) {
    const {
      initChoiceSource,
      hiddenSearchBars,
      cleanSearchCondition,
      initChoiceCondition
    } = this.props
    initChoiceSource()
    hiddenSearchBars()
    cleanSearchCondition()
    initChoiceCondition()
  }
  // 点击搜索箱子内容条
  handleSearchBox(e, id, value) {
    const {
      hiddenChoiceBars,
      setSearchCondition
    } = this.props
    hiddenChoiceBars()
    setSearchCondition(id)
    this.setState({
      currentValue: value,
      currentId: id
    })
  }
  handleClear(val) {
    const { fitlerSearchSource } = this.props
    this.setState({
      currentValue: '',
      currentId: null,
      isShowSearchBox: true
    }, () => {
      fitlerSearchSource(this.state.currentValue)
    })
  }
  render() {
    const { dataSource } = this.props
    const { isShowSearchBox, currentValue } = this.state
    return (
      <div className='my-search-wrap'>
        <SearchBar
          showCancelButton
          placeholder='输入员工姓名、工号'
          value={currentValue}
          ref={ref => { this.autoFocusInst = ref }}
          onCancel={val => this.handleCancel(val)}
          cancelText={'取消'}
          onBlur={() => this.handleBlur()}
          onFocus={() => this.handleFocus()}
          onChange={val => this.handleChange(val)}
          onSubmit={val => this.handleSubmit(val)}
          onClear={val => this.handleClear(val)}
        />
        {isShowSearchBox && <div className='my-search-box'>
          {dataSource && dataSource.length > 0 ? dataSource.map((item, index) => (
            <Flex
              key={index}
              onClick={e => this.handleSearchBox(e, item.id, item.value)}
            >
              <Flex.Item>{item.value}</Flex.Item>
            </Flex>
          )) : (
            <div className='my-search-none'>
              没有匹配的结果
            </div>
          )}
        </div>}
      </div>
    )
  }
}
export default SearchBars
