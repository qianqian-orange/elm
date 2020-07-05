<template>
  <div
    class="shop-detail-card"
    @click.stop="expand('')"
  >
    <h1 class="shop-name">{{ restaurant.name }}</h1>
    <div class="information">
      <span class="rating">评分{{ restaurant.rating }}</span>
      <span class="sell">月售{{ restaurant.recentOrderNum }}</span>
      <span class="time">蜂鸟专送约{{ restaurant.orderLeadTime | time }}</span>
    </div>
    <p
      class="notice"
      @click.stop="expand('notice')"
    >公告：{{ restaurant.notice }}</p>
    <ul class="redpack-list">
      <li
        v-for="(item, index) in restaurant.redpack.slice(0, 2)"
        :key="index"
        class="redpack-item"
      >
        <span class="money">{{ item.value }}</span>
        <span class="title">{{ item.title }}</span>
        <span class="acquire">领</span>
      </li>
    </ul>
    <ul
      class="tag-list"
      @click.stop="expand('activity')"
    >
      <li
        v-for="(tag, index) in restaurant.tags.slice(0, 4)"
        :key="index"
        class="tag-item"
      >
        <elm-tag
          :color="tag.color"
          :style="{
            borderColor: tag.border,
          }"
        >{{ tag.text }}</elm-tag>
      </li>
    </ul>
    <span
      class="activity"
      @click.stop="expand('activity')"
    >{{ restaurant.activities.length }}个优惠&nbsp;<elm-icon
      name="arrow"
      :rotate="180"
      color="#999"
    /></span>
    <img
      :src="restaurant.imagePath"
      alt="shop"
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Card',
  filters: {
    time(val) {
      if (val < 60) return `${val}分钟`
      const h = val / 60
      const m = val % 60
      return `${h}小时${m}分钟`
    },
  },
  computed: {
    ...mapState('shop', {
      restaurant: state => state.restaurant,
    }),
  },
  methods: {
    expand(type) {
      // type值要与drawer组件中的ref对应
      this.$emit('expand', type)
    },
  },
}
</script>

<style lang="scss" scoped>
  .shop-detail-card {
    box-sizing: border-box;
    position: relative;
    padding: px2rem(30);
    margin: 0 px2rem(30) px2rem(30);
    background-color: #fff;
    border-radius: px2rem(12);
    box-shadow: 0 px2rem(8) px2rem(20) 0 #eee;

    img {
      position: absolute;
      top: px2rem(24);
      right: px2rem(30);
      width: px2rem(100);
      height: px2rem(100);
      border-radius: px2rem(12);
    }

    .shop-name {
      @include single-line-overflow();
      width: px2rem(520);
      margin-bottom: px2rem(20);
      color: $primaryTextColor;
      font-size: px2rem(36);
      font-weight: 700;
    }

    .information {
      margin-bottom: px2rem(16);
      color: $primaryTextColor;
      font-size: px2rem(24);

      span {
        margin-right: px2rem(20);
      }
    }

    .notice {
      @include single-line-overflow();
      margin-bottom: px2rem(20);
      color: $secondaryTextColor;
      font-size: px2rem(24);
    }

    .redpack-list {
      display: flex;
      flex-wrap: wrap;
    }

    .redpack-item {
      position: relative;
      margin-right: px2rem(14);
      margin-bottom: px2rem(14);
      color: #644f1b;
      font-size: px2rem(24);
      line-height: px2rem(42);
      background-image: linear-gradient(90deg, #ffefc4, #f3dda0);
      border-radius: px2rem(4);

      &::before,
      &::after {
        content: "";
        position: absolute;
        right: px2rem(40);
        width: px2rem(8);
        height: px2rem(8);
        background-color: #fff;
      }

      &::before {
        top: px2rem(-4);
      }

      &::after {
        bottom: px2rem(-4);
      }

      .money {
        padding-left: px2rem(20);
        font-size: px2rem(32);
        font-weight: 700;

        &::before {
          content: "¥";
          margin-right: px2rem(4);
          font-size: px2rem(24);
        }
      }

      .title {
        position: relative;
        padding-right: px2rem(20);

        &::before {
          @include bg("~@/assets/image/svip.png");
          content: "";
          display: inline-block;
          width: px2rem(30);
          height: px2rem(30);
          margin-right: px2rem(4);
          vertical-align: sub;
        }

        &::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
          border-right: 1px dashed #fff;
        }
      }

      .acquire {
        padding-right: px2rem(12);
      }
    }

    .tag-list {
      display: flex;
      flex-wrap: wrap;
      height: px2rem(60);
    }

    .tag-item {
      height: px2rem(60);
      margin-right: px2rem(14);
      line-height: px2rem(60);
    }

    .activity {
      position: absolute;
      right: px2rem(30);
      bottom: px2rem(30);
      color: #999;
      font-size: px2rem(24);
      line-height: px2rem(60);
    }
  }
</style>
