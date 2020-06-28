<template>
  <header class="elm-header">
    <slot name="left">
      <router-link :to="to">
        <div
          class="arrow-container"
          @click="jump"
        >
          <elm-icon
            name="arrow"
            :font-size="44"
            :rotate="-90"
          />
        </div>
      </router-link>
    </slot>
    <slot />
    <slot name="right" />
  </header>
</template>

<script>
export default {
  name: 'ElmHeader',
  props: {
    to: {
      type: String,
      default: '/',
    },
  },
  methods: {
    jump() {
      this.$emit('jump')
    },
  },
}
</script>

<style lang="scss" scoped>
  .elm-header {
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    width: 100%;
    height: px2rem($headerHeight);
    background-image: linear-gradient(90deg, #1db5ff, #008cff);
  }

  .arrow-container {
    width: px2rem(72);
    height: px2rem(72);
    line-height: px2rem(72);
    text-align: center;
  }
</style>
