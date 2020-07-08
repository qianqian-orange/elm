import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

// 这里有个问题是base在服务端路由定位中没起作用
// 解决方案就是把当前的请求路径匹配base的部分replace为/
export default function createRouter() {
  return new VueRouter({
    mode: 'history',
    base: '/elm/',
    routes,
  })
}
