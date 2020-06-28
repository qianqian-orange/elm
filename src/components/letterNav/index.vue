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
    this.clientY = letterNav.getBoundingClientRect().y
    this.bindStart = this.start.bind(this)
    this.bindMove = this.move.bind(this)
    letterNav.addEventListener('touchstart', this.bindStart, false)
    letterNav.addEventListener('touchmove', this.bindMove, false)
  },
  beforeDestroy() {
    const letterNav = this.$refs['letter-nav']
    letterNav.removeEventListener('touchstart', this.bindStart, false)
    letterNav.removeEventListener('touchmove', this.bindMove, false)
  },
  methods: {
    start(e) {
      const index = Math.floor((e.touches[0].clientY - this.clientY) / this.height)
      this.transform(index)
    },
    move(e) {
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
