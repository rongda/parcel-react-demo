import axios from 'axios'
import url from 'url'
import { apiserver, tokenmark } from '../config'
import storage from '../utils/storage'
import urlFormat from '../utils/urlFormat'
import { Toast } from 'antd-mobile'

const instance = axios.create({
  baseURL: apiserver,
  timeout: 6000,
  headers: {
    authorization: `${tokenmark} ${storage.get()}`
  }
})

// Add a request interceptor
instance.interceptors.request.use(config => config, error => {
  Toast.offline('请求超时，请稍后重试', 1)
  return Promise.resolve(error)
})

// Add a response interceptor
instance.interceptors.response.use(response => response, error => {
  console.log('error', error)
  if (error.toString().indexOf('timeout') > -1) {
    Toast.offline('网络出差啦，请稍后重试', 2)
  }
  if (error.response.status === 401 && error.response.headers.error === '5') {
    Toast.offline('账号已登出，请重新认证', 1, () => {
      window.location.href = urlFormat(window.location.href)
    })
  }
  if (error.response.status === 500) {
    Toast.offline('服务端正出差，请稍后重试', 1)
  }
  if (error.response.status === 403) {
    Toast.offline('您没有相关数据', 1, () => {
      window.location.href = url.format({
        host: window.location.host,
        protocol: window.location.protocol,
        port: window.location.port,
        pathname: '/todo'
      })
    })
  }
  return Promise.reject(error)
})

export default instance
