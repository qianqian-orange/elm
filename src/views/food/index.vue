<template>
  <div
    class="food-container"
    :style="{
      paddingBottom: `${paddingBottom}px`,
    }"
  >
    <header class="header">
      <elm-icon
        name="arrow"
        :color="variable.primaryTextColor"
        :font-size="44"
        :rotate="-90"
        :stop-propagation="true"
        @click="back"
      />
      <p class="title">商品详情</p>
    </header>
    <scroll-view
      v-if="food"
      ref="scroll"
    >
      <div
        class="image"
        :style="{
          backgroundImage: `url(${food.imagePath})`,
        }"
      />
      <div class="content">
        <p class="food-name">{{ food.name }}</p>
        <div class="extra">
          <span class="sell">月售{{ food.sell }}</span>
          <span class="rating">好评率{{ food.rating }}%</span>
        </div>
        <div class="tag">
          <elm-tag color="#eb6551">{{ food.discountRate }}折</elm-tag>
        </div>
        <div>
          <span class="price">{{ food.price }}</span>
          <span class="origin-price">{{ food.originPrice }}</span>
        </div>
        <circle-button
          :value="food.count"
          @decrease="decrease(food)"
          @increase="increase(food)"
        />
      </div>
      <div
        v-if="food.description"
        class="block"
      >
        <p class="title">商品简介</p>
        <p class="desc">{{ food.description }}</p>
      </div>
    </scroll-view>
    <shop-car
      v-if="food"
      ref="shop-car"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import transitionMixin from '@/mixins/transition'
import { UPDATE_TRANSITION } from '@/store/modules/global/mutation-types'
import {
  INCREASE,
  DECREASE,
} from '@/store/modules/shop/mutation-types'
import { transition } from '@/config'
import variable from '@/scss/var.scss'
import ScrollView from '@/components/scrollView/index.vue'
import CircleButton from '@/components/circleButton/index.vue'
import ShopCar from '@/components/shopCar/index.vue'

export default {
  name: 'Food',
  title: '饿了么商品详情',
  meta: {
    keyword: 'elm, food',
    description: '这里展示了商品的详细信息，更大的美图，让您大饱眼福',
  },
  components: {
    ScrollView,
    CircleButton,
    ShopCar,
  },
  mixins: [transitionMixin],
  beforeRouteLeave(to, from, next) {
    this[UPDATE_TRANSITION](transition.slideRight)
    next()
  },
  data() {
    return {
      paddingBottom: 0,
    }
  },
  computed: {
    variable() {
      return variable
    },
    ...mapState('shop', {
      food: state => state.food,
    }),
  },
  mounted() {
    if (!this.food) {
      this.$notify({ type: 'primary', message: '暂时没有此商品信息' })
      this.$router.go(-1)
      return
    }
    this.paddingBottom = this.$refs['shop-car'].$el.offsetHeight
    this.$refs.scroll.reset()
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    decrease(food) {
      this[DECREASE](food)
    },
    increase(food) {
      this[INCREASE](food)
    },
    ...mapMutations('shop', [INCREASE, DECREASE]),
  },
}
</script>

<style lang="scss" scoped>
  .food-container {
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-color: #fafafa;
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    width: 100%;
    height: px2rem(84);

    .elm-icon {
      width: px2rem(72);
      height: px2rem(72);
      line-height: px2rem(72);
      text-align: center;
    }

    .title {
      padding-left: px2rem(8);
      color: $primaryTextColor;
      font-size: px2rem(36);
    }
  }

  .image {
    width: 100%;
    padding-top: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .content {
    position: relative;
    padding: px2rem(30);
    margin-bottom: px2rem(20);
    background-color: #fff;
  }

  .food-name {
    margin-bottom: px2rem(20);
    color: $primaryTextColor;
    font-size: px2rem(32);
    font-weight: 700;
    line-height: px2rem(42);
  }

  .extra {
    margin-bottom: px2rem(8);
    color: $secondaryTextColor;
    font-size: px2rem(24);

    .sell {
      margin-right: px2rem(12);
    }
  }

  .tag {
    margin-bottom: px2rem(8);
    line-height: px2rem(42);
  }

  .price {
    margin-right: px2rem(8);
    color: #ff4b33;
    font-size: px2rem(42);
    font-weight: 700;

    &::before {
      content: "¥";
      margin-right: px2rem(4);
      color: #ff4b33;
      font-size: px2rem(24);
    }
  }

  .origin-price {
    position: relative;
    color: $secondaryTextColor;
    font-size: px2rem(24);

    &::before {
      content: "¥";
      margin-right: px2rem(4);
      color: $secondaryTextColor;
      font-size: px2rem(24);
    }

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 120%;
      height: px2rem(2);
      background-color: #999;
    }
  }

  .block {
    padding: px2rem(30);
    color: $secondaryTextColor;
    background-color: #fff;

    .title {
      margin-bottom: px2rem(20);
      font-size: px2rem(28);
    }

    .desc {
      font-size: px2rem(24);
      line-height: px2rem(36);
      white-space: pre-wrap;
    }
  }

  .circle-button {
    position: absolute;
    right: px2rem(30);
    bottom: px2rem(30);
  }

  .elm-tag {
    padding: 0 px2rem(8);
    border-color: #ffc9c1;
  }
</style>
