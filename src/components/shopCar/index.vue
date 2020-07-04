<template>
  <div class="shop-car-container">
    <drawer
      :visible="visible"
      :padding-bottom="shopCarHeight"
      @toggle="close"
    />
    <div
      ref="shop-car"
      class="shop-car"
      @click.stop="open"
    >
      <div
        class="car"
        :class="shopCar.length ? 'active' : ''"
      >
        <elm-icon
          ref="car"
          name="car"
          :color="shopCar.length ? '#fff' : '#999'"
          :font-size="46"
        />
        <elm-badge
          v-show="count"
          :value="count"
        />
      </div>
      <div class="content">
        <p
          v-if="!shopCar.length"
          class="tip"
        >未选购商品</p>
        <p v-else>
          <span class="price">{{ price }}</span>
          <span class="origin-price">{{ originPrice }}</span>
        </p>
        <p class="delivery-fee">{{ restaurant.floatDeliveryFee ? `另需配送费¥${restaurant.floatDeliveryFee}` : '免费配送' }}</p>
      </div>
      <div
        class="btn"
        :class="price >= restaurant.floatMinimumOrderAmount ? 'active' : ''"
        @click.stop="pay"
      >{{ desc }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Drawer from './drawer.vue'

export default {
  name: 'ShopCar',
  components: {
    Drawer,
  },
  data() {
    return {
      visible: false,
      shopCarHeight: 0,
    }
  },
  computed: {
    price() {
      return this.shopCar.reduce((pre, cur) => pre + parseFloat(cur.price) * cur.count, 0).toFixed(2)
    },
    originPrice() {
      return this.shopCar.reduce((pre, cur) => pre + parseFloat(cur.originPrice) * cur.count, 0).toFixed(2)
    },
    desc() {
      if (!this.shopCar.length) return `¥${this.restaurant.floatMinimumOrderAmount}起送`
      if (this.price >= this.restaurant.floatMinimumOrderAmount) return '去结算'
      return `还差${(this.restaurant.floatMinimumOrderAmount - this.price).toFixed(2)}起送`
    },
    count() {
      return this.shopCar.reduce((pre, cur) => pre + cur.count, 0)
    },
    ...mapState('shop', {
      restaurant: state => state.restaurant,
      shopCar: state => state.restaurant.shopCar,
    }),
  },
  mounted() {
    this.shopCarHeight = this.$refs['shop-car'].offsetHeight
  },
  methods: {
    to() {
      return this.$refs.car.$el
    },
    pay() {
      if (this.price < this.restaurant.floatMinimumOrderAmount) return
      this.$notify({ type: 'primary', message: '功能正在开发中' })
    },
    open() {
      if (!this.shopCar.length) return
      this.visible = true
    },
    close() {
      this.visible = false
    },
  },
}
</script>

<style lang="scss" scoped>
  .shop-car-container {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    height: px2rem(96);
  }

  .shop-car {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 px2rem(30);
    background-color: rgba(61, 61, 63, .9);
  }

  .car {
    position: relative;
    transform: translateY(px2rem(-20));
    display: flex;
    justify-content: center;
    align-items: center;
    width: px2rem(90);
    height: px2rem(90);
    margin-right: px2rem(30);
    border: px2rem(10) solid rgba(61, 61, 63, .9);
    background-color: #333;
    border-radius: 50%;

    &.active {
      background-color: $themeColor;
    }

    .elm-badge {
      position: absolute;
      top: px2rem(-8);
      right: px2rem(-4);
    }
  }

  .content {
    flex: 1;
  }

  .tip {
    margin-bottom: px2rem(8);
    color: $secondaryTextColor;
    font-size: px2rem(28);
    font-weight: 700;
  }

  .delivery-fee {
    color: $secondaryTextColor;
    font-size: px2rem(24);
  }

  .btn {
    width: px2rem(180);
    height: px2rem(68);
    color: #fff;
    font-size: px2rem(28);
    font-weight: 700;
    line-height: px2rem(68);
    text-align: center;
    background-color: #999;
    border-radius: px2rem(36);

    &.active {
      background-color: $themeColor;
    }
  }

  .price {
    margin-right: px2rem(8);
    color: #fff;
    font-size: px2rem(42);
    font-weight: 700;

    &::before {
      content: "¥";
      margin-right: px2rem(4);
      color: #fff;
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
</style>
