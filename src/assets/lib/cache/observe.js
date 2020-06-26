import run from './scheduler'
import protoAugment from './array'

function observeArray(arr, handler) {
  for (let i = 0; i < arr.length; i += 1) {
    observe(arr[i], handler)
  }
}

// 对数组的处理就是在加一个原型对象
// 对对象的处理就是对get, set进行一次包装
function observe(obj, handler) {
  if (typeof obj === 'object' && obj !== null) {
    // 把handler保存起来
    obj.__cache__ = handler
    if (Array.isArray(obj)) {
      protoAugment(obj, Object.getPrototypeOf(obj))
      observeArray(obj, handler)
    } else {
      Object.keys(obj).forEach((key) => {
        defineReactive(obj, key, obj[key], handler)
      })
    }
  }
  return obj
}

function defineReactive(obj, key, value, handler) {
  observe(value, handler)
  const descriptor = Object.getOwnPropertyDescriptor(obj, key)
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get() {
      run(handler)
      return descriptor.get ? descriptor.get() : value
    },
    set(newVal) {
      run(handler)
      // 需要先执行属性的set方法，它会对newVal做响应式处理
      // 之后我们在对newVal调用observe, 对get, set做一层包装
      if (descriptor.set) descriptor.set(newVal)
      if (value === newVal) return
      value = observe(newVal, handler)
    },
  })
}

export default observe
