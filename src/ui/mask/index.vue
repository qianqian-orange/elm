<template>
  <div
    :style="{
      backgroundColor,
    }"
    class="elm-mask"
    @click.self="handleClick"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ElmMask',
  props: {
    backgroundColor: {
      type: String,
      default: 'rgba(0,0,0,.3)',
    },
  },
  methods: {
    handleClick() {
      this.$emit('click')
    },
  },
}
</script>
