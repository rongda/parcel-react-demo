import React from 'react'
import { connect } from 'react-redux'
import { Flex, WhiteSpace, WingBlank } from 'antd-mobile'
import { choiceCurrent } from '../store/actions'

@connect(
  null,
  { choiceCurrent }
)
class ChoiceItem extends React.Component {
  handleClick(e, type, value, description) {
    this.props.choiceCurrent({
      type,
      current: {
        value,
        description
      }
    })
  }
  render() {
    const { type, source, current } = this.props
    const main = source.map((item, index) => (
      <React.Fragment key={index}>
        <Flex>
          {item.map((_item, _index) => (
            <React.Fragment key={_index}>
              <WingBlank size='sm' />
              <Flex.Item onClick={e => this.handleClick(e, type, _item.value, _item.description)}>
                <div className={
                  `my-choice-item ${current.value === _item.value ? 'my-choice-current-item' : null}`
                }>{_item.description}</div>
              </Flex.Item>
            </React.Fragment>
          ))}
          <WingBlank size='sm' />
        </Flex>
        <WhiteSpace size='lg' />
      </React.Fragment>
    ))
    return main
  }
}

export default ChoiceItem
