<template>
  <div
    v-show="visible"
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
        :init="false"
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
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      filterHeight: 0,
    }
  },
  watch: {
    visible(val) {
      if (!val) return
      // 由于手机端高度易变，会触发绑定的resize事件，修改parentHeight的值
      // 同时由于触发的时候元素并没有挂载在页面上，那么修改后的值就是不正确的
      // 所以当元素显示时就重新继续一下parentHeight的值
      this.$refs.list.computedParentHeight()
      this.$refs.list.search()
    },
  },
  mounted() {
    // 监听hidden值的变化只是为了获取filter的高度，当获取高度后
    // 便可以取消对hidden的监听了，提高性能
    const unwatch = this.$watch('visible', function () {
      this.$nextTick(() => {
        if (this.filterHeight === 0) {
          this.filterHeight = this.$refs.filter.$el.offsetHeight
          unwatch()
        }
      })
    })
  },
  methods: {
    search() {
      this.$refs.list.search()
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
