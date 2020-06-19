<template>
  <scroll-view
    ref="scroll"
    :probe-type="probeType"
  >
    <slot />
    <empty v-if="!dataSource.length && !loading" />
    <div
      v-show="loading"
      class="loading-container"
    >
      <elm-loading />
    </div>
    <!-- TODO: finish -->
  </scroll-view>
</template>

<script>
import ScrollView from '@/components/scrollView/index.vue'
import Empty from '@/components/empty/index.vue'

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
  },
  data() {
    return {
      parentHeight: null,
      contentHeight: null,
    }
  },
  watch: {
    dataSource() {
      this.$nextTick(() => {
        this.$refs.scroll.reset()
        const el = this.$refs.scroll.$el
        this.parentHeight = el.parentNode.offsetHeight
        this.contentHeight = el.offsetHeight
      })
    },
    loading() {
      this.$nextTick(() => {
        this.$refs.scroll.reset()
      })
    },
  },
  mounted() {
    this.$refs.scroll.on('scroll', ({ y }) => {
      if ((this.parentHeight + this.interval >= this.contentHeight + y) && !this.loading) {
        this.$emit('loadmore')
      }
    })
  },
  methods: {
    scrollTo(offsetHeight) {
      this.$refs.scroll.scrollTo(offsetHeight)
    },
  },
}
</script>

<style lang="scss" scoped>
  .loading-container {
    text-align: center;
    padding: px2rem(30);
  }
</style>
