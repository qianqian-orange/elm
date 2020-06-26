import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/address',
      name: 'address',
      component: () => import('@/views/address/index.vue'),
      children: [
        {
          path: 'search',
          component: () => import('@/views/address/search.vue'),
        },
      ],
    },
    {
      path: '/city',
      name: 'city',
      component: () => import('@/views/city/index.vue'),
      children: [
        {
          path: 'search',
          component: () => import('@/views/city/search.vue'),
        },
      ],
    },
    {
      path: '/a',
      component: () => import('@/views/A/index.vue'),
      children: [
        {
          path: 'b',
          component: () => import('@/views/B/index.vue'),
        },
      ],
    },
  ],
})

export default router
