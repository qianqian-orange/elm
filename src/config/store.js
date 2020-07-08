// 每个module对应的key
// 如果手动dispatch或commit, 那么需要加上对应的key,
// 如果$store.dispatch('home/xxx')
export default {
  home: 'home',
  global: 'global',
  shop: 'shop',
}
