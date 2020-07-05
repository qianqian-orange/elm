import Vue from 'vue'
import VueRouter from 'vue-router'
import { isDev } from '@/config'
import { routes } from '@/config/router'
import Home from '@/views/home/index.vue'

const {
  home,
  city,
  citySearch,
  address,
  addressSearch,
  shopSearch,
  shopOrder,
  shopComment,
  shopDetail,
  food,
  kind,
} = routes

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: isDev ? '/' : '/elm/',
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
      meta: {
        search: '',
        scrollHeight: 0,
      },
    },
    {
      path: '/shop/:id',
      redirect: '/shop/:id/order',
    },
    {
      path: '/shop/:id/order',
      name: shopOrder.name,
      component: () => import('@/views/shop/order/index.vue'),
      meta: {
        scrollHeight: 0,
      },
    },
    {
      path: '/shop/:id/comment',
      name: shopComment.name,
      component: () => import('@/views/shop/comment/index.vue'),
    },
    {
      path: '/shop/:id/detail',
      name: shopDetail.name,
      component: () => import('@/views/shop/detail/index.vue'),
    },
    {
      path: '/food/:id',
      name: food.name,
      component: () => import('@/views/food/index.vue'),
    },
    {
      path: '/kind/:id',
      name: kind.name,
      component: () => import('@/views/kind/index.vue'),
      meta: {
        scrollHeight: 0,
      },
    },
    {
      path: '*',
      component: () => import('@/views/page/404.vue'),
    },
  ],
})

export default router
