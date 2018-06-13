import Home from './../component/Home'
import About from './../component/About'
import Process from './../component/Process'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/process',
    component: Process
  },
]
export { routes }
