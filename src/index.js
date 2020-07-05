import Vue from 'vue'
import store from './store'
import router from './router'
import { destroy } from '@/assets/lib/scroll'
import './cache'
import io from './directives/v-lazy'
import App from './App'
import {
  Notify,
  Loading,
  Tag,
  Icon,
  Fold,
  Mask,
  Search,
  Empty,
  Dialog,
  Drawer,
  Badge,
} from './ui'
import '@/config/axios'
import 'normalize.css'
import '@/assets/css/index.css'
import '@/ui/index.scss'
import '@/assets/font/iconfont.css'

Vue.use(Notify)
Vue.use(Loading)
Vue.use(Tag)
Vue.use(Icon)
Vue.use(Fold)
Vue.use(Mask)
Vue.use(Search)
Vue.use(Empty)
Vue.use(Dialog)
Vue.use(Drawer)
Vue.use(Badge)

new Vue({
  router,
  store,
  beforeDestroy() {
    destroy()
    io.disconnect()
  },
  render: h => h(App),
}).$mount('#app')

if (module && module.hot) {
  module.hot.accept()
}
