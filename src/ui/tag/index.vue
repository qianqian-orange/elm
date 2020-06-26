<template>
  <span
    :style="styleObj"
    class="elm-tag"
  >
    <slot />
  </span>
</template>

<script>
import px2rem from '@/utils/px2rem'
import variable from '@/scss/var.scss'

export default {
  name: 'ElmTag',
  props: {
    color: {
      type: String,
      default: variable.themeColor,
    },
    fontSize: {
      type: Number,
      default: 24,
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
