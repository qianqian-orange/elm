import eventType from '../eventType'

class Translate {
  constructor({ el, probeType, eventEmitter }) {
    this.el = el
    this.probeType = probeType
    this.eventEmitter = eventEmitter
    this.wrapperHeight = el.parentNode.offsetHeight
    this.contentHeight = el.offsetHeight
    this.preScrollHeight = 0
    this.curScrollHeight = 0
    this.startClientY = 0
  }

  start(e) {
    this.startClientY = e.touches[0].clientY
    this.eventEmitter.emit(eventType.beforeScrollStart, { y: this.preScrollHeight })
  }

  move(e) {
    this.curScrollHeight = this.ensure(this.preScrollHeight + e.touches[0].clientY - this.startClientY)
    this.el.style.transform = `translateY(${this.curScrollHeight}px)`
    if (this.probeType) this.eventEmitter.emit(eventType.scroll, { y: this.curScrollHeight })
  }

  end() {
    this.preScrollHeight = this.curScrollHeight
  }

  offset(value) {
    this.preScrollHeight = this.curScrollHeight = this.ensure(this.preScrollHeight + value)
    this.el.style.transform = `translateY(${this.preScrollHeight}px)`
  }

  to(scrollHeight) {
    this.preScrollHeight = this.curScrollHeight = scrollHeight
    this.el.style.transform = `translateY(${scrollHeight}px)`
  }

  isTop() {
    return this.preScrollHeight === 0
  }

  isBottom() {
    return this.preScrollHeight === this.wrapperHeight - this.contentHeight
  }

  ensure(scrollHeight) {
    if (this.wrapperHeight >= this.contentHeight || scrollHeight > 0) return 0
    if (scrollHeight < this.wrapperHeight - this.contentHeight) return this.wrapperHeight - this.contentHeight
    return scrollHeight
  }

  reset() {
    this.wrapperHeight = this.el.parentNode.offsetHeight
    this.contentHeight = this.el.offsetHeight
  }
}

export default Translate
