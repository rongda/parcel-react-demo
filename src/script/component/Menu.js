import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Flex } from 'antd-mobile'
const Item = Flex.Item

@withRouter
@connect(
  state => ({
    isLoading: state.itemsource.isLoading
  }),
  null
)
class Menu extends React.Component {
  render() {
    const { isLoading, menuData, location } = this.props
    const { pathname } = location
    let _menuData = []
    menuData.map(item => item.name ? _menuData.push(item) : null)
    return (
      <Flex className='my-menu'>
        {_menuData.map((item, index) => (
          <Item
            key={index}
            className={pathname.indexOf(item.path) > -1 ? 'my-menu-item' : null}
          >
            {isLoading ? (
              <React.Fragment>
                {item.name}
              </React.Fragment>
            ) : (
              <Link to={item.path}>
                {item.name}
              </Link>
            )}
          </Item>
        ))}
      </Flex>
    )
  }
}

export default Menu

Menu.propTypes = {
  menuData: PropTypes.array.isRequired
}
