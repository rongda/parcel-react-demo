import React from 'react'
import Menu from './Menu'
import Search from './Search'
import menuData from '../router/config'
import ListViewItem from './ListViewItem'
import Choice from './Choice'
import ChoiceBar from './ChoiceBar'

export default class Template extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Menu menuData={menuData} />
        <Search />
        <Choice />
        <ChoiceBar />
        <ListViewItem />
      </React.Fragment>
    )
  }
}
