import React from 'react'
import ShowNameList from '../containers/ShowNameList.js'
import ShowUniversityList from '../containers/ShowUniversityList.js'

class Home extends React.Component {
  render () {
    return (
      <div>
        <header>Hello React</header>
        <ShowNameList />
        <ShowUniversityList />
        <footer>@2018</footer>
      </div>
    )
  }
}

export default Home
