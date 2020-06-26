<template>
  <scroll-view
    ref="scroll"
    :probe-type="probeType"
  >
    <div
      :style="{
        minHeight: `${parentHeight}px`,
        paddingBottom: dataSource.length && finish ? `${px2rem(112)}` : 0,
      }"
      class="list-container"
    >
      <slot />
      <elm-loading v-show="loading" />
      <empty v-if="!dataSource.length && !loading" />
      <div
        v-show="dataSource.length && finish"
        class="finish"
      >我是有底线的</div>
    </div>
  </scroll-view>
</template>

<script>
import ScrollView from '@/components/scrollView/index.vue'
import Empty from '@/components/empty/index.vue'
import px2rem from '@/utils/px2rem'
import { debounce } from '@/utils' /* eslint-disable-line */

export default {
  name: 'ListScrollView',
  components: {
    ScrollView,
    Empty,
  },
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
    probeType: {
      type: Number,
      default: 0,
    },
    interval: {
      type: Number,
      default: 300,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    finish: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      parentHeight: null,
      contentHeight: null,
      px2rem,
    }
  },
  watch: {
    dataSource() {
      this.reset()
      this.$nextTick(() => {
        const el = this.$refs.scroll.$el
        this.contentHeight = el.offsetHeight
      })
    },
    loading() {
      this.reset()
    },
  },
  mounted() {
    // 这里获取parentHeight值以便设置list-container的最小高度
    // 这里需要留意，如果元素的display为none，那么是取不到高度的
    this.$nextTick(() => {
      const el = this.$refs.scroll.$el
      this.parentHeight = el.parentNode.offsetHeight
    })
    this.$refs.scroll.on('scroll', ({ y }) => {
      if (this.parentHeight >= this.contentHeight) return
      if ((this.parentHeight + this.interval >= this.contentHeight + y) && !this.loading && !this.finish) {
        this.$emit('loadmore')
      }
    })
    // 这部分逻辑解决手机端高度易改的情况
    this.resize = debounce(() => {
      const el = this.$refs.scroll.$el
      this.parentHeight = el.parentNode.offsetHeight
    }, 300, false)
    window.addEventListener('resize', this.resize, false)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize, false)
  },
  methods: {
    scrollTo(offsetHeight) {
      this.$refs.scroll.scrollTo(offsetHeight)
    },
    reset() {
      this.$refs.scroll.reset()
    },
  },
}
</script>

<style lang="scss" scoped>
  .list-container {
    position: relative;
    box-sizing: border-box;
  }
  .finish {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: px2rem(32) px2rem(30);
    font-size: px2rem(28);
    font-weight: 200;
    color: #999;
    line-height: px2rem(48);

    &::after, &::before {
      content: "";
      flex-basis: 36%;
      height: 1px;
      background-color: #ccc;
    }
  }
</style>
