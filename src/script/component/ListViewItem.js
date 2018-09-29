import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ListView, Card, Button, Flex, Icon, Badge, Modal, Toast } from 'antd-mobile'
import {
  getDataSource,
  cleanDataSource,
  hasDoByme,
  hiddenChoiceBars,
  initChoiceCondition,
  approval,
  InitOperateStatus
} from '../store/actions'
import {
  mapCurrentPathToApi,
  pageSize,
  PROCESSESSTATUS,
  EXTRASID,
  mapCurrentPathToNotice
} from '../config'
const prompt = Modal.prompt

@withRouter
@connect(
  state => ({
    itemsource: state.itemsource,
    undoByme: state.undoByme,
    search: state.search,
    authorization: state.authorization,
    choiceCondition: state.choiceCondition,
    searchCondition: state.searchCondition,
    operate: state.operate
  }),
  {
    getDataSource,
    cleanDataSource,
    hasDoByme,
    hiddenChoiceBars,
    initChoiceCondition,
    approval,
    InitOperateStatus
  }
)
class ListViewItem extends React.Component {
  constructor(props) {
    super(props)
    this.props.cleanDataSource()
    this.props.hiddenChoiceBars()
    this.props.initChoiceCondition()
    this.props.hasDoByme(this.props.match.path === '/todo')
    this.state = {
      curPage: 1,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      choiceConditionDataSource: null,
      searchUserId: null
    }
  }
  getData(curPage, extrasValue, searchUserId) {
    const { getDataSource, authorization, location } = this.props
    const { userInfo } = authorization
    getDataSource(
      userInfo.user.id,
      mapCurrentPathToApi[location.pathname],
      curPage,
      pageSize,
      extrasValue,
      searchUserId
    )
  }
  componentDidMount() {
    this.getData(
      this.state.curPage,
      this.state.choiceConditionDataSource,
      this.state.searchUserId
    )
  }
  componentWillReceiveProps(nextProps) {
    const choiceConditionDataSource = nextProps.choiceCondition.dataSource
    const { dataSource } = nextProps.itemsource
    const { searchUserId } = nextProps.searchCondition
    const { isSuccess } = nextProps.operate
    const choiceConditionDataSourceOfProps = this.props.choiceCondition.dataSource
    const searchUserIdOfProps = this.props.searchCondition.searchUserId
    const isSuccessOfProps = this.props.operate.isSuccess

    // 关掉选择条件后，重新获取全部数据
    const isCloseGetAll = choiceConditionDataSourceOfProps && !choiceConditionDataSource

    // 开启选择条件后，重新获取选择数据
    const isStartChoice = choiceConditionDataSource && (!choiceConditionDataSourceOfProps || EXTRASID.some(
      item => choiceConditionDataSource[item].value !== choiceConditionDataSourceOfProps[item].value
    ))
    const getChoiceData = () => {
      this.setState({
        curPage: 1,
        choiceConditionDataSource,
        searchUserId: null
      })
      this.getData(1, choiceConditionDataSource, null)
      this.props.cleanDataSource()
    }
    const getSearchData = () => {
      this.setState({
        curPage: 1,
        choiceConditionDataSource: null,
        searchUserId
      })
      this.getData(1, null, searchUserId)
      this.props.cleanDataSource()
    }
    const getInitData = () => {
      this.setState({
        curPage: 1,
        choiceConditionDataSource: null,
        searchUserId: null
      })
      this.getData(
        1,
        this.state.choiceConditionDataSource,
        this.state.searchUserId
      )
      this.props.cleanDataSource()
      this.props.InitOperateStatus()
    }

    if (isCloseGetAll || isStartChoice) {
      // 关掉选择条件后，重新获取全部数据
      getChoiceData()
    } else if (searchUserId !== searchUserIdOfProps) {
      getSearchData()
    } else if (isSuccess && !isSuccessOfProps) {
      getInitData()
    } else {
      dataSource !== this.props.itemsource.dataSource &&
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(dataSource)
      })
    }
  }
  onEndReached(e) {
    // load new data
    const { itemsource } = this.props
    if (!itemsource.hasMore || itemsource.isLoading) {
      return
    }
    this.setState(preState => ({
      curPage: preState.curPage + 1
    }), () => this.getData(
      this.state.curPage,
      this.state.choiceConditionDataSource,
      this.state.searchUserId
    ))
  }
  gotoDetail(id) {
    this.props.history.push(`/detail/${id}`)
  }
  accept(e, id, associated) {
    e.stopPropagation()
    e.preventDefault()
    let data = {
      reason: '同意'
    }
    if (associated) {
      data.associated_instance = {
        id: associated.id
      }
    }
    this.props.approval('accept', id, data)
  }
  reject(e, id, reasonBox) {
    e.stopPropagation()
    e.preventDefault()
    if (reasonBox.reason_textbox_visible) {
      const promptBox = prompt(
        '审批意见', null,
        [{ text: '取消' }, {
          text: '确定',
          onPress: value => new Promise((resolve, reject) => {
            reject(new Error('something bad happened'))
            if (value.replace(/^\s+/g, '')) {
              this.props.approval('reject', id, {
                reason: value.replace(/^\s+/g, '')
              })
              promptBox.close()
            } else {
              Toast.fail('请正确输入审批意见', 1)
            }
          })
        }],
        'default', null, reasonBox.identity === 3 ? ['请输入审批意见'] : ['请输入需要备注的内容']
      )
    }
  }
  render() {
    const { itemsource, undoByme, search, match } = this.props
    const { isLoading, dataSource } = itemsource
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        className='listWhiteSpace'
      />
    )
    const row = (rowData, sectionID, rowID) => (
      <Card
        key={`${sectionID}-${rowID}`}
        full
        onClick={() => this.gotoDetail(rowData.id)}
      >
        <Card.Header
          title={undoByme.undo ? rowData.template_name : (
            <Badge
              text={PROCESSESSTATUS[rowData.status]}
              className={`my-badge my-badge-${rowData.status}`}
            >
              {rowData.template_name}
            </Badge>
          )}
          extra={rowData.created_datetime}
        />
        <Card.Body>
          {rowData.item.map((_item, _index) => (
            <React.Fragment key={_index}>
              {Object.keys(_item).map((__item, __index) => (
                <Flex key={__index}>
                  <Flex.Item className='colon'>
                    {Object.keys(_item)[__index]}
                  </Flex.Item>
                  <Flex.Item>
                    {_item[Object.keys(_item)[__index]]}
                  </Flex.Item>
                </Flex>
              ))}
            </React.Fragment>
          ))}
        </Card.Body>
        {undoByme.undo && (
          <Card.Footer extra={
            <React.Fragment>
              {rowData.allow_rejecting && (
                <React.Fragment>
                  <Button
                    size='small'
                    inline
                    onClick={e => this.reject(e, rowData.id, rowData.reason_textbox)}
                  >拒绝</Button>&ensp;
                </React.Fragment>
              )}
              <Button
                type='primary'
                size='small'
                inline
                onClick={e => this.accept(e, rowData.id, rowData.associated_instance)}
              >同意</Button>
            </React.Fragment>
          } />
        )}
      </Card>
    )
    const footer = () => {
      return (
        <React.Fragment>
          {isLoading ? <div className='my-list-footer'>
            <Icon type='loading' size='lg' color='#ff5073' />
            <div>Loading...</div>
          </div> : (
            dataSource.length > 0 ? null : (
              <div className='my-list-footer'>
                {mapCurrentPathToNotice[match.path]}
              </div>
            )
          )}
        </React.Fragment>
      )
    }
    return search.isShowListItem && (
      <ListView
        className='my-list'
        dataSource={this.state.dataSource}
        renderFooter={footer}
        renderRow={row}
        renderSeparator={separator}
        pageSize={pageSize}
        useBodyScroll
        onScroll={e => console.log('scroll', e)}
        scrollRenderAheadDistance={500}
        onEndReached={e => this.onEndReached(e)}
        onEndReachedThreshold={10}
      />
    )
  }
}

export default ListViewItem
