import Translate from './translate'
import Transition from './transition'
import EventEmitter from '../eventEmitter'
import eventType from './eventType'

function trigger(type, e) {
  switch (type) {
    case eventType.touchstart:
      this.start(e)
      break
    case eventType.touchmove:
      this.move(e)
      break
    case eventType.touchend:
      this.end(e)
      break
    default:
      throw new TypeError('illegal type value')
  }
}

class Scroll {
  constructor({ el, probeType }) {
    this.el = typeof el === 'string' ? document.querySelector(el) : el
    if (!this.el) {
      console.error('the element is not exist')
      return
    }
    this.probeType = probeType
    this.eventEmitter = new EventEmitter()
    this.translate = new Translate({
      el: this.el,
      probeType: probeType,
      eventEmitter: this.eventEmitter,
    })
    this.transition = new Transition({
      el: this.el,
      probeType: probeType,
      eventEmitter: this.eventEmitter,
      translate: this.translate,
    })
    this.origins = [this.translate, this.transition]
    this.init()
  }

  start(e) {
    this.origins.forEach((origin) => {
      trigger.call(origin, eventType.touchstart, e)
    })
  }

  move(e) {
    this.origins.forEach((origin) => {
      trigger.call(origin, eventType.touchmove, e)
    })
  }

  end(e) {
    this.origins.forEach((origin) => {
      trigger.call(origin, eventType.touchend, e)
    })
  }

  init() {
    this.el.style.transitionProperty = 'transform'
    this.el.style.transitionTimingFunction = 'cubic-bezier(0.165, 0.84, 0.44, 1)'
    this.el.style.transitionDuration = '0ms'
    this.el.style.willChange = 'transform'
    this.bindStart = this.start.bind(this)
    this.bindMove = this.move.bind(this)
    this.bindEnd = this.end.bind(this)
    this.transition.addEventListener()
    this.el.addEventListener(eventType.touchstart, this.bindStart, false)
    this.el.addEventListener(eventType.touchmove, this.bindMove, false)
    this.el.addEventListener(eventType.touchend, this.bindEnd, false)
  }

  destroy() {
    this.transition.removeEventListener()
    this.el.removeEventListener(eventType.touchstart, this.bindStart, false)
    this.el.removeEventListener(eventType.touchmove, this.bindMove, false)
    this.el.removeEventListener(eventType.touchend, this.bindEnd, false)
  }

  scrollToElement(el, duration = 0) {
    let node = el
    let scrollHeight = 0
    do {
      scrollHeight += node.offsetTop
      node = node.offsetParent
    } while (node !== this.el && node !== null)
    this.transition.to(-scrollHeight, duration)
  }

  scrollTo(scrollHeight, duration = 0) {
    this.transition.to(-scrollHeight, duration)
  }

  reset() {
    // TODO: 处理内容减少的情况
    this.translate.reset()
  }

  on(type, fn) {
    this.eventEmitter.on(type, fn)
  }
}

export default Scroll
