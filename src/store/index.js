import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global'
import { isDev } from '@/config'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: isDev,
  modules: {
    global,
  },
})

export default store
