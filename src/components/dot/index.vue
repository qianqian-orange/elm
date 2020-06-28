<template>
  <ul class="dot-list">
    <li
      v-for="index in dataSource.length"
      :key="index"
      class="dot-item"
      :class="index - 1 === current ? 'active' : ''"
    />
  </ul>
</template>

<script>
export default {
  name: 'Dot',
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
    current: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style lang="scss" scoped>
  .dot-list {
    position: absolute;
    bottom: px2rem(16);
    left: 50%;
    transform: translateX(-50%);
    display: flex;

    .dot-item {
      width: px2rem(24);
      height: px2rem(4);
      margin-right: px2rem(4);
      background-color: #ccc;

      &.active {
        background-color: #fff;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
