import Todo from '../container/Todo'
import Copyme from '../container/Copyme'
import Completed from '../container/Completed'
import Detail from '../container/Detail'

const configItem = [
  {
    path: '/todo',
    name: '待办事项',
    component: Todo
  },
  {
    path: '/completed',
    name: '已完成事项',
    component: Completed
  },
  {
    path: '/copyme',
    name: '抄送我的',
    component: Copyme
  },
  {
    path: '/detail/:id',
    component: Detail
  }
]

export default configItem
