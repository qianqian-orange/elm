import axios from 'axios'
import { Notify } from '@/ui'
import { isServer } from '@/config'

axios.defaults.baseURL = isServer ? 'http://localhost:4000/elm' : '/elm'
axios.defaults.timeout = 5000
axios.interceptors.request.use(config => config, (e) => {
  Notify({ type: 'danger', message: '请求超时,请稍后再试' })
  return Promise.reject(e)
})
axios.interceptors.response.use((response) => response, (e) => {
  Notify({ type: 'danger', message: '请求数据失败' })
  return Promise.reject(e)
})
