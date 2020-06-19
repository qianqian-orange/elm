<template>
  <div class="slider-wrapper">
    <slot />
    <ul class="dot-list">
      <li
        v-for="(itme, index) in dataSource"
        :key="index"
        class="dot-item"
        :class="current === index ? 'active' : ''"
      />
    </ul>
  </div>
</template>

<script>
import Slider from '@/assets/lib/slider'

export default {
  name: 'Slider',
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
    duration: {
      type: Number,
      default: 3000,
    },
  },
  data() {
    return {
      id: null,
      current: 0,
    }
  },
  watch: {
    dataSource() {
      this.$nextTick(() => {
        this.slider.refresh()
      })
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.slider = new Slider({ el: this.$el })
      this.slider.on('beforeScrollStart', () => {
        clearTimeout(this.id)
      })
      this.slider.on('scrollEnd', () => {
        this.current = this.slider.getCurrentPage()
        this.autoGoNext()
      })
      this.autoGoNext()
    })
  },
  beforeDestroy() {
    clearInterval(this.id)
    if (this.slider) this.slider.destroy()
  },
  methods: {
    autoGoNext() {
      clearTimeout(this.id)
      this.id = setTimeout(() => {
        this.slider.next()
      }, this.duration)
    },
  },
}
</script>

<style lang="scss" scoped>
  .slider-wrapper {
    position: relative;
    overflow: hidden;
  }
  .dot-list {
    position: absolute;
    left: 50%;
    bottom: px2rem(16);
    display: flex;
    transform: translateX(-50%);

    .dot-item {
      width: px2rem(24);
      height: px2rem(2);
      margin-right: px2rem(4);
      background-color: #ccc;

      &.active {
        background-color: #fff;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
