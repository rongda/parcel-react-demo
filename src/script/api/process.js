import instance from './instance'
const accept = 'application/json'

const getParam = (extrasValue) => {
  let extras = ''
  if (extrasValue) {
    Object.keys(extrasValue).map((item, index) => {
      if (extrasValue[Object.keys(extrasValue)[index]].value !== '-') {
        extras = `${extras}&${Object.keys(extrasValue)[index]}=${extrasValue[Object.keys(extrasValue)[index]].value}`
      }
    })
  }
  return extras
}

export default () => {
  return {
    // todo
    getTodo(id, template, curPage, pageSize, extrasValue, userId) { // extrasValue => {24: 5, 23: 1}
      const user = userId ? `&user=${userId}` : ''
      return instance.get(`/users/${id}/incomplete-processes?template=${template}${getParam(extrasValue)}${user}`, {
        headers: {
          accept,
          Range: `page=${curPage}*${pageSize}`
        }
      })
    },
    getTodoExtras(id) {
      return instance.get(`/users/${id}/incomplete-process-extras`, {
        headers: { accept }
      })
    },
    // completed
    getCompleted(id, template, curPage, pageSize, extrasValue, userId) {
      const user = userId ? `&user=${userId}` : ''
      return instance.get(`/users/${id}/done-processes?template=${template}${getParam(extrasValue)}${user}`, {
        headers: {
          accept,
          Range: `page=${curPage}*${pageSize}`
        }
      })
    },
    getCompletedExtras(id) {
      return instance.get(`/users/${id}/done-process-extras`, {
        headers: { accept }
      })
    },
    // copyme
    getCopyme(id, template, curPage, pageSize, extrasValue, userId) {
      const user = userId ? `&user=${userId}` : ''
      return instance.get(`/users/${id}/received-processes?template=${template}${getParam(extrasValue)}${user}`, {
        headers: {
          accept,
          Range: `page=${curPage}*${pageSize}`
        }
      })
    },
    getCopymeExtras(id) {
      return instance.get(`/users/${id}/received-process-extras`, {
        headers: { accept }
      })
    },
    // process-templates
    getProcessTemplates(id) {
      return instance.get(`/users/${id}/process-templates`, {
        headers: { accept }
      })
    },
    // processes detail
    getProcessesDetail(id) {
      return instance.get(`/processes/${id}`, {
        headers: { accept }
      })
    },
    // processes acceptance
    acceptProcesses(id, data) {
      return instance.post(`/processes/${id}/acceptance`, data, {
        headers: {
          accept,
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
    },
    // processes rejections
    rejectProcesses(id, data) {
      return instance.post(`/processes/${id}/rejections`, data, {
        headers: {
          accept,
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
    }
  }
}
