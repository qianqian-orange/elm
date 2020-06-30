import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from '@/config/router'
import Home from '@/views/home/index.vue'

const {
  home,
  city,
  address,
  shopSearch,
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
    {
      path: '/shop',
      redirect: '/shop/search',
    },
    {
      path: '/shop/search',
      name: shopSearch.name,
      component: () => import('@/views/shop/search/index.vue'),
    },
  ],
})

export default router
