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
import { resolveImageUrl } from '@/utils'
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
    }
  },
  computed: {
    ...mapState('shop', {
      restaurant: state => state.restaurant,
    }),
  },
  created() {
    if (!this.restaurant) {
      const unwatch = this.$watch('restaurant', function () {
        this.$nextTick(() => {
          this.init()
        })
        unwatch()
      })
    }
  },
  mounted() {
    if (!this.restaurant) {
      this.getData()
      return
    }
    this.init()
    if (this.restaurant.id !== this.$route.params.id) this.getData()
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
        const { rst, redpack, menu } = data.data
        const hot = -1
        const cheap = -2
        let hotMenu = null
        let cheapMenu = null
        let index = menu.findIndex(item => item.id === hot)
        if (index !== -1) hotMenu = menu.splice(index, 1)[0]
        index = menu.findIndex(item => item.id === cheap)
        if (index !== -1) cheapMenu = menu.splice(index, 1)[0]
        const restaurant = {
          id: rst.id,
          name: rst.name,
          rating: rst.rating, // 评分
          floatDeliveryFee: rst.float_delivery_fee, // 配送费
          floatMinimumOrderAmount: rst.float_minimum_order_amount, // 最低起送价
          recentOrderNum: rst.recent_order_num, // 月销量
          orderLeadTime: rst.order_lead_time, // 配送时间
          notice: rst.promotion_info, // 公告
          imagePath: resolveImageUrl(rst.image_path),
          bgImagePath: resolveImageUrl(rst.shop_sign.image_hash),
          redpack: redpack.map(item => ({
            value: item.value,
            title: item.title,
          })),
          tags: rst.activity_tags.map(item => ({
            border: item.border,
            color: item.color,
            text: item.text,
          })),
          activities: rst.activities.map(item => ({
            id: item.id,
            border: item.border,
            color: item.text_color,
            description: item.description,
            iconName: item.icon_name,
          })),
          supports: rst.supports.map(item => ({
            id: item.id,
            border: item.border,
            description: item.description,
            color: item.text_color,
            name: item.name,
          })),
          menu: menu.map(item => ({
            id: item.id,
            name: item.name,
            iconUrl: item.icon_url ? resolveImageUrl(item.icon_url) : '',
            count: 0, // 该菜单选购的商品数量
            foods: item.foods.map(food => ({
              id: food.item_id,
              categoryId: food.category_id,
              name: food.name,
              sell: food.month_sales,
              originPrice: food.origin_price,
              price: food.price,
              rating: food.satisfy_rate,
              description: food.description.trim(),
              discountRate: food.discount_rate, // 折扣
              imagePath: resolveImageUrl(food.image_path),
              count: 0, // 该商品选购数量
            })),
          })),
          shopCar: [],
        }
        function topMenu(menu, restaurant) {
          restaurant.menu.unshift({
            id: menu.id,
            name: menu.name,
            iconUrl: menu.icon_url ? resolveImageUrl(menu.icon_url) : '',
            count: 0,
            foods: menu.foods.map((food) => {
              const m = restaurant.menu.find(item => item.id === food.category_id)
              return m.foods.find(item => item.id === food.item_id)
            }),
          })
        }
        if (hotMenu) topMenu(hotMenu, restaurant)
        if (cheapMenu) topMenu(cheapMenu, restaurant)
        this[SAVE_RESTAURANT_DATA](restaurant)
      }).finally(() => {
        this.loading = false
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
