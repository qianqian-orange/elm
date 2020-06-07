import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const scrollBehavior = function (to, from, savedPosition) {
  debugger
  console.log(document.documentElement.scrollTop)
  from.meta.savedPosition = { x: 0, y: document.documentElement.scrollTop }
  return to.meta.savedPosition ? to.meta.savedPosition : { x: 0, y: 0 }
  // if (savedPosition) {
  //   // savedPosition is only available for popstate navigations.
  //   return savedPosition
  // }
  // else {
  //   const position = {}

  //   // scroll to anchor by returning the selector
  //   if (to.hash) {
  //     position.selector = to.hash

  //     // specify offset of the element
  //     if (to.hash === '#anchor2') {
  //       position.offset = { y: 1000 }
  //     }

  //     // bypass #1number check
  //     if (/^#\d/.test(to.hash) || document.querySelector(to.hash)) {
  //       return position
  //     }

  //     // if the returned position is falsy or an empty object,
  //     // will retain current scroll position.
  //     return false
  //   }

  //   return new Promise(resolve => {
  //     // check if any matched route config has meta that requires scrolling to top
  //     if (to.matched.some(m => m.meta.scrollToTop)) {
  //       // coords will be used if no selector is provided,
  //       // or if the selector didn't match any element.
  //       position.x = 0
  //       position.y = 0
  //     }

  //     // wait for the out transition to complete (if necessary)
  //     this.app.$root.$once('triggerScroll', () => {
  //       // if the resolved position is falsy or an empty object,
  //       // will retain current scroll position.
  //       resolve(position)
  //     })
  //   })
  // }
}

export default new VueRouter({
  mode: 'history',
  scrollBehavior,
  routes: [
    {
      path: '/',
      component: () => import('@/views/A'),
      meta: { scrollToTop: true },
    },
    { path: '/foo', component: () => import('@/views/B') },
    {
      path: '/bar',
      component: () => import('@/views/C'),
      meta: { scrollToTop: true },
    },
  ],
})
