<template>
  <elm-drawer
    :title="restaurant.name"
    @close="close"
  >
    <div class="scroll-wrapper">
      <scroll-view ref="scroll">
        <p class="title">红包</p>
        <ul class="redpack-list">
          <li
            v-for="(item, index) in restaurant.redpack"
            :key="index"
            class="redpack-item"
            @click.stop="acquire"
          >
            <span class="money">{{ item.value }}</span>
            <div class="content">
              <p class="primary">超级会员店铺红包</p>
              <p class="secondary">{{ item.title }}, {{ date | format }}到期</p>
            </div>
            <span class="acquire">领取</span>
          </li>
        </ul>
        <p
          ref="activity"
          class="title"
        >优惠</p>
        <ul class="activity-list">
          <li
            v-for="activity in restaurant.activities"
            :key="activity.id"
            class="activity-item"
          >
            <elm-tag
              :color="activity.color"
              :style="{
                borderColor: activity.border,
              }"
            >{{ activity.iconName }}</elm-tag>
            <p class="desc">{{ activity.description }}</p>
          </li>
        </ul>
        <p class="title">商家服务</p>
        <ul class="support-list">
          <li
            v-for="support in restaurant.supports"
            :key="support.id"
            class="support-item"
          >
            <elm-tag :color="`#${support.color}`">{{ support.name }}</elm-tag>
            <p class="desc">{{ support.description }}</p>
          </li>
        </ul>
        <p
          ref="notice"
          class="title"
        >公告</p>
        <p class="notice">公告: {{ restaurant.notice }}</p>
      </scroll-view>
    </div>
  </elm-drawer>
</template>

<script>
import { mapState } from 'vuex'
import ScrollView from '@/components/scrollView/index.vue'

export default {
  name: 'ShopDrawer',
  filters: {
    format(val) {
      return `${val.getFullYear()}.${val.getMonth() + 1}.${val.getDate()}`
    },
  },
  components: {
    ScrollView,
  },
  data() {
    return {
      date: new Date(),
    }
  },
  computed: {
    ...mapState('shop', {
      restaurant: state => state.restaurant,
    }),
  },
  methods: {
    close() {
      this.$emit('close')
    },
    scrollToElement(type) {
      const el = this.$refs[type]
      this.$refs.scroll.scrollToElement(el)
    },
    acquire() {
      this.$notify({ type: 'primary', message: '功能正在开发中' })
    },
  },
}
</script>

<style lang="scss" scoped>
  .scroll-wrapper {
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
    height: 100%;
    padding: 0 px2rem(30);
    background-color: #fafafa;
  }

  .title {
    padding: px2rem(20) 0;
    color: $primaryTextColor;
    font-size: px2rem(28);
  }

  .redpack-list {
    overflow: hidden;

    .redpack-item {
      display: flex;
      align-items: center;
      padding: px2rem(30);
      margin-bottom: px2rem(20);
      color: #644f1b;
      background-image: linear-gradient(90deg, #ffefc4, #f3dda0);
      border-radius: px2rem(16);

      .money {
        margin-right: px2rem(30);
        font-size: px2rem(48);
        font-weight: 700;
      }

      .money::before {
        content: "¥";
        margin-right: px2rem(4);
        font-size: px2rem(28);
      }

      .content {
        flex: 1;
      }

      .primary {
        margin-bottom: px2rem(12);
        font-size: px2rem(28);

        &::before {
          @include bg("~@/assets/image/svip.png");
          content: "";
          display: inline-block;
          width: px2rem(28);
          height: px2rem(28);
          margin-right: px2rem(8);
        }
      }

      .secondary {
        font-size: px2rem(24);
      }

      .acquire {
        width: px2rem(100);
        color: #fff;
        font-size: px2rem(24);
        line-height: px2rem(50);
        text-align: center;
        background-color: #644f1b;
        border-radius: px2rem(24);
      }
    }
  }

  .activity-list,
  .support-list {
    overflow: hidden;

    .activity-item,
    .support-item {
      position: relative;
      padding-left: px2rem(100);
      margin-bottom: px2rem(12);

      .elm-tag {
        position: absolute;
        top: px2rem(4);
        left: 0;
        width: px2rem(72);
        text-align: center;
      }

      .desc {
        color: #999;
        font-size: px2rem(24);
        line-height: px2rem(38);
      }
    }
  }

  .notice {
    padding-bottom: px2rem(30);
    color: #999;
    font-size: px2rem(24);
    line-height: px2rem(36);
  }

  .elm-tag {
    padding: 0 px2rem(8);
    border-color: #ffc9c1;
  }
</style>
