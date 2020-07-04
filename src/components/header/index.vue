<template>
  <header class="elm-header">
    <slot name="left">
      <!-- <router-link :to="to"> -->
      <!--
        elm-icon默认是会对click事件调用e.stopPropagation方法,
        那么router-link会无法正常工作，原因是router-link
        有监听click事件，做了一些逻辑处理
      -->
      <elm-icon
        name="arrow"
        :font-size="44"
        :rotate="-90"
        @click="jump"
      />
      <!-- </router-link> -->
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
      default: '',
    },
  },
  methods: {
    jump() {
      this.$emit('jump')
      if (this.to) this.$router.push(this.to)
      else this.$router.go(-1)
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

  .elm-icon {
    width: px2rem(72);
    height: px2rem(72);
    line-height: px2rem(72);
    text-align: center;
  }
</style>
