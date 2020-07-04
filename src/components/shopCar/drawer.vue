<template>
  <div>
    <transition
      name="drawer"
      appear
    >
      <div
        v-show="visible"
        class="food-drawer-mask"
        @click.self.stop="close"
      >
        <div class="food-drawer-container">
          <header class="header">
            <span class="title">已选商品</span>
            <div @click.stop="toggle">
              <elm-icon
                name="trash"
                color="#999"
                :font-size="28"
              />
              <span class="clear">清空</span>
            </div>
          </header>
          <div class="scroll-wrapper">
            <scroll-view ref="scroll">
              <ul
                class="food-list"
                :style="{
                  paddingBottom: `${paddingBottom}px`,
                }"
              >
                <li
                  v-for="food in shopCar"
                  :key="food.id"
                  class="food-item"
                >
                  <img
                    :src="food.imagePath"
                    alt="food"
                  >
                  <div class="content">
                    <p class="food-name">{{ food.name }}</p>
                    <span class="price">{{ food.price }}</span>
                    <circle-button
                      :value="food.count"
                      :style="{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        zIndex: 999, // 注意这里需要设置z-index提高层级，否则在过渡的时候后面的li会形成单纯的图层
                      }"
                      @decrease="decrease(food)"
                      @increase="increase(food)"
                    />
                  </div>
                </li>
              </ul>
            </scroll-view>
          </div>
        </div>
      </div>
    </transition>
    <elm-dialog
      v-if="dialog"
      title="清空购物车"
      @cancel="toggle"
      @ensure="clear"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import {
  INCREASE,
  DECREASE,
  CLEAR_SHOPCAR_DATA,
} from '@/store/modules/shop/mutation-types'
import ScrollView from '@/components/scrollView/index.vue'
import CircleButton from '@/components/circleButton/index.vue'

export default {
  name: 'FoodDrawer',
  components: {
    CircleButton,
    ScrollView,
  },
  props: {
    paddingBottom: {
      type: Number,
      default: 0,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialog: false,
    }
  },
  computed: {
    ...mapState('shop', {
      shopCar: state => state.restaurant.shopCar,
    }),
  },
  watch: {
    visible(val) {
      if (!val) return
      this.$refs.scroll.reset()
    },
  },
  methods: {
    close() {
      this.$emit('toggle')
    },
    decrease(food) {
      this[DECREASE](food)
      this.$refs.scroll.reset()
    },
    increase(food, e) {
      this[INCREASE](food)
    },
    toggle() {
      this.dialog = !this.dialog
    },
    clear() {
      this.dialog = false
      this[CLEAR_SHOPCAR_DATA]()
      this.close()
    },
    ...mapMutations('shop', [INCREASE, DECREASE, CLEAR_SHOPCAR_DATA]),
  },
}
</script>

<style lang="scss" scoped>
  .food-drawer-mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background-color: rgba(0, 0, 0, .3);
  }

  .food-drawer-container {
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 70%;
    background-color: #fff;
    transition: transform .2s linear;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: px2rem(30);
    background-color: #fafafa;

    .title {
      color: $primaryTextColor;
      font-size: px2rem(28);
    }

    .clear {
      color: $secondaryTextColor;
      font-size: px2rem(28);
    }
  }

  .scroll-wrapper {
    overflow: hidden;
    flex: 1;
  }

  .food-list {
    padding: 0 px2rem(30);

    .food-item {
      display: flex;
      align-items: center;
      height: px2rem(120);
      padding: px2rem(20) 0;
    }

    img {
      width: px2rem(120);
      height: px2rem(120);
      margin-right: px2rem(20);
      border-radius: px2rem(8);
    }

    .content {
      position: relative;
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }

    .food-name {
      color: $primaryTextColor;
      font-size: px2rem(28);
      font-weight: 700;
    }

    .price {
      margin-right: px2rem(8);
      color: #ff4b33;
      font-size: px2rem(36);
      font-weight: 700;

      &::before {
        content: "¥";
        margin-right: px2rem(4);
        color: #ff4b33;
        font-size: px2rem(24);
      }
    }
  }

  .drawer-enter,
  .drawer-leave-to {
    opacity: 0;

    .food-drawer-container {
      transform: translateY(100%);
    }
  }

  .drawer-enter-active,
  .drawer-leave-active {
    transition: opacity .2s linear;
  }
</style>
