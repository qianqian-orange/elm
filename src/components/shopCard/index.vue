<template>
  <li class="shop-card">
    <img
      v-lazy="shop.imagePath"
      alt="shop"
      class="shop-image"
      :style="{
        width: px2rem(extra ? 120 : 180),
        height: px2rem(extra ? 120 : 180),
      }"
    >
    <div class="content">
      <p class="shop-name">{{ shop.name }}</p>
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
      <!-- 好评 -->
      <elm-fold
        :height="60"
        @expand="expand"
      >
        <ul class="tag-list">
          <li
            v-for="reason in shop.recommendReasons"
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
      <!-- 标签 -->
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
      <!-- 优惠 -->
      <elm-fold
        v-if="extra && shop.activities.length"
        :height="92"
        @expand="expand"
      >
        <ul>
          <li
            v-for="activity in shop.activities"
            :key="activity.id"
            class="activity-item"
          >
            <span
              :style="{
                backgroundColor: `#${activity.iconColor}`,
              }"
              class="icon"
            >{{ activity.iconName }}</span>
            <span class="desc">{{ activity.description }}</span>
          </li>
        </ul>
      </elm-fold>
      <!-- 爆款推荐 -->
      <div v-if="extra && shop.foods.length">
        <scroll-view
          :scroll-x="true"
          :scroll-y="false"
          :stop-propagation="true"
        >
          <ul class="food-list">
            <li
              v-for="food in shop.foods"
              :key="food.id"
            >
              <img
                class="food-image"
                :src="food.imagePath"
                alt="food"
              >
              <p class="food-name">{{ food.name }}</p>
              <p class="food-price">
                <span class="prefix">¥</span>{{ food.price }}</p>
            </li>
          </ul>
        </scroll-view>
      </div>
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
        @click.stop="hate"
      >不喜欢</div>
    </elm-mask>
  </li>
</template>

<script>
import px2rem from '@/utils/px2rem'
import variable from '@/scss/var.scss'
import ScrollView from '@/components/scrollView/index.vue'

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
  components: {
    ScrollView,
  },
  props: {
    shop: {
      type: Object,
      required: true,
    },
    extra: {
      type: Boolean,
      default: false,
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
      this.$emit('hate', this.shop.id)
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
  }

  .shop-image {
    margin-right: px2rem(30);
    object-fit: cover;
  }

  .content {
    @include border-bottom-1px();
    position: relative;
    overflow: hidden;
    flex: 1;
    padding-bottom: px2rem(30);

    .shop-name {
      @include single-line-overflow();
      width: px2rem(350);
      margin-bottom: px2rem(12);
      color: $primaryTextColor;
      font-size: px2rem(32);
      font-weight: 700;
      line-height: px2rem(48);
    }

    .block {
      display: flex;
      align-items: center;
      height: px2rem(48);
      color: #999;
      font-size: px2rem(24);
    }

    .star {
      padding-bottom: px2rem(4);
      margin-right: px2rem(8);
    }

    .rating {
      margin-right: px2rem(16);
      color: #ff6300;
    }

    .sell,
    .dilivery-fee {
      flex: 1;
    }

    .order-amount,
    .time {
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
      line-height: px2rem(48);
      text-align: center;
    }

    .activity-item {
      height: px2rem(42);
      margin-bottom: px2rem(8);
      line-height: px2rem(42);

      .icon {
        padding: 0 px2rem(4);
        color: #fff;
        font-size: px2rem(24);
        border-radius: px2rem(4);
      }

      .desc {
        color: #999;
        font-size: px2rem(24);
      }
    }

    .food-list {
      display: flex;
      flex-wrap: nowrap;
      padding-top: px2rem(20);

      .food-image {
        width: px2rem(180);
        height: px2rem(180);
        margin-right: px2rem(16);
        border-radius: px2rem(12);
        object-fit: cover;
      }

      .food-name {
        @include single-line-overflow();
        width: px2rem(180);
        color: $primaryTextColor;
        font-size: px2rem(24);
        line-height: px2rem(36);
      }

      .food-price {
        color: #ff5339;
        font-size: px2rem(32);
      }

      .prefix {
        font-size: px2rem(24);
        vertical-align: bottom;
      }
    }
  }

  .hate {
    width: px2rem(120);
    height: px2rem(120);
    color: $primaryTextColor;
    font-size: px2rem(24);
    line-height: px2rem(120);
    text-align: center;
    background-color: #fff;
    border-radius: 50%;
  }
</style>
