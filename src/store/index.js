import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global'
import shop from './modules/shop'
import { isDev } from '@/config'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: isDev,
  modules: {
    global,
    shop,
  },
})

export default store
