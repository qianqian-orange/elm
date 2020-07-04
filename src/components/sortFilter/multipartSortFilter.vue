<template>
  <div class="multipart-sort-filter-container">
    <scroll-view>
      <p class="title">商家服务</p>
      <ul class="list">
        <li
          v-for="{ id, name, imagePath } in supports"
          :key="id"
          class="item"
          :class="supportIds.includes(id) ? 'active' : ''"
          @click.stop="multipleSelect('supportIds', id)"
        >
          <img
            :src="imagePath"
            alt="logo"
          >{{ name }}</li>
      </ul>
      <p class="title">优惠活动</p>
      <ul class="list">
        <li
          v-for="{ id, name } in activities"
          :key="id"
          class="item"
          :class="activityIds.includes(id) ? 'active' : ''"
          @click.stop="multipleSelect('activityIds', id)"
        >{{ name }}</li>
      </ul>
      <p class="title">人均消费</p>
      <ul class="list">
        <li
          v-for="{ id, description } in averageCosts"
          :key="id"
          class="item"
          :class="averageCostId === id ? 'active' : ''"
          @click.stop="singleSelect(id)"
        >{{ description }}</li>
      </ul>
      <div class="block" />
    </scroll-view>
    <div class="btn">
      <div
        class="clear"
        @click.stop="clear"
      >清空</div>
      <div
        class="ensure"
        @click.stop="ensure"
      >确定</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ScrollView from '@/components/scrollView/index.vue'

export default {
  name: 'MultipartSortFilter',
  components: {
    ScrollView,
  },
  props: {
    activityIds: {
      type: Array,
      required: true,
    },
    supportIds: {
      type: Array,
      required: true,
    },
    averageCostId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState('shop', {
      supports: state => state.filter.supports,
      activities: state => state.filter.activities,
      averageCosts: state => state.filter.averageCosts,
    }),
  },
  methods: {
    multipleSelect(key, id) {
      this.$emit('multiple-select', {
        key,
        id,
      })
    },
    singleSelect(id) {
      this.$emit('single-select', id)
    },
    clear() {
      this.$emit('clear')
    },
    ensure() {
      this.$emit('ensure', {
        activityIds: this.activities,
        supportIds: this.supportIds,
        averageCostId: this.averageCostId,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .multipart-sort-filter-container {
    position: relative;
    overflow: hidden;
    height: 70%;
    padding: 0 px2rem(30);
    background-color: #fff;
  }

  .title {
    margin-bottom: px2rem(30);
    color: #999;
    font-size: px2rem(28);
    font-weight: 200;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: px2rem(30);

    img {
      width: px2rem(28);
      height: px2rem(28);
      padding-bottom: px2rem(8);
      margin-right: px2rem(8);
      vertical-align: middle;
      object-fit: cover;
    }
  }

  .item {
    flex-basis: 32%;
    height: px2rem(80);
    margin-bottom: px2rem(12);
    color: $primaryTextColor;
    font-size: px2rem(28);
    line-height: px2rem(80);
    text-align: center;
    background-color: #fafafa;
    border-radius: px2rem(8);

    &.active {
      color: $themeColor;
      background-color: #edf5ff;
    }
  }

  .block {
    height: px2rem(90);
  }

  .btn {
    @include border-top-1px();
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: px2rem(90);
  }

  .clear,
  .ensure {
    flex: 1;
    height: 100%;
    font-size: px2rem(28);
    line-height: px2rem(90);
    text-align: center;
  }

  .clear {
    color: #999;
  }

  .ensure {
    color: #fff;
    background-color: #00d762;
  }
</style>
