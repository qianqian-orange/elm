<template>
  <ul
    ref="ball"
    class="ball-list"
  >
    <transition
      v-for="item in count"
      :key="item"
      name="ball"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
    >
      <li
        v-show="queue.includes(item - 1)"
        class="ball-container"
      >
        <div class="ball" />
      </li>
    </transition>
  </ul>
</template>

<script>
export default {
  name: 'Ball',
  data() {
    return {
      count: 10,
      queue: [],
      index: -1,
    }
  },
  methods: {
    run(to, from) {
      const ball = this.$refs.ball
      const ballWidth = ball.offsetWidth
      const ballHeight = ball.offsetHeight
      const toRect = to.getBoundingClientRect()
      const fromRect = from.getBoundingClientRect()
      this.x = (fromRect.x + (fromRect.width - ballWidth) / 2).toFixed(2)
      this.y = (fromRect.y + (fromRect.height - ballHeight) / 2).toFixed(2)
      this.translateX = (toRect.x + (toRect.width - ballWidth) / 2 - this.x).toFixed(2)
      this.translateY = (toRect.y + (toRect.height - ballHeight) / 2 - this.y).toFixed(2)
      this.index = (this.index + 1) % this.count
      this.queue.push(this.index)
    },
    beforeEnter(el) {
      el.style.left = `${this.x}px`
      el.style.top = `${this.y}px`
    },
    enter(el) {
      // 获取属性offset会触发回流，才能看到过渡效果，具体原理不是很清楚
      el.offsetTop // eslint-disable-line
      el.style.transform = `translateY(${this.translateY}px)`
      el.children[0].style.transform = `translateX(${this.translateX}px)`
    },
    afterEnter(el) {
      el.style.left = '0px'
      el.style.top = '0px'
      el.style.transform = 'translateY(0px)'
      el.children[0].style.transform = 'translateX(0px)'
      this.queue.shift()
    },
  },
}
</script>

<style lang="scss" scoped>
  .ball-list {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: px2rem(32);
    height: px2rem(32);

    .ball-container {
      position: absolute;
    }

    .ball {
      width: px2rem(32);
      height: px2rem(32);
      background-color: $themeColor;
      transition: transform .4s linear;
      border-radius: 50%;
    }

    .ball-enter-active {
      transition: transform .4s cubic-bezier(.49, -.29, .75, .41);
    }
  }
</style>
