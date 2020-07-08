<template>
  <div class="home">
    <home-header
      ref="header"
      :style="{
        transform: `translateY(${translateY}px)`,
      }"
    />
    <sort-filter
      ref="filter"
      :style="{
        position: 'fixed',
        top: `${top}px`,
        left: 0,
        zIndex: 999,
      }"
      @top="toTop"
      @search="search"
    />
    <scroll-view
      ref="scroll"
      :probe-type="1"
    >
      <main
        :style="{
          paddingTop: `${paddingTop}px`,
        }"
        class="home-main"
      >
        <div
          class="wave-container"
          :style="{
            top: 0,
            paddingTop: `${paddingTop}px`,
          }"
        >
          <wave />
        </div>
        <advertisement ref="advertisement" />
        <kind ref="kind" />
        <div class="constraint">
          <div
            class="super-vip"
            @click.stop="noop"
          >
            <div class="left">
              <img
                :src="require('@/assets/image/svip.png')"
                alt="vip"
              >
              <span class="title">加入超级会员</span>
              <span class="desc">每月领20元红包</span>
            </div>
            <div class="right">
              <span>立即开通</span>
              <elm-icon
                name="arrow"
                color="#644f1b"
                :rotate="90"
              />
            </div>
          </div>
          <p
            class="guess"
            :style="{
              paddingBottom: `${filterHeight}px`,
            }"
          >猜你喜欢</p>
          <shop-list
            ref="list"
            @reset="reset"
            @expand="reset"
            @hate="hate"
          />
        </div>
      </main>
    </scroll-view>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {
  GET_ADVERTISEMENT_DATA,
  GET_KIND_DATA,
  GET_SHOPLIST_DATA,
} from '@/store/modules/home/action-types'
import { GET_FILTER_DATA } from '@/store/modules/shop/action-types'
import loadmoreMixin from '@/mixins/loadmore'
import transitionMixin from '@/mixins/transition'
import { UPDATE_TRANSITION } from '@/store/modules/global/mutation-types'
import { transition } from '@/config'
import storeModuleKey from '@/config/store'
import SortFilter from '@/components/sortFilter/index.vue'
import ShopList from './shopList.vue'
import HomeHeader from './header.vue'
import ScrollView from '@/components/scrollView/index.vue'
import Wave from '@/components/wave/index.vue'
import Advertisement from './advertisement.vue'
import Kind from './kind.vue'

