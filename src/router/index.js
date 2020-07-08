import Vue from 'vue'
import VueRouter from 'vue-router'
import { isDev } from '@/config'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: isDev ? '/' : '/elm/',
  routes,
})

export default router
