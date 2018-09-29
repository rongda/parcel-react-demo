import instance from './instance'

export default () => {
  return {
    getFile(id) {
      return instance.get(`/files/${id}`, {
        responseType: 'blob'
      })
    }
  }
}
