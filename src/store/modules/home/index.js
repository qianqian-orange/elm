import axios from 'axios'
import { getShopList } from '@/store/api'

import {
  GET_ADVERTISEMENT_DATA,
  GET_KIND_DATA,
  GET_SHOPLIST_DATA,
} from './action-types'

import {
  SAVE_ADVERTISEMENT_DATA,
  SAVE_KIND_DATA,
  SAVE_SHOPLIST_DATA,
  UPDATE_SHOPLIST_DATA,
  DELETE_SHOPLIST_DATA,
} from './mutation-types'

const actions = {
  [GET_ADVERTISEMENT_DATA]({ commit }) {
    return axios.get('/api/advertisement/list')
      .then(({ data }) => {
        if (data.code !== 0) throw new Error('获取数据失败')
        commit(SAVE_ADVERTISEMENT_DATA, data.data)
      })
  },
  [GET_KIND_DATA]({ commit }) {
    return axios.get('/api/kind/list')
      .then(({ data }) => {
        if (data.code !== 0) throw new Error('获取数据失败')
        commit(SAVE_KIND_DATA, data.data)
      })
  },
  [GET_SHOPLIST_DATA]({ commit, state: { shopList } }, more) {
    return new Promise((resolve, reject) => {
      if (shopList.finish) return resolve()
      getShopList({
        currentPage: shopList.currentPage,
        pageSize: shopList.pageSize,
      }).then((data) => {
        commit(SAVE_SHOPLIST_DATA, { data, more })
        resolve()
      }).catch(reject)
    })
  },
}

const mutations = {
  [SAVE_ADVERTISEMENT_DATA](state, data) {
    state.advertisement = data
  },
  [SAVE_KIND_DATA](state, data) {
    const length = Math.ceil(data.length / state.col)
    for (let i = 0; i < length; i += 1) {
      state.kindGroup.push(data.slice(i * state.col, (i + 1) * state.col))
    }
  },
  [SAVE_SHOPLIST_DATA]({ shopList }, { data, more }) {
    if (data.length === 0 || data.length < shopList.pageSize) shopList.finish = true
    shopList.currentPage += 1
    if (more) shopList.data.push(...data)
    else shopList.data = data
  },
  [UPDATE_SHOPLIST_DATA]({ shopList }) {
    shopList.finish = false
    shopList.currentPage = 1
  },
  [DELETE_SHOPLIST_DATA]({ shopList }, index) {
    shopList.data.splice(index, 1)
  },
}

// 注意这里使用函数方式创建state
// 否则采用服务端渲染时数据会被共享，那这样是不对，每个请求应该有自己的state
// 一句话，state保证是纯函数
export default {
  namespaced: true,
  state: () => ({
    advertisement: [],
    kindGroup: [],
    shopList: {
      data: [],
      currentPage: 1,
      pageSize: 8,
      finish: false,
    },
    col: 10,
  }),
  actions,
  mutations,
}
