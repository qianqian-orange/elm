<template>
  <p class="empty">{{ title }}</p>
</template>

<script>
export default {
  name: 'Empty',
  props: {
    title: {
      type: String,
      default: '暂无相关数据',
    },
  },
}
</script>

<style lang="scss" scoped>
  .empty {
    padding-top: px2rem(30);
    text-align: center;
    font-size: px2rem(28);
    color: #222;
  }
</style>
