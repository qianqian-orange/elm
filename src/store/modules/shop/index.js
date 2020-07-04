import {
  SAVE_FILTER_DATA,
  SAVE_RESTAURANT_DATA,
  SAVE_FOOD_DATA,
  INCREASE,
  DECREASE,
  CLEAR_SHOPCAR_DATA,
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
}

export default {
  namespaced: true,
  state: initState,
  mutations,
}
