<template>
  <ul
    ref="letter-nav"
    class="letter-nav"
  >
    <li
      v-for="letter in letters"
      :key="letter"
      ref="letter-nav-item"
      class="letter-nav-item"
    >{{ letter }}</li>
  </ul>
</template>

<script>
export default {
  name: 'LetterNav',
  props: {
    letters: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      index: 0,
      clientY: 0,
      height: 0,
    }
  },
  mounted() {
    const letterNav = this.$refs['letter-nav']
    this.height = letterNav.offsetHeight / this.letters.length
    // 这里不使用getBoundingRect()是因为使用了slide的过渡效果，这个过渡效果就是
    // 出场的页面设置绝对定位，这样就不会占位置，进场页面也就能往上移
    // 注意这里的往上移，也就是说过渡效果还没开始的时候，那么进场页面是在视窗的下面
    // 是因为出场页面设置定位后，才上移的，所以mounted钩子触发的时候页面还没往上移，
    // 所以获取的y值不是想要的
    this.clientY = letterNav.offsetTop - letterNav.offsetHeight / 2
    letterNav.addEventListener('touchstart', this.start, false)
    letterNav.addEventListener('touchmove', this.move, false)
  },
  beforeDestroy() {
    const letterNav = this.$refs['letter-nav']
    letterNav.removeEventListener('touchstart', this.start, false)
    letterNav.removeEventListener('touchmove', this.move, false)
  },
  methods: {
    start(e) {
      e.preventDefault()
      e.stopPropagation()
      const index = Math.floor((e.touches[0].clientY - this.clientY) / this.height)
      this.transform(index)
    },
    move(e) {
      e.preventDefault()
      e.stopPropagation()
      let index = Math.floor((e.touches[0].clientY - this.clientY) / this.height)
      if (index < 0) index = 0
      else if (index > this.letters.length - 1) index = this.letters.length - 1
      this.transform(index)
    },
    transform(index) {
      this.index = index
      this.$emit('transform', this.index)
    },
  },
}
</script>

<style lang="scss" scoped>
  .letter-nav {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: px2rem(75);

    .letter-nav-item {
      width: 100%;
      height: px2rem(32);
      color: #999;
      font-size: px2rem(24);
      line-height: px2rem(32);
      text-align: center;

    }
  }
</style>
