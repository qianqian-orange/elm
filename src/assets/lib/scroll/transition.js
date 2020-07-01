import eventType from '../eventType'
import { compose } from '@/utils'

const regex = /matrix\((.*)\)/

function move(scrollX, scrollY) {
  const fns = []
  if (scrollX) {
    fns.push((e) => {
      const instance = Math.abs(e.touches[0].clientX - this.startClientX)
      if (instance > this.instanceX) this.instanceX = instance
      else {
        this.timeStampX = Date.now()
        this.startClientX = e.touches[0].clientX
        this.instanceX = 0
      }
      return e
    })
  }
  if (scrollY) {
    fns.push((e) => {
      const instance = Math.abs(e.touches[0].clientY - this.startClientY)
      if (instance > this.instanceY) this.instanceY = instance
      else {
        this.timeStampY = Date.now()
        this.startClientY = e.touches[0].clientY
        this.instanceY = 0
      }
      return e
    })
  }
  return compose(...fns)
}

function end(scrollX, scrollY) {
  const fns = [() => {
    if (!this.pending) {
      this.eventEmitter.emit(eventType.scrollEnd, this.coordinate())
      return
    }
    this.el.style.transitionDuration = `${this.duration}ms`
    if (this.probeType) {
      this.id = window.requestAnimationFrame(() => {
        this.step()
      })
    }
  }]
  if (scrollY) {
    fns.push((e) => {
      if (!this.translate.canScrollY()) {
        this.instanceY = 0
        return e
      }
      let speed = +(Math.floor(this.instanceY) / (Date.now() - this.timeStampY)).toFixed(2)
      this.instanceY = 0
      if (speed < this.lowestSpeed) return e
      speed = e.changedTouches[0].clientY < this.startClientY ? -speed : speed
      this.translate.offsetY(parseInt(speed * this.seconds), 10)
      this.pending = true
      return e
    })
  }
  if (scrollX) {
    fns.push((e) => {
      if (!this.translate.canScrollX()) {
        this.instanceX = 0
        return e
      }
      let speed = +(Math.floor(this.instanceX) / (Date.now() - this.timeStampX)).toFixed(2)
      this.instanceX = 0
      if (speed < this.lowestSpeed) return e
      speed = e.changedTouches[0].clientX < this.startClientX ? -speed : speed
      this.translate.offsetX(parseInt(speed * this.seconds), 10)
      this.pending = true
      return e
    })
  }
  return compose(...fns)
}

class Transition {
  constructor({
    el,
    probeType,
    eventEmitter,
    translate,
    scrollX,
    scrollY,
  }) {
    this.el = el
    this.probeType = probeType
    this.eventEmitter = eventEmitter
    this.translate = translate
    this.startClientY = 0
    this.timeStampY = 0
    this.instanceY = 0
    this.startClientX = 0
    this.timeStampX = 0
    this.instanceX = 0
    this.lowestSpeed = 3
    this.seconds = 600
    this.duration = 1000
    this.pending = false
    this.id = null
    this.move = move.call(this, scrollX, scrollY)
    this.end = end.call(this, scrollX, scrollY)
  }

  coordinate() {
    regex.test(window.getComputedStyle(this.el, null).transform)
    const [, , , , x, y] = RegExp.$1.split(', ')
    return { x: +x, y: +y }
  }

  stop() {
    this.translate.to(this.coordinate())
    const event = new Event(eventType.transitionend)
    this.el.dispatchEvent(event)
  }

  start(e) {
    if (this.pending) this.stop()
    this.startClientX = e.touches[0].clientX
    this.startClientY = e.touches[0].clientY
    this.timeStampX = this.timeStampY = Date.now()
  }

  to({ x, y }, duration) {
    if (duration > 0) this.pending = true
    this.el.style.transitionDuration = `${duration}ms`
    this.translate.to({ x, y })
  }

  step() {
    this.eventEmitter.emit(eventType.scroll, this.coordinate())
    this.id = window.requestAnimationFrame(() => {
      this.step()
    })
  }

  transitionEnd(e) {
    e.stopPropagation()
    this.pending = false
    this.el.style.transitionDuration = '0ms'
    window.cancelAnimationFrame(this.id)
    this.eventEmitter.emit(eventType.scrollEnd, this.coordinate())
  }

  addEventListener() {
    this.bindTransitionEnd = this.transitionEnd.bind(this)
    this.el.addEventListener(eventType.transitionend, this.bindTransitionEnd, false)
  }

  removeEventListener() {
    this.el.removeEventListener(eventType.transitionend, this.bindTransitionEnd, false)
  }

  run() {
    return this.pending
  }
}

export default Transition
