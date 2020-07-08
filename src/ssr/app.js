import Vue from 'vue'
import createRouter from '@/router/createRouter'
import createStore from '@/store/createStore'
import { destroy } from '@/assets/lib/scroll'
import '@/cache'
import io from '@/directives/v-lazy'
import App from '@/App.vue'
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
} from '@/ui'
import '@/config/axios'
import titleMixin from '@/mixins/title'
import metaMixin from '@/mixins/meta'
import 'normalize.css'
import '@/assets/css/index.css'
import '@/ui/index.scss'
import '@/assets/font/iconfont.css'

Vue.mixin(titleMixin)
Vue.mixin(metaMixin)

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

export default function createApp() {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    beforeDestroy() {
      destroy()
      io.disconnect()
    },
    render: h => h(App),
  })
  return { app, router, store }
}