export default {
  name: 'Home',
  components: {
    HomeHeader,
    ScrollView,
    Wave,
    Advertisement,
    Kind,
    SortFilter,
    ShopList,
  },
  mixins: [loadmoreMixin, transitionMixin],
  beforeRouteLeave(to, from, next) {
    this[UPDATE_TRANSITION](transition.slideLeft)
    next()
  },
  asyncData({ store, route }) {
    // 在服务端渲染的时候我们可以获取路由匹配的组件，然后调用组件的asyncData方法
    // 但是注意子组件如filterSort, shopList等，那么是不会调用他们的asyncData方法的
    // 所以这里需要手动调用子组件获取数据的方法
    return Promise.all([
      store.dispatch(`${storeModuleKey.home}/${GET_ADVERTISEMENT_DATA}`),
      store.dispatch(`${storeModuleKey.home}/${GET_KIND_DATA}`),
      store.dispatch(`${storeModuleKey.home}/${GET_SHOPLIST_DATA}`),
      store.dispatch(`${storeModuleKey.shop}/${GET_FILTER_DATA}`),
    ])
  },
  data() {
    return {
      loading: false,
      paddingTop: 0,
      translateY: 0,
      offsetTop: 0,
      filterHeight: 0,
      top: 0,
      inputHeight: 0,
      interval: 600,
    }
  },
  computed: {
    ...mapState('home', {
      advertisement: state => state.advertisement,
      kindGroup: state => state.kindGroup,
    }),
  },
  mounted() {
    this.scrollHandler()
    if (this.advertisement.length && this.kindGroup.length) {
      // 在服务端渲染中，广告和分类数据已经有了，advertisement和kind组件已经渲染完成
      // 但是这里还是需要nextTick的原因是因为在scrollHandler中修改了paddingTop值
      // 会触发重新渲染，那么就需要在下一nextTick才能获取到正确的数据
      this.$nextTick(() => {
        this.top = this.offsetTop = this.$refs.list.$el.offsetTop - this.filterHeight
      })
      return
    }
    this.loading = true
    Promise.all([
      this[GET_ADVERTISEMENT_DATA](),
      this[GET_KIND_DATA](),
    ]).then(() => {
      this.reset()
      this.$nextTick(() => {
        this.top = this.offsetTop = this.$refs.list.$el.offsetTop - this.filterHeight
      })
    }).catch(() => {
      this.$notify({ type: 'danger', message: '获取数据失败' })
    }).finally(() => {
      this.loading = false
    })
  },
  methods: {
    scrollHandler() {
      this.filterHeight = this.$refs.filter.$el.offsetHeight
      const { headerHeight, locationHeight } = this.$refs.header.height()
      this.inputHeight = headerHeight - locationHeight
      this.paddingTop = headerHeight
      this.top = headerHeight // 这里先设置为headerHeight的高度，避免遮住了header，否则页面效果就不好了
      this.$refs.scroll.on('scroll', ({ y }) => {
        y = Math.ceil(y)
        // 处理header
        this.translateY = locationHeight + y <= 0 ? -locationHeight : y
        // 处理filter
        this.top = this.offsetTop + y <= this.inputHeight ? this.inputHeight : this.offsetTop + y
        // 处理loadmore
        if (this.parentHeight + this.interval >= this.contentHeight + y) this.loadmore()
      })
      // 为了保证数据精确
      this.$refs.scroll.on('scrollEnd', ({ y }) => {
        y = Math.ceil(y)
        this.translateY = locationHeight + y <= 0 ? -locationHeight : y
        this.top = this.offsetTop + y <= this.inputHeight ? this.inputHeight : this.offsetTop + y
      })
    },
    loadmore() {
      this.$refs.list.getData()
    },
    toTop() {
      if (this.top === this.inputHeight) return
      this.$refs.scroll.scrollTo({ y: -(this.offsetTop - this.inputHeight) }, 300)
    },
    search() {
      this.$refs.list.search()
        .then(() => {
          if (this.top !== this.inputHeight) return
          this.$refs.scroll.scrollTo({ y: -(this.offsetTop - this.inputHeight) })
        })
    },
    hate() {
      this.reset()
    },
    noop() {
      this.$notify({ type: 'success', message: '功能正在开发中' })
    },
    ...mapActions('home', [GET_KIND_DATA, GET_ADVERTISEMENT_DATA]),
  },
}
</script>

<style lang="scss" scoped>
  .home {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .home-main {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  .wave-container {
    position: absolute;
    left: 0;
    z-index: -1;
    width: 100%;
    height: px2rem(114);
    background-color: $themeColor;
  }

  .constraint {
    padding: 0 px2rem(30);
  }

  .super-vip {
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
    height: px2rem(80);
    padding: 0 px2rem(14) 0 px2rem(28);
    color: #644f1b;
    line-height: px2rem(80);
    background-image: linear-gradient(90deg, #ffefc4, #f3dda0);
    border-radius: px2rem(8);

    .left {
      float: left;

      img {
        width: px2rem(36);
        height: px2rem(36);
        vertical-align: sub;
        object-fit: cover;
      }

      .title {
        font-size: px2rem(28);
        font-weight: 700;
      }

      .desc {
        font-size: px2rem(24);
      }
    }

    .right {
      float: right;
      font-size: px2rem(24);
    }
  }

  .guess {
    height: px2rem(96);
    padding-top: px2rem(20);
    color: $primaryTextColor;
    font-size: px2rem(36);
    font-weight: 700;
    line-height: px2rem(96);
  }
</style>
