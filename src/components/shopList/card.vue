<template>
  <li class="shop-card">
    <img
      v-lazy="shop.imagePath"
      alt="shop"
    >
    <div class="content">
      <p class="name">{{ shop.name }}</p>
      <div class="block">
        <elm-icon
          name="star"
          color="#ff6300"
          class="star"
        />
        <span class="rating">{{ shop.rating }}</span>
        <span class="sell">{{ shop.recentOrderNumDisplay }}</span>
        <elm-tag
          color="#fff"
          :style="{
            backgroundColor: variable.themeColor,
          }"
        >蜂鸟专送</elm-tag>
      </div>
      <div class="block">
        <span class="order-amount">起送¥{{ shop.floatMinimumOrderAmount }}</span>
        <span class="dilivery-fee">{{ shop.floatDeliveryFee | deliveryFee }}</span>
        <span class="time">{{ shop.orderLeadTime | time }}</span>
        <span class="distance">{{ shop.distance | distance }}</span>
      </div>
      <elm-fold
        :height="60"
        @expand="expand"
      >
        <ul class="tag-list">
          <li
            v-for="{ reason } in shop.recommendReasons"
            :key="reason"
            class="tag-item"
          >
            <elm-tag
              color="#fe7100"
              :style="{
                borderColor: 'rgba(255,114,0,.12)',
                backgroundColor: 'rgba(255,114,0,.12)',
              }"
            >{{ reason }}</elm-tag>
          </li>
        </ul>
      </elm-fold>
      <elm-fold
        :height="60"
        @expand="expand"
      >
        <ul class="tag-list">
          <li
            v-for="(support, index) in shop.supportTags"
            :key="index"
            class="tag-item"
          >
            <elm-tag
              :color="`#${support.color}`"
              :style="{
                borderColor: `#${support.border}`,
                backgroundImage: support.background ? `linear-gradient(to right, #${support.background.rgbFrom}, #${support.background.rgbTo})` : 'transparent',
              }"
            >{{ support.text }}</elm-tag>
          </li>
        </ul>
      </elm-fold>
      <elm-icon
        class="omit"
        name="omit"
        color="#999"
        :font-size="32"
        @click="toggle"
      />
    </div>
    <elm-mask
      v-if="!hidden"
      :style="{ margin: `0 -${px2rem(30)}` }"
      @click="toggle"
    >
      <div
        class="hate"
        @click="hate"
      >不喜欢</div>
    </elm-mask>
  </li>
</template>

<script>
import px2rem from '@/utils/px2rem'
import variable from '@/scss/var.scss'

export default {
  name: 'ShopCard',
  filters: {
    deliveryFee(val) {
      return val ? `配送¥${val}` : '免费配送'
    },
    distance(val) {
      return val < 1000 ? `${val}m` : `${(val / 1000).toFixed(2)}km`
    },
    time(val) {
      if (val < 60) return `${val}分钟`
      const h = val / 60
      const m = val % 60
      return `${h}小时${m}分钟`
    },
  },
  props: {
    shop: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      px2rem,
      hidden: true,
    }
  },
  computed: {
    variable() {
      return variable
    },
  },
  methods: {
    toggle() {
      this.hidden = !this.hidden
    },
    hate() {
      this.$emit('hate')
    },
    expand() {
      this.$emit('expand')
    },
  },
}
</script>

<style lang="scss" scoped>
  .shop-card {
    position: relative;
    display: flex;
    padding-top: px2rem(30);

    img {
      width: px2rem(160);
      height: px2rem(160);
      object-fit: cover;
      margin-right: px2rem(30);
    }
  }
  .content {
    position: relative;
    flex: 1;
    padding-bottom: px2rem(30);

    @include border-bottom-1px();

    .name {
      width: px2rem(350);
      margin-bottom: px2rem(12);
      font-size: px2rem(32);
      font-weight: 700;
      color: $primaryTextColor;
      line-height: px2rem(48);

      @include single-line-overflow();
    }
    .block {
      display: flex;
      align-items: center;
      height: px2rem(48);
      font-size: px2rem(24);
      color: #999;
    }
    .star {
      margin-right: px2rem(8);
      padding-bottom: px2rem(4);
    }
    .rating {
      color: #ff6300;
      margin-right: px2rem(16);
    }
    .sell, .dilivery-fee {
      flex: 1;
    }
    .order-amount, .time {
      margin-right: px2rem(16);
    }
    .tag-list {
      display: flex;
      flex-wrap: wrap;

      .tag-item {
        height: px2rem(52);
        margin-right: px2rem(8);
        margin-bottom: px2rem(8);
        line-height: px2rem(52);
      }
    }
    .omit {
      position: absolute;
      top: 0;
      right: 0;
      width: px2rem(48);
      height: px2rem(48);
      text-align: center;
      line-height: px2rem(48);
    }
  }
  .hate {
    width: px2rem(120);
    height: px2rem(120);
    text-align: center;
    font-size: px2rem(24);
    color: $primaryTextColor;
    line-height: px2rem(120);
    background-color: #fff;
    border-radius: 50%;
  }
</style>
