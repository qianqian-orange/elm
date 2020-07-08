import createApp from './app'

const base = '/elm/'
export default context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  return new Promise((resolve, reject) => {
    const { store, router, app } = createApp()
    const { url } = context
    // 这里手动修改路径，解决base不起作用的问题，不知道具体原因
    const path = url.replace(/^\/elm\/?/, '/')
    const { fullPath } = router.resolve(path).route
    if (fullPath !== path) return reject({ url: base.substr(0, base.length - 1) + fullPath })
    // 设置服务器端 router 的位置
    router.push(path)
    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matches = router.getMatchedComponents()
      if (!matches.length) return reject({ code: 404 })
      const asyncDataHooks = matches.map(({ asyncData }) => asyncData).filter(_ => _)
      const promises = asyncDataHooks.map(hook => hook({ store, route: router.currentRoute }))
      Promise.all(promises)
        .then(() => {
          // 在所有预取钩子(preFetch hook) resolve 后，
          // 我们的 store 现在已经填充入渲染应用程序所需的状态。
          // 当我们将状态附加到上下文，
          // 并且 `template` 选项用于 renderer 时，
          // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
          context.state = store.state
          resolve(app)
        })
        .catch(reject)
    }, reject)
  })
}
