<template>
  <div
    class="elm-fold"
    :style="styleObj"
  >
    <slot />
    <span
      v-if="!hidden"
      class="elm-fold-icon"
      @click="toggle"
    >
      <elm-icon
        name="arrow"
        color="#999"
        :rotate="collapse ? 180 : 0"
      />
    </span>
  </div>
</template>

<script>
import px2rem from '@/utils/px2rem'

export default {
  name: 'Fold',
  props: {
    height: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      currentHeight: 0,
      parentHeight: 0,
      childrenHeight: 0,
      collapse: true,
      hidden: false,
    }
  },
  computed: {
    styleObj() {
      return {
        height: this.currentHeight ? `${this.currentHeight}px` : px2rem(this.height),
      }
    },
  },
  mounted() {
    this.parentHeight = this.$el.offsetHeight
    this.childrenHeight = this.$el.children[0].offsetHeight
    if (this.childrenHeight <= this.parentHeight) this.hidden = true
  },
  methods: {
    toggle() {
      this.collapse = !this.collapse
      this.currentHeight = this.collapse ? this.parentHeight : this.childrenHeight
    },
  },
}
</script>
