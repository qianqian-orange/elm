<template>
  <span
    :style="styleObj"
    class="iconfont icon-arrowon"
  />
</template>

<script>
import px2rem from '@/utils/px2rem'

export default {
  name: 'Arrow',
  props: {
    fontSize: {
      type: Number,
      default: 24,
    },
    color: {
      type: String,
      default: '#fff',
    },
  },
  computed: {
    styleObj() {
      return {
        fontSize: px2rem(this.fontSize),
        color: this.color,
      }
    },
  },
}
</script>
