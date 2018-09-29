import React from 'react'
import { connect } from 'react-redux'
import { Flex, Card, WhiteSpace, WingBlank, TextareaItem, Button, Toast } from 'antd-mobile'
import { getDetailSource, approval, InitOperateStatus, cleanDetailSource } from '../../store/actions'
import file from '../../api/file'
import process from '../../api/process'
const serverFile = file()

@connect(
  state => ({
    authorization: state.authorization,
    detailSource: state.detailSource,
    operate: state.operate
  }),
  { getDetailSource, approval, InitOperateStatus, cleanDetailSource }
)
class Detail extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {
      disabled: true,
      approvalMsg: '',
      isAdminScan: false,
      shouldUpdate: false
    }
  }
  componentWillMount() {
    const { getDetailSource, match } = this.props
    getDetailSource(match.params.id)
  }
  componentWillUnmount() {
    this.props.cleanDetailSource()
  }
  async componentWillReceiveProps(nextProps) {
    const { isSuccess } = nextProps.operate
    const { progressSource, templateId } = nextProps.detailSource.dataSource
    const { userInfo } = nextProps.authorization
    if (isSuccess) {
      this.props.history.push('/todo')
      this.props.InitOperateStatus()
    }
    // 非当前节点的用户么有权限查看，管理员可以有查看权限，但是没有审批功能
    if (userInfo) {
      // isAdmin
      const isAdmin271 = userInfo.user.permissions.some(item => item === 271)
      const isAdmin285 = userInfo.user.permissions.some(item => item === 285)
      let isFinancialAdmin = false
      // 区分人事管理员，财务管理员.
      if (isAdmin271 && isAdmin285 && templateId !== null) {
        try {
          const {data} = await process().getProcessTemplates(userInfo.user.id)
          isFinancialAdmin = data.some(item => item.id === templateId.toString())
        } catch (error) {
          console.log('error', error)
        }
      }
      if (progressSource.length > 0) {
        let currentNodeIndex = null
        progressSource.some((item, index) => {
          return item.some(_item => {
            if (_item.status === 0) {
              currentNodeIndex = index
              return true
            }
          })
        })
        // 判断是不是该流程已审批的人，可查
        const hasCompleted = progressSource.some(item => item.some(_item => _item.status !== 0 && _item.id === userInfo.user.id))

        // 判断当前节点的人
        const isCurrentNode = progressSource[currentNodeIndex] ? progressSource[currentNodeIndex].map(item => item.id).indexOf(userInfo.user.id) : null
        if (isCurrentNode === -1 && !hasCompleted) {
          if (!isFinancialAdmin) {
            Toast.fail('您没有当前表单的查看权限', 1, () => {
              this.props.history.push('/todo')
            })
            Toast.fail('')
          } else {
            this.setState({
              isAdminScan: true,
              shouldUpdate: true
            })
          }
        } else {
          this.setState({
            shouldUpdate: true
          })
        }
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.shouldUpdate
  }
  handleChange(val) {
    this.setState({
      disabled: val === '',
      approvalMsg: val
    })
  }
  reject(e) {
    e.stopPropagation()
    e.preventDefault()
    const { approvalMsg } = this.state
    approvalMsg.replace(/^\s+/g, '') ? this.props.approval(
      'reject',
      this.props.match.params.id,
      {reason: approvalMsg.replace(/^\s+/g, '')}
    ) : Toast.fail('请正确输入审批意见', 1)
  }
  accept(e, associatedInstance) {
    e.stopPropagation()
    e.preventDefault()
    const { approvalMsg } = this.state
    // axios data
    let data = {
      reason: approvalMsg.replace(/^\s+/g, '')
    }
    if (associatedInstance) {
      data.associated_instance = {id: associatedInstance.id}
    }
    this.props.approval('accept', this.props.match.params.id, data)
  }
  async scan(e, id, filename) {
    try {
      Toast.loading('Loading', 0)
      const {data} = await serverFile.getFile(id)
      Toast.hide()
      console.log('data', data)
      console.log(window.URL.createObjectURL(data))
      //
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(data)
      link.download = filename
      link.click()
      // window.URL.revokeObjectURL(link.href)
    } catch (error) {
      console.log(error)
      if (error.response && error.response.status === 401) {
        return null
      } else {
        Toast.offline('获取文件失败，请稍后重试', 1)
      }
    }
  }
  nodeClass(item) {
    let classname = 'my-progress-item'
    if (item.some(_item => _item.status === 2)) {
      // 红色
      classname = `${classname} my-progress-item-reject`
    } else if (item.some(_item => _item.status === 0)) {
      // 灰色
    } else {
      // 黑色
      classname = `${classname} my-progress-item-through`
    }
    return classname
  }
  lineClass(item) {
    switch (item.status) {
      case 1:
        return 'my-progress-item-one-through'
      case 2:
        return 'my-progress-item-one-reject'
      default:
        return 'my-progress-item-one'
    }
  }
  render() {
    const { progressSource, isUnApproval, allowRejecting, itemSource, reasonTextbox, associatedInstance } = this.props.detailSource.dataSource
    const { disabled, approvalMsg, isAdminScan } = this.state
    // itemSource
    const main = itemSource && itemSource.length > 0 && itemSource.map((item, index) => (
      <React.Fragment key={index}>
        {item.associated ? (
          <React.Fragment>
            {item.associated.map((associatedItem, associatedIndex) => (
              <Flex key={associatedIndex}>
                <Flex.Item>
                  {associatedItem.name}
                </Flex.Item>
                <Flex.Item>
                  {(associatedItem.value instanceof Array) ? (
                    <React.Fragment>
                      {associatedItem.value.map((_item, _index) => (
                        <div
                          key={_index}
                          className='my-file'
                          onClick={e => this.scan(e, _item.id, _item.filename)}
                        >
                          {_item.filename}
                        </div>
                      ))}
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {associatedItem.value && associatedItem.value.indexOf('\n') > -1 ? associatedItem.value.split('\n').map(
                        (item, index) => (<p key={index} className='line'>
                          {item}
                        </p>)
                      ) : associatedItem.value}
                    </React.Fragment>
                  )}
                </Flex.Item>
              </Flex>
            ))}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {item.schedule ? item.schedule.map((scheduleItemRow, scheduleIndexRow) => (
              <Card className='my-schedule' key={scheduleIndexRow}>
                <Card.Header title={`${item.name}${scheduleIndexRow + 1}`} />
                <Card.Body>
                  {scheduleItemRow.map((scheduleItemCol, scheduleIndexCol) => (
                    <Flex key={scheduleIndexCol}>
                      <Flex.Item>
                        {scheduleItemCol.name}
                      </Flex.Item>
                      <Flex.Item>
                        {(scheduleItemCol.value._value instanceof Array) ? (
                          <React.Fragment>
                            {scheduleItemCol.value._value.map((_item, _index) => (
                              <div
                                key={_index}
                                className='my-file'
                                onClick={e => this.scan(e, _item.id)}
                              >
                                {_item.filename}
                              </div>
                            ))}
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            {scheduleItemCol.value._value && scheduleItemCol.value._value.indexOf('\n') > -1 ? scheduleItemCol.value._value.split('\n').map(
                              (item, index) => (<p key={index} className='line'>
                                {item}
                              </p>)
                            ) : scheduleItemCol.value._value}
                          </React.Fragment>
                        )}
                      </Flex.Item>
                    </Flex>
                  ))}
                </Card.Body>
              </Card>
            )) : (
              <Flex>
                <Flex.Item>
                  {item.name}
                </Flex.Item>
                <Flex.Item>
                  {(item.value._value instanceof Array) ? (
                    <React.Fragment>
                      {item.value._value.map((_item, _index) => (
                        <div
                          key={_index}
                          className='my-file'
                          onClick={e => this.scan(e, _item.id, _item.filename)}
                        >
                          {_item.filename}
                        </div>
                      ))}
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {item.value._value && item.value._value.indexOf('\n') > -1 ? item.value._value.split('\n').map(
                        (item, index) => (<p key={index} className='line'>
                          {item}
                        </p>)
                      ) : item.value._value}
                    </React.Fragment>
                  )}
                </Flex.Item>
              </Flex>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    ))
    // progressSource
    const processProgress = progressSource && progressSource.length > 0 && (
      <React.Fragment>
        <WhiteSpace size='lg' />
        <Card className='my-progress'>
          <Card.Header title='审批进度' />
          <Card.Body>
            {progressSource.map((item, index) => (
              <Flex
                key={index}
                className={this.nodeClass(item)}
              >
                <Flex.Item>
                  {item.map((_item, _index) => (
                    <div
                      key={_index}
                      className={this.lineClass(_item)}
                    >
                      <Flex>
                        <Flex.Item>{_item.name}</Flex.Item>
                        <Flex.Item>{_item.nodeName}</Flex.Item>
                        <Flex.Item>{_item.updated_datetime}</Flex.Item>
                      </Flex>
                      <Flex>
                        <Flex.Item className='my-progress-item-reason'>
                          {_item.reason}
                        </Flex.Item>
                      </Flex>
                    </div>
                  ))}
                </Flex.Item>
              </Flex>
            ))}
          </Card.Body>
        </Card>
        <WhiteSpace size='lg' />
      </React.Fragment>
    )
    // belief
    const belief = isUnApproval && progressSource && progressSource.length > 0 && !isAdminScan && itemSource && itemSource.length > 0 && (
      <div className='my-belief'>
        {reasonTextbox.reason_textbox_visible && <TextareaItem
          autoHeight
          placeholder={reasonTextbox.identity === 3 ? '请输入审批意见' : '请输入需要备注的内容'}
          value={approvalMsg}
          onChange={val => this.handleChange(val)}
        />}
        <div className='my-belief-btn'>
          {allowRejecting && <React.Fragment>
            <Button
              inline
              size='small'
              disabled={disabled}
              onClick={e => this.reject(e)}
            >拒绝</Button><WingBlank />
          </React.Fragment>}
          <Button
            type='primary'
            inline
            size='small'
            onClick={e => this.accept(e, associatedInstance)}
          >同意</Button>
        </div>
      </div>
    )

    return (
      <div className={`my-list my-detail ${isUnApproval && !isAdminScan ? 'has-fixed' : ''}`}>
        {isUnApproval && !isAdminScan ? (
          <div className={`my-detail-main ${reasonTextbox.reason_textbox_visible ? '' : 'my-detail-main-uninput'}`}>
            {main}
            {processProgress}
          </div>
        ) : (
          <React.Fragment>
            {main}
            {processProgress}
          </React.Fragment>
        )}
        {belief}
      </div>
    )
  }
}
export default Detail
