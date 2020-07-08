import createApp from './app'

const { app, store, router } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// 由于路由使用了懒加载，所以客户端渲染的时候需要去加载对应路由的js
// 那么这时候会先渲染注释节点，那么就跟服务端返回的html结构不一致了
// 那么就会报错: The client-side rendered virtual DOM tree is not matching server-rendered content
// 解决方法就是在异步路由加载完成后在执行vue的mount逻辑
router.onReady(() => {
  app.$mount('#app')
})

if (module && module.hot) {
  module.hot.accept()
}
