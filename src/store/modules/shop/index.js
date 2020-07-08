import axios from 'axios'
import { Notify } from '@/ui'
import { getShopList, getRestaurant } from '@/store/api'
import { resolveImageUrl } from '@/utils'
import {
  GET_SHOPLIST_DATA,
  GET_FILTER_DATA,
  GET_RESTAURANT_DATA,
} from './action-types'
import {
  SAVE_FILTER_DATA,
  SAVE_RESTAURANT_DATA,
  SAVE_FOOD_DATA,
  INCREASE,
  DECREASE,
  CLEAR_SHOPCAR_DATA,
  SAVE_SHOPLIST_DATA,
  CLEAR_SHOPLIST_DATA,
  DECREASE_SHOPLIST_DATA,
} from './mutation-types'

const actions = {
  [GET_SHOPLIST_DATA]({ commit, state: { shopList } }) {
    return new Promise((resolve) => {
      if (shopList.finish) return resolve()
      getShopList({
        currentPage: shopList.currentPage,
        pageSize: shopList.pageSize,
      }).then((data) => {
        commit(SAVE_SHOPLIST_DATA, data)
        resolve()
      }).catch(() => {
        Notify({ type: 'danger', message: '获取数据失败' })
      })
    })
  },
  [GET_FILTER_DATA]({ commit }) {
    return axios.get('/api/shop/sort')
      .then(({ data }) => {
        if (data.code !== 0) throw new Error('获取数据失败')
        const { sortList, filterList } = data.data
        commit(SAVE_FILTER_DATA, {
          insideSortFilter: sortList.insideSortFilter,
          outsideSortFilter: sortList.outsideSortFilter,
          outsideFilters: sortList.outsideFilters,
          supports: filterList.supports.map(support => ({
            id: support.id,
            name: support.name,
            imagePath: resolveImageUrl(support.iconHash),
          })),
          activities: filterList.activityTypes,
          averageCosts: filterList.averageCosts,
        })
      })
  },
  [GET_RESTAURANT_DATA]({ commit }, id) {
    return new Promise((resolve, reject) => {
      getRestaurant(id)
        .then((data) => {
          commit(SAVE_RESTAURANT_DATA, data)
          resolve()
        })
        .catch(reject)
    })
  },
}

const mutations = {
  [SAVE_FILTER_DATA]({ filter }, payload) {
    filter.initial = true
    for (const key in payload) {
      if (filter.hasOwnProperty(key)) {
        filter[key] = payload[key]
      }
    }
  },
  [SAVE_RESTAURANT_DATA](state, payload) {
    state.restaurant = payload
  },
  [SAVE_FOOD_DATA](state, payload) {
    state.food = payload
  },
  [INCREASE]({ restaurant: { menu, shopCar } }, { id, categoryId }) {
    const item = menu.find(item => item.id === categoryId)
    item.count += 1
    const food = item.foods.find(item => item.id === id)
    food.count += 1
    const index = shopCar.findIndex(item => item === food)
    if (index === -1) shopCar.push(food)
  },
  [DECREASE]({ restaurant: { menu, shopCar } }, { id, categoryId }) {
    const item = menu.find(item => item.id === categoryId)
    item.count -= 1
    const food = item.foods.find(item => item.id === id)
    food.count -= 1
    if (food.count === 0) shopCar.splice(shopCar.findIndex(item => item === food), 1)
  },
  [CLEAR_SHOPCAR_DATA]({ restaurant: { menu, shopCar } }) {
    menu.forEach((item) => {
      item.count = 0
    })
    shopCar.forEach((item) => {
      item.count = 0
    })
    shopCar.length = 0
  },
  [SAVE_SHOPLIST_DATA]({ shopList }, data) {
    if (data.length === 0 || data.length < shopList.pageSize) shopList.finish = true
    shopList.currentPage += 1
    shopList.data.push(...data)
  },
  [CLEAR_SHOPLIST_DATA]({ shopList }) {
    shopList.data = []
    shopList.finish = false
    shopList.currentPage = 1
  },
  [DECREASE_SHOPLIST_DATA]({ shopList }, index) {
    shopList.data.splice(index, 1)
  },
}

export default {
  namespaced: true,
  state: () => ({
    filter: {
      initial: false,
      insideSortFilter: [],
      outsideSortFilter: [],
      outsideFilters: [],
      supports: [],
      activities: [],
      averageCosts: [],
    },
    restaurant: null,
    food: null,
    shopList: {
      data: [],
      finish: false,
      currentPage: 1,
      pageSize: 8,
    },
  }),
  actions,
  mutations,
}
