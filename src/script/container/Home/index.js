import React from 'react'
import { Button } from 'antd'

export default class Home extends React.PureComponent {
  async fun() {
    console.log('1111122')
    const v = await 1
    console.log(v)
    const arr = Array.from([1, 2, 3], x => x + x)
    console.log(arr.map(item => item * 2))
  }
  async componentDidMount() {
    const arr = [1, 2, 3]
    const arr2 = [3, 4, 5]
    console.log([...arr, ...arr2])
  }
  render() {
    return (
      <div className='home'>
        系统首页---
        <Button type='primary' onClick={() => this.fun()}>
          按钮
        </Button>
      </div>
    )
  }
}
