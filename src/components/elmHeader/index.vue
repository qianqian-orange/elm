<template>
  <header class="elm-header">
    <slot name="left">
      <router-link :to="to">
        <div
          class="arrow-container"
          @click="jump"
        >
          <arrow :font-size="44" />
        </div>
      </router-link>
    </slot>
    <slot />
    <slot name="right" />
  </header>
</template>

<script>
import Arrow from '@/components/arrow/index.vue'

export default {
  name: 'ElmHeader',
  components: {
    Arrow,
  },
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
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: px2rem($headerHeight);
    // background-color: $themeColor;
    background-image: linear-gradient(90deg,#1db5ff,#008cff)
  }
  .arrow-container {
    transform: rotate(-90deg);
    width: px2rem(72);
    height: px2rem(72);
    text-align: center;
    line-height: px2rem(72);
  }
</style>
