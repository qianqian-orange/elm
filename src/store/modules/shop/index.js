import axios from 'axios'
import { Notify } from '@/ui'
import { resolveImageUrl } from '@/utils'
import {
  GET_SHOPLIST_DATA,
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
} from './mutation-types'

const initState = {
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
}

const actions = {
  [GET_SHOPLIST_DATA]({ commit, state: { shopList } }) {
    return new Promise((resolve) => {
      if (shopList.finish) return resolve()
      axios.get('/api/shop/recommend', {
        params: {
          currentPage: shopList.currentPage,
          pageSize: shopList.pageSize,
        },
      }).then(({ data }) => {
        if (data.code !== 0) {
          Notify({ type: 'danger', message: '获取数据失败' })
          return
        }
        const result = data.data.map(({ restaurant, foods }) => {
          return {
            id: restaurant.id,
            name: restaurant.name,
            rating: restaurant.rating,
            recentOrderNum: restaurant.recent_order_num,
            floatMinimumOrderAmount: restaurant.float_minimum_order_amount,
            floatDeliveryFee: restaurant.float_delivery_fee,
            distance: restaurant.distance,
            orderLeadTime: restaurant.order_lead_time,
            recommendReasons: restaurant.recommend_reasons.map(({ reason }) => reason),
            supportTags: restaurant.support_tags.map(item => ({
              color: item.color,
              border: item.border,
              text: item.text,
              background: item.background ? {
                rgbFrom: item.background.rgb_from,
                rgbTo: item.background.rgb_to,
              } : null,
            })),
            imagePath: resolveImageUrl(restaurant.image_path),
            activities: restaurant.activities.map(item => ({
              description: item.description,
              iconColor: item.icon_color,
              iconName: item.icon_name,
              id: item.id,
            })),
            foods: foods ? foods.map((food) => ({
              id: food.id,
              name: food.name,
              price: food.price,
              imagePath: resolveImageUrl(food.image_path),
            })) : [],
          }
        })
        commit(SAVE_SHOPLIST_DATA, result)
        resolve()
      })
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
}

export default {
  namespaced: true,
  state: initState,
  actions,
  mutations,
}
