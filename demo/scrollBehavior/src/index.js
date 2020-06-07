import Vue from 'vue'
import router from './router'
import App from './App'
import './index.css'
import './index.scss'

// router.beforeEach((to, from, next) => {
//   console.log('beforeEach')
//   next()
// })

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

if (module && module.hot) {
  module.hot.accept()
}
