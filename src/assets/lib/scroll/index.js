import Translate from './translate'
import Transition from './transition'
import EventEmitter from '../eventEmitter'
import eventType from '../eventType'
import { add, remove, destroy } from './scheduler'

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
  constructor({
    el,
    probeType = 0,
    click = true,
    stopPropagation = false,
  } = {}) {
    this.el = typeof el === 'string' ? document.querySelector(el) : el
    if (!this.el) {
      console.error('the element is not exist')
      return
    }
    add(this)
    this.probeType = probeType
    this.click = click
    this.stopPropagation = stopPropagation
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
    this.clientY = 0
    this.origins = [this.translate, this.transition]
    this.init()
  }

  start(e) {
    e.preventDefault()
    if (this.stopPropagation) e.stopPropagation()
    this.clientY = e.touches[0].clientY
    this.origins.forEach((origin) => {
      trigger.call(origin, eventType.touchstart, e)
    })
  }

  move(e) {
    e.preventDefault()
    if (this.stopPropagation) e.stopPropagation()
    this.origins.forEach((origin) => {
      trigger.call(origin, eventType.touchmove, e)
    })
  }

  end(e) {
    e.preventDefault()
    if (this.stopPropagation) e.stopPropagation()
    this.origins.forEach((origin) => {
      trigger.call(origin, eventType.touchend, e)
    })
    if (this.click && Math.abs(e.changedTouches[0].clientY - this.clientY) <= 8) {
      const event = new Event('click')
      let stop = false
      event.stopPropagation = function () {
        stop = true
      }
      let el = e.target
      while (el !== this.el) {
        el.dispatchEvent(event)
        if (stop) break
        el = el.parentNode
      }
    }
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
    remove(this)
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
    this.transition.to(scrollHeight, duration)
  }

  reset() {
    this.translate.reset()
  }

  on(type, fn) {
    this.eventEmitter.on(type, fn)
  }
}

export { destroy }

export default Scroll
