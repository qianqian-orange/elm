<template>
  <div
    class="elm-finish"
  >{{ title }}</div>
</template>

<script>
export default {
  name: 'ElmFinish',
  props: {
    title: {
      type: String,
      default: '我是有底线的',
    },
  },
}
</script>

<style lang="scss" scoped>
  .elm-finish {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: px2rem(32) px2rem(30);
    color: #999;
    font-size: px2rem(28);
    font-weight: 200;
    line-height: px2rem(48);

    &::after,
    &::before {
      content: "";
      flex-basis: 36%;
      height: 1px;
      background-color: #ccc;
    }
  }
</style>
