import Vue from 'vue'
import store from './store'
import router from './router'
import './cache'
import App from './App'
import {
  Notify,
  Loading,
  Tag,
  Icon,
  Fold,
  Mask,
  Search,
} from './ui'
import 'normalize.css'
import '@/config/axios'
import '@/assets/css/index.css'
import '@/ui/index.scss'

Vue.use(Notify)
Vue.use(Loading)
Vue.use(Tag)
Vue.use(Icon)
Vue.use(Fold)
Vue.use(Mask)
Vue.use(Search)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

if (module && module.hot) {
  module.hot.accept()
}
