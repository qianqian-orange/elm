import Vue from 'vue'
import store from './store'
import router from './router'
import App from './App'
import {
  Notify,
  Loading,
} from './ui'
import 'normalize.css'
import '@/config/axios'
import '@/assets/css/index.css'
import '@/ui/index.scss'

Vue.use(Notify)
Vue.use(Loading)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

if (module && module.hot) {
  module.hot.accept()
}
