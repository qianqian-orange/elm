<template>
  <svg
    viewBox="0 0 750 50"
    class="wave"
  >
    <path d="M750,1.70530257e-13 L750,50 L0,50 L0,1.70530257e-13 C107.666667,33.3333333 232.666667,50 375,50 C517.333333,50 642.333333,33.3333333 750,1.70530257e-13 Z" />
  </svg>
</template>

<script>
export default {
  name: 'Wave',
}
</script>

<style lang="scss" scoped>
  .wave {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: px2rem(50);

    path {
      stroke: none;
      stroke-width: 1;
      fill: #fff;
      fill-rule: evenodd;
    }
  }
</style>
