<template>
  <div
    class="elm-mask"
    @click.self="handleClick"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ElmMask',
  methods: {
    handleClick() {
      this.$emit('click')
    },
  },
}
</script>
