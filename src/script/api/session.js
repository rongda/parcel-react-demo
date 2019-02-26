import axios from 'axios'
import { apiserver, codemark, tokenmark } from '../config'
const accept = 'application/json'

export default () => {
  return {
    // login with authorization code
    create(code) {
      return axios.post(`${apiserver}/sessions`, null, {
        headers: {
          authorization: `${codemark} ${code}`,
          accept: accept
        }
      })
    },
    // session details
    get(id) {
      return axios.get(`${apiserver}/sessions/${encodeURIComponent(id)}`, {
        headers: {
          authorization: `${tokenmark} ${id}`,
          accept: accept
        }
      })
    },
    // logout
    remove(id) {
      return axios.delete(`${apiserver}/sessions/${encodeURIComponent(id)}`, {
        headers: {
          authorization: `${tokenmark} ${id}`,
          accept: accept
        }
      })
    }
  }
}
