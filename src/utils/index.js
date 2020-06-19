// options: { leading, trailing}
// leading为true立即触发一次
// trailing为true触发最后一次
export function throttle(fn, delay, options = { leading: true, trailing: true }) {
  let previous = 0
  let timer = null

  function throttled() {
    const current = Date.now()
    if (!previous && !options.leading) previous = current
    const residue = delay - (current - previous)
    if (residue <= 0 || residue > delay) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      previous = current
      fn.apply(this, arguments)
    } else if (!timer && options.trailing) {
      timer = setTimeout(() => {
        timer = null
        previous = options.leading ? Date.now() : 0
        fn.apply(this, arguments)
      }, residue)
    }
  }

  throttle.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
    previous = 0
  }

  return throttled
}

export function debounce(fn, delay, immediate = true) {
  let timer = null

  function debounced() {
    if (timer) clearTimeout(timer)
    if (immediate) {
      const callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, delay)
      callNow && fn.apply(this.arguments)
    } else {
      timer = setTimeout(() => {
        timer = null
        fn.apply(this, arguments)
      }, delay)
    }
  }

  debounced.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
  }

  return debounced
}

export function delay(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, duration)
  })
}
