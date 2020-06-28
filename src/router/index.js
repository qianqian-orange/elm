import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from '@/config/router'
import Home from '@/views/home/index.vue'

const {
  home,
  city,
  address,
} = routes

const addressSearch = address.children.search
const citySearch = city.children.search

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
      name: home.name,
      component: Home,
    },
    {
      path: '/address',
      name: address.name,
      component: () => import('@/views/address/index.vue'),
      // children: [
      //   {
      //     path: 'search',
      //     name: addressSearch.name,
      //     component: () => import('@/views/address/search.vue'),
      //   },
      // ],
    },
    {
      path: '/address/search',
      name: addressSearch.name,
      component: () => import('@/views/address/search.vue'),
    },
    {
      path: '/city',
      name: city.name,
      component: () => import('@/views/city/index.vue'),
      children: [
        {
          path: 'search',
          name: citySearch.name,
          component: () => import('@/views/city/search.vue'),
        },
      ],
    },
  ],
})

export default router
