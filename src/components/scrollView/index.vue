<template>
  <div ref="scroll-container">
    <slot />
  </div>
</template>

<script>
import Scroll from '@/assets/lib/scroll'

export default {
  name: 'ScrollView',
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      scroll: null,
    }
  },
  mounted() {
    this.scroll = new Scroll({
      el: this.$refs['scroll-container'],
      probeType: this.probeType,
    })
  },
  beforeDestroy() {
    this.scroll.destroy()
  },
  methods: {
    reset() {
      this.scroll.reset()
    },
    scrollTo(offsetHeight, duration) {
      this.scroll.scrollTo(offsetHeight, duration)
    },
    scrollToElement(el, duration) {
      this.scroll.scrollToElement(el, duration)
    },
    on(type, fn) {
      this.scroll.on(type, fn)
    },
  },
}
</script>
