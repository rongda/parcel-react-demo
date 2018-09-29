import instance from './instance'
const accept = 'application/json'

export default () => {
  return {
    getContacts() {
      return instance.get(`/contacts`, {
        headers: { accept }
      })
    }
  }
}
