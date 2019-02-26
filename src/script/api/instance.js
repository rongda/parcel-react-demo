import axios from 'axios'
import { apiserver, tokenmark } from '../config'
import storage from '../utils/storage'
import { message } from 'antd'

const instance = axios.create({
  baseURL: apiserver,
  timeout: 60000,
  headers: {
    authorization: `${tokenmark} ${storage.get()}`
  }
})

// Add a request interceptor
instance.interceptors.request.use(config => config, error => {
  message.warning('请求超时，请稍后重试', 1)
  return Promise.resolve(error)
})

// Add a response interceptor
instance.interceptors.response.use(response => response, error => {
  if (error.toString().indexOf('timeout') > -1) {
    message.warning('网络出差啦，请稍后重试', 1)
  }
  if (error.response.status === 401) {
    message.warning('账号已登出，请重新认证', 1, () => {
      // 返回登录页面
    })
  }
  if (error.response.status === 500) {
    message.warning('服务端正出差，请稍后重试', 1)
  }
  if (error.response.status === 403) {
    message.warning('您没有相关权限', 1, () => {
      // 回到首页
    })
  }
  return Promise.reject(error)
})

export default instance
