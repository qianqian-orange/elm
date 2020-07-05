import axios from 'axios'
import { Notify } from '@/ui'

axios.defaults.baseURL = '/elm'
axios.interceptors.request.use(config => config, (e) => {
  Notify({ type: 'danger', message: '请求超时,请稍后再试' })
  return Promise.reject(e)
})
axios.interceptors.response.use((response) => response, (e) => {
  Notify({ type: 'danger', message: '请求数据失败' })
  return Promise.reject(e)
})
