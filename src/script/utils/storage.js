import { token } from '../config'

export default {
  get() {
    return localStorage.getItem(token)
  },
  remove() {
    let value = this.get()
    localStorage.removeItem(token)
    return value
  },
  set(value) {
    localStorage.setItem(token, value)
  }
}
