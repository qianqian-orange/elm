import eventType from '../eventType'

const regex = /matrix\((.*)\)/

class Transition {
  constructor({ el, probeType, eventEmitter, translate }) {
    this.el = el
    this.probeType = probeType
    this.eventEmitter = eventEmitter
    this.translate = translate
    this.startClientY = 0
    this.timeStamp = 0
    this.instance = 0
    this.lowestSpeed = 3
    this.seconds = 600
    this.duration = 1000
    this.pending = false
    this.id = null
  }

  scrollHeight() {
    regex.test(window.getComputedStyle(this.el, null).transform)
    return +RegExp.$1.split(', ')[5]
  }

  stop() {
    this.translate.to(this.scrollHeight())
    const event = new Event(eventType.transitionend)
    this.el.dispatchEvent(event)
  }

  start(e) {
    if (this.pending) this.stop()
    this.startClientY = e.touches[0].clientY
    this.timeStamp = Date.now()
  }

  move(e) {
    const instance = Math.abs(e.touches[0].clientY - this.startClientY)
    if (instance > this.instance) this.instance = instance
    else {
      this.timeStamp = Date.now()
      this.startClientY = e.touches[0].clientY
      this.instance = 0
    }
  }

  end(e) {
    if (this.translate.isTop() || this.translate.isBottom()) {
      this.instance = 0
      this.eventEmitter.emit(eventType.scrollEnd, { y: this.scrollHeight() })
      return
    }
    let speed = +(Math.floor(this.instance) / (Date.now() - this.timeStamp)).toFixed(2)
    this.instance = 0
    if (speed < this.lowestSpeed) {
      this.eventEmitter.emit(eventType.scrollEnd, { y: this.scrollHeight() })
      return
    }
    speed = e.changedTouches[0].clientY < this.startClientY ? -speed : speed
    this.pending = true
    this.el.style.transitionDuration = `${this.duration}ms`
    this.translate.offset(parseInt(speed * this.seconds, 10))
    if (this.probeType) {
      this.id = window.requestAnimationFrame(() => {
        this.step()
      })
    }
  }

  to(scrollHeight, duration) {
    if (this.duration > 0) this.pending = true
    this.el.style.transitionDuration = `${duration}ms`
    this.translate.to(scrollHeight)
  }

  step() {
    this.eventEmitter.emit(eventType.scroll, { y: this.scrollHeight() })
    this.id = window.requestAnimationFrame(() => {
      this.step()
    })
  }

  transitionEnd() {
    this.pending = false
    this.el.style.transitionDuration = '0ms'
    window.cancelAnimationFrame(this.id)
    this.eventEmitter.emit(eventType.scrollEnd, { y: this.scrollHeight() })
  }

  addEventListener() {
    this.bindTransitionEnd = this.transitionEnd.bind(this)
    this.el.addEventListener(eventType.transitionend, this.bindTransitionEnd, false)
  }

  removeEventListener() {
    this.el.removeEventListener(eventType.transitionend, this.bindTransitionEnd, false)
  }
}

export default Transition
