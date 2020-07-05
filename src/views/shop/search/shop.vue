<template>
  <div
    class="shop-container"
    :style="{
      paddingTop: `${filterHeight}px`,
    }"
  >
    <sort-filter
      ref="filter"
      :hidden="true"
      :style="{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }"
      @search="search"
    />
    <div class="scroll-wrapper">
      <shop-list
        ref="list"
        :extra="true"
      />
    </div>
  </div>
</template>

<script>
import SortFilter from '@/components/sortFilter/index.vue'
import ShopList from '@/components/shopList/index.vue'

export default {
  name: 'Shop',
  components: {
    SortFilter,
    ShopList,
  },
  data() {
    return {
      filterHeight: 0,
    }
  },
  mounted() {
    this.filterHeight = this.$refs.filter.$el.offsetHeight
    this.$nextTick(() => {
      this.$refs.list.getScroll().reset()
    })
  },
  methods: {
    search() {
      this.$refs.list.search()
    },
    getScroll() {
      return this.$refs.list.getScroll()
    },
  },
}
</script>

<style lang="scss" scoped>
  .shop-container {
    position: absolute;
    top: px2rem($headerHeight);
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    background-color: #fff;
  }

  .scroll-wrapper {
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
    height: 100%;
    padding: 0 px2rem(30);
  }
</style>
