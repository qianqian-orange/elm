import run from './scheduler'
import observe from './observe'

const methodsToPatch = [
  'pop',
  'push',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse',
]

function protoAugment(obj, arrayProto) {
  if (protoAugment.proto) {
    Object.setPrototypeOf(obj, protoAugment.proto)
    return
  }
  const proto = Object.create(arrayProto)
  methodsToPatch.forEach((method) => {
    Object.defineProperty(proto, method, {
      value: function (...args) {
        run(this.__cache__)
        const origin = arrayProto[method]
        // 这里注意需要绑定this
        // 先执行原型上的方法，在对inserted进行observe
        const result = origin.apply(this, args)
        let inserted
        switch (method) {
          case 'push':
          case 'unshift':
            inserted = args
            break
          case 'splice':
            inserted = args.slice(2)
            break
        }
        if (inserted) observe(inserted)
        return result
      },
      enumerable: true,
      configurable: true,
      writable: false,
    })
  })
  Object.setPrototypeOf(obj, proto)
  protoAugment.proto = proto
}

export default protoAugment
