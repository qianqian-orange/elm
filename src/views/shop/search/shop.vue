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
      // 由于使用了v-show，当visble为false时节点的diplay为none, 导致list-scroll-view获取不到
      // 正确的parentHeight, 会影响list-scroll-view的布局和loadmore逻辑
      this.$refs.list.computedParentHeight()
      this.$refs.list.search()
    },
  },
  created() {
    // 这里需要注意，如果v-show="false"是放在当前模版的div上，那么就需要调用$nextTick
    // 但是如果v-show放在组件标签上, 如<shop v-show="visible" />
    // 那么就不需要调用$nextTick
    // 我们知道v-show本质是修改元素的display值，通常情况下user watch是优先于render watch的
    // 如果v-show放在模版的div上，那么当user watch执行的时候节点的dipslay值为none, 那么就无法获取到值
    // 如果放在组件标签上，那么user watch执行的时候display的值已经是block了，那么就可以正常获取值
    const unwatch = this.$watch('visible', function () {
      this.$nextTick(() => {
        this.filterHeight = this.$refs.filter.$el.offsetHeight
      })
      unwatch()
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
