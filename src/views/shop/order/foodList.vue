<template>
  <ul
    class="food-list-container"
    :style="{
      paddingBottom: `${paddingBottom}px`,
    }"
  >
    <li
      v-for="menu in restaurant.menu"
      :key="menu.id"
    >
      <p
        ref="title"
        class="title"
      >{{ menu.name }}</p>
      <ul class="food-list">
        <li
          v-for="food in menu.foods"
          :key="food.id"
          class="food-item"
          @click.stop="jump(food)"
        >
          <img
            :src="food.imagePath"
            alt="food"
          >
          <div class="content">
            <p class="name">{{ food.name }}</p>
            <p
              v-if="food.description"
              class="desc"
            >{{ food.description }}</p>
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
              @increase="increase(food, $event)"
            />
          </div>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import {
  SAVE_FOOD_DATA,
  INCREASE,
  DECREASE,
} from '@/store/modules/shop/mutation-types'
import CircleButton from '@/components/circleButton/index.vue'

export default {
  name: 'FoodList',
  components: {
    CircleButton,
  },
  props: {
    paddingBottom: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      offsetTops: [],
      height: 0,
    }
  },
  computed: {
    ...mapState('shop', {
      restaurant: state => state.restaurant,
    }),
  },
  watch: {
    restaurant() {
      this.init()
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.height = this.$refs.title[0].offsetHeight
      this.$refs.title.forEach((item) => {
        this.offsetTops.push(item.offsetTop)
      })
    },
    scroll(y, cb) {
      const index = this.offsetTops.findIndex(item => item > y)
      if (index === 0) return
      if (index === -1) return cb({ index: this.offsetTops.length - 1, translateY: 0 })
      const translateY = this.offsetTops[index] - (y + this.height)
      cb({ index: index - 1, translateY: translateY >= 0 ? 0 : translateY })
    },
    getElement(index) {
      return this.$refs.title[index]
    },
    jump(food) {
      // 这里有个bug，如果使用router-link进行跳转，那么当狂点circle-button的时候（并且有小球弹出效果）
      // 会进入food详情页，但是页面却刷新了, 也就是说vuex中的数据没有了，那么会返回首页
      // 这种用户体验效果极差，目前不知道为了页面会刷新。
      // 所以改用手动跳转的方式，就没有这个bug了
      this[SAVE_FOOD_DATA](food)
      this.$router.push(`/food/${food.id}`)
    },
    decrease(food) {
      this[DECREASE](food)
    },
    increase(food, e) {
      this[INCREASE](food)
      this.$emit('increase', e.target)
    },
    ...mapMutations('shop', [SAVE_FOOD_DATA, INCREASE, DECREASE]),
  },
}
</script>

<style lang="scss" scoped>
  .food-list-container {
    padding-left: px2rem(160);
  }

  .title {
    padding: px2rem(20) px2rem(30) px2rem(20) px2rem(20);
    color: $primaryTextColor;
    font-size: px2rem(28);
  }

  .food-list {
    padding: 0 px2rem(30) 0 px2rem(20);
  }

  .food-item {
    position: relative;
    display: flex;
    padding-bottom: px2rem(20);

    img {
      width: px2rem(180);
      height: px2rem(180);
      margin-right: px2rem(20);
      border-radius: px2rem(12);
    }

    .content {
      position: relative;
      overflow: hidden;
      flex: 1;
    }

    .name {
      margin-bottom: px2rem(8);
      color: $primaryTextColor;
      font-size: px2rem(32);
      font-weight: 700;
      line-height: px2rem(42);
    }

    .desc {
      @include single-line-overflow();
      margin-bottom: px2rem(8);
      color: $secondaryTextColor;
      font-size: px2rem(24);
      line-height: px2rem(38);
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
      font-size: px2rem(36);
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
  }

  .elm-tag {
    padding: 0 px2rem(8);
    border-color: #ffc9c1;
  }

  .circle-button {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 999; // 注意这里需要设置z-index提高层级，否则在过渡的时候后面的li会形成单纯的图层
  }
</style>
