<template>
  <common ref="common">
    <food-list
      ref="food"
      :padding-bottom="shopCarHeight"
      @increase="increase"
    />
    <template #extra>
      <p
        v-show="title"
        ref="title"
        class="title"
      >优惠</p>
      <elm-menu
        v-if="restaurant"
        ref="menu"
        :height="menuHeight"
        :padding-bottom="shopCarHeight"
        :style="{
          position: 'fixed',
          top: `${menuTop}px`,
          left: 0,
          zIndex: 999,
          transform: `translateY(${translateY}px)`,
          willChange: 'transform',
        }"
        @select="select"
      />
      <shop-car
        v-if="restaurant"
        ref="shop-car"
      />
      <ball ref="ball" />
    </template>
  </common>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { UPDATE_TRANSITION } from '@/store/modules/global/mutation-types'
import transitionMixin from '@/mixins/transition'
import { transition } from '@/config'
import { debounce } from '@/utils'
import { routes } from '@/config/router'
import ShopCar from '@/components/shopCar/index.vue'
import Common from '../common/index.vue'
import FoodList from './foodList.vue'
import ElmMenu from './menu.vue'
import Ball from './ball.vue'

export default {
  name: 'Order',
  components: {
    Common,
    FoodList,
    ElmMenu,
    ShopCar,
    Ball,
  },
  mixins: [transitionMixin],
  beforeRouteLeave(to, from, next) {
    const {
      home,
      food,
      kind,
      shopSearch,
      shopComment,
    } = routes
    switch (to.name) {
      case home.name:
      case kind.name:
      case shopSearch.name:
        this[UPDATE_TRANSITION](transition.slideRight)
        break
      case food.name:
        from.meta.scrollHeight = this.scroller.getCurrent().y
        this[UPDATE_TRANSITION](transition.slideLeft)
        break
      case shopComment.name:
        this[UPDATE_TRANSITION]('')
        break
    }
    next()
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.scroller) return
      const { food } = routes
      const y = to.meta.scrollHeight
      switch (from.name) {
        case food.name:
          vm.scroller.scrollTo({ y })
          vm.$refs.common.scroll({ y })
          vm.scroll({ y })
          break
      }
    })
  },
  data() {
    return {
      title: false,
      foodDrawer: false,
      shopCarHeight: 0,
      menuHeight: 0,
      menuTop: 0,
      translateY: 0,
      headerHeight: 0,
      navHeight: 0,
      height: 0,
      scroller: null,
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
  beforeDestroy() {
    window.removeEventListener('resize', this.resize, false)
  },
  mounted() {
    if (!this.restaurant) return
    this.init()
  },
  methods: {
    init() {
      const {
        headerHeight,
        navHeight,
        navOffsetTop,
        menuTop,
      } = this.$refs.common.rect()
      this.scroller = this.$refs.common.getScroll()
      this.headerHeight = headerHeight
      this.navHeight = navHeight
      this.navOffsetTop = navOffsetTop
      this.menuTop = menuTop
      this.height = this.menuHeight = document.body.offsetHeight - this.menuTop
      this.$refs.title.style.top = `${this.headerHeight + this.navHeight}px`
      this.shopCarHeight = this.$refs['shop-car'].$el.offsetHeight
      this.$refs.common.reset()
      this.scroller.on('scroll', this.scroll)
      this.resize = debounce(() => {
        this.height = document.body.offsetHeight - this.menuTop
        this.menuHeight = this.height - this.translateY
      }, false)
      window.addEventListener('resize', this.resize, false)
    },
    scroll({ y }) {
      y = Math.ceil(y)
      const residue = this.menuTop - this.headerHeight - this.navHeight
      this.title = -y + this.headerHeight >= this.navOffsetTop
      const flag = -y + this.headerHeight + this.navHeight >= this.menuTop
      this.translateY = flag ? -residue : y
      this.menuHeight = flag ? this.height + residue : -y + this.height
      this.$refs.food.scroll(-y + this.headerHeight + this.navHeight, ({ index, translateY }) => {
        this.$refs.title.textContent = this.restaurant.menu[index].name
        this.$refs.title.style.transform = `translateY(${translateY}px)`
        this.$refs.menu.scrollToElement(index)
      })
    },
    increase(el) {
      const to = this.$refs['shop-car'].to()
      this.$refs.ball.run(to, el)
    },
    select(index) {
      const el = this.$refs.food.getElement(index)
      const y = -(el.offsetTop - this.headerHeight - this.navHeight)
      this.scroller.scrollTo({ y })
      this.$refs.common.scroll({ y })
      const residue = this.menuTop - this.headerHeight - this.navHeight
      this.translateY = -residue
      this.menuHeight = this.height + residue
    },
    toggle() {
      this.foodDrawer = !this.foodDrawer
    },
    ...mapMutations('global', [UPDATE_TRANSITION]),
  },
}
</script>

<style lang="scss" scoped>
  .title {
    position: fixed;
    right: 0;
    left: 0;
    z-index: 99;
    padding: px2rem(20) px2rem(30) px2rem(20) px2rem(180);
    color: $primaryTextColor;
    font-size: px2rem(28);
    background-color: #fff;
    will-change: transform;
  }
</style>
