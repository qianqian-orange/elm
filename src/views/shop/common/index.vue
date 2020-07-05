<template>
  <div class="shop-detail-container">
    <food-loading v-if="loading" />
    <scroll-header
      ref="header"
      :opacity="opacity"
    >
      <p class="shop-name">{{ restaurant ? restaurant.name : '' }}</p>
    </scroll-header>
    <div
      v-if="restaurant"
      class="scroll-wrapper"
    >
      <scroll-view
        ref="scroll"
        :probe-type="1"
      >
        <div
          class="shop-detail"
        >
          <!-- 背景 -->
          <div
            class="bg-image-container"
            :style="{
              backgroundImage: `url(${restaurant.bgImagePath})`,
            }"
          >
            <div class="wave-container">
              <wave />
            </div>
          </div>
          <!-- 卡片 -->
          <card @expand="open" />
          <!-- 导航栏 -->
          <nav-list ref="nav-list" />
          <!-- cotent -->
          <main
            ref="content"
            class="content"
          >
            <slot />
          </main>
        </div>
      </scroll-view>
    </div>
    <nav-list
      v-show="navList"
      :style="{
        position: 'fixed',
        top: `${navTop}px`,
        left: 0,
        zIndex: 999,
      }"
    />
    <shop-drawer
      v-if="shopDrawer"
      ref="shopDrawer"
      @close="close"
    />
    <slot name="extra" />
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
import { SAVE_RESTAURANT_DATA } from '@/store/modules/shop/mutation-types'
import FoodLoading from '@/components/foodLoading/index.vue'
import ScrollView from '@/components/scrollView/index.vue'
import Wave from '@/components/wave/index.vue'
import ScrollHeader from './header.vue'
import Card from './card.vue'
import NavList from './navList.vue'
import ShopDrawer from './shopDrawer.vue'

export default {
  name: 'Common',
  components: {
    FoodLoading,
    ScrollHeader,
    ScrollView,
    Wave,
    Card,
    NavList,
    ShopDrawer,
  },
  data() {
    return {
      loading: false,
      shopDrawer: false,
      navList: false,
      opacity: 0,
      navTop: 0,
      headerHeight: 0,
      navOffsetTop: 0,
      interval: 254,
      worker: null,
    }
  },
  computed: {
    ...mapState('shop', {
      restaurant: state => state.restaurant,
    }),
  },
  watch: {
    restaurant() {
      this.$nextTick(() => {
        this.init()
      })
    },
  },
  beforeDestroy() {
    if (this.worker) this.worker.terminate()
  },
  mounted() {
    if (!this.restaurant || this.restaurant.id !== this.$route.params.id) {
      this.getData()
      return
    }
    this.init()
  },
  methods: {
    getData() {
      this.loading = true
      axios.get('/api/shop/detail', {
        params: {
          id: this.$route.params.id,
        },
      }).then(({ data }) => {
        if (data.code !== 0) {
          this.$notify({ type: 'danger', message: '请求数据失败' })
          return
        }
        // worker.js在public/js目录下
        // PUBLICPATH是使用webpack.definePlugin定义的变量
        // eslint-disable-next-line
        this.worker = new Worker(`${PUBLICPATH}js/worker.js`)
        this.worker.onmessage = (e) => {
          this[SAVE_RESTAURANT_DATA](e.data)
          this.loading = false
        }
        this.worker.postMessage(data.data)
      })
    },
    init() {
      this.headerHeight = this.navTop = this.$refs.header.$el.offsetHeight
      this.navOffsetTop = this.$refs['nav-list'].$el.offsetTop
      this.$refs.scroll.on('scroll', this.scroll)
    },
    open(type) {
      this.shopDrawer = true
      if (!type) return
      this.$nextTick(() => {
        this.$refs.shopDrawer.scrollToElement(type)
      })
    },
    close() {
      this.shopDrawer = false
    },
    rect() {
      // 注意这里不要用this.headerHeight, 而是使用$refs的方式获取值
      // 因为order组件的init方法优先于此组件的init方法执行
      // 当调用该方法时，this.headerHeight还是0
      return {
        headerHeight: this.$refs.header.$el.offsetHeight,
        navOffsetTop: this.$refs['nav-list'].$el.offsetTop,
        navHeight: this.$refs['nav-list'].$el.offsetHeight,
        menuTop: this.$refs.content.offsetTop,
      }
    },
    scroll({ y }) {
      y = Math.ceil(y)
      this.opacity = -y < this.interval ? +(-y / this.interval).toFixed(2) : 1
      this.navList = -y + this.headerHeight >= this.navOffsetTop
    },
    reset() {
      this.$refs.scroll.reset()
    },
    getScroll() {
      return this.$refs.scroll
    },
    ...mapMutations('shop', [SAVE_RESTAURANT_DATA]),
  },
}
</script>

<style lang="scss" scoped>
  .shop-detail-container {
    width: 100%;
    height: 100%;
  }

  .scroll-wrapper {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .shop-detail {
    position: relative;
    z-index: 0;
    padding-top: px2rem(100);
    background-color: #fff;
  }

  .bg-image-container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: px2rem(200);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    &::before {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(0, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.5));
    }

    .wave-container {
      position: absolute;
      bottom: px2rem(-20);
      left: 0;
      width: 100%;
      height: px2rem(50);
    }
  }

  .shop-name {
    @include single-line-overflow();
    padding-right: px2rem(30);
    color: $primaryTextColor;
    font-size: px2rem(36);
    font-weight: 700;
    text-align: center;
  }
</style>
