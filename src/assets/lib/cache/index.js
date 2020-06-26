import observe from './observe'
import run from './scheduler'

// const maxAge = 1000 * 60 // 默认一分钟
const defaultConfig = {
  maxAge: 1000 * 60,
}

// 由于Vue实例中的data数据已经做了响应式处理，所以这里就不能做响应式处理了,
class Cache {
  constructor({ maxAge } = {}) {
    this.maxAge = maxAge || defaultConfig.maxAge
    this.cache = {}
  }

  get(key) {
    if (!this.cache[key]) return null
    run(() => {
      this.retiming(key)
    })
    return this.cache[key].value
  }

  set(key, value, option = {}) {
    if (this.cache[key]) {
      const { id } = this.cache[key]
      clearTimeout(id)
      delete this.cache[key]
    }
    if (typeof value === 'object' && value !== null) {
      const maxAge = option.maxAge || this.maxAge
      this.cache[key] = {
        maxAge,
        id: this.timing(key, maxAge),
        value: option.deep ? observe(value, () => {
          this.retiming(key)
        }) : value,
      }
    }
  }

  timing(key, maxAge) {
    return setTimeout(() => {
      delete this.cache[key]
    }, maxAge)
  }

  retiming(key) {
    if (!this.cache[key]) return
    const { id, maxAge } = this.cache[key]
    clearTimeout(id)
    this.cache[key].id = this.timing(key, maxAge)
  }
}

export { defaultConfig }

export default Cache
