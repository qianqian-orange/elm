<template>
  <ul class="group-city-list">
    <li
      v-for="{ id, name } in dataSource"
      :key="id"
      class="group-city-item"
      @click.stop="locate(name)"
    >{{ name }}</li>
  </ul>
</template>

<script>
export default {
  name: 'CityList',
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    locate(city) {
      this.$emit('locate', city)
    },
  },
}
</script>

<style lang="scss" scoped>
  .group-city-list {
    padding-left: px2rem(30);

    .group-city-item {
      width: 100%;
      height: px2rem(84);
      color: $primaryTextColor;
      font-size: px2rem(28);
      line-height: px2rem(84);
    }

    .group-city-item:not(:last-child) {
      @include border-bottom-1px();
    }
  }
</style>
