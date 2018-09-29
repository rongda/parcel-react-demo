import React from 'react'
import { connect } from 'react-redux'
import { Flex } from 'antd-mobile'
import SearchBars from './SearchBars'
import {
  showSearchBars,
  hiddenSearchBars,
  showChoice,
  hiddenChoice,
  cleanChoiceSource,
  getSearchSource
} from '../store/actions'
const Item = Flex.Item

@connect(
  state => ({
    search: state.search,
    choiceSource: state.choiceSource
  }),
  {
    showSearchBars,
    hiddenSearchBars,
    showChoice,
    hiddenChoice,
    cleanChoiceSource,
    getSearchSource
  }
)
class Search extends React.Component {
  constructor() {
    super(...arguments)
    this.props.hiddenSearchBars()
    this.props.hiddenChoice()
    this.props.cleanChoiceSource()
    this.handleShowChoice = this.handleShowChoice.bind(this)
  }
  componentDidMount() {
    this.props.getSearchSource()
  }
  handleShowChoice() {
    const { choiceSource } = this.props
    if (choiceSource.dataSource) {
      this.props.showChoice()
    }
  }
  render() {
    // console.log(this.props)
    const {
      search,
      showSearchBars
    } = this.props
    const {
      isShowSearch,
      isShowSearchBars
    } = search
    return isShowSearch && (!isShowSearchBars ? (
      <Flex className='my-search'>
        <Item onClick={showSearchBars}>搜索</Item>
        <Item onClick={this.handleShowChoice}>筛选</Item>
      </Flex>
    ) : <SearchBars />)
  }
}
export default Search
