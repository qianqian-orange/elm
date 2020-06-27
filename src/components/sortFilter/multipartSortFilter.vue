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
    <div class="border-1px border-top-1px btn">
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
import { mapState, mapMutations } from 'vuex'
import { UPDATE_FILTER_DATA } from '@/store/modules/shop/mutation-types'
import ScrollView from '@/components/scrollView/index.vue'

export default {
  name: 'MultipartSortFilter',
  components: {
    ScrollView,
  },
  data() {
    return {
      activityIds: [],
      supportIds: [],
      averageCostId: -1,
    }
  },
  computed: {
    ...mapState('shop', {
      filter: state => state.filter,
      supports: state => state.filter.supports,
      activities: state => state.filter.activities,
      averageCosts: state => state.filter.averageCosts,
    }),
  },
  mounted() {
    this.activityIds = [...this.filter.activityIds]
    this.supportIds = [...this.filter.supportIds]
    this.averageCostId = this.filter.averageCostId
  },
  methods: {
    multipleSelect(key, id) {
      const index = this[key].findIndex(item => item === id)
      if (index === -1) this[key].push(id)
      else this[key].splice(index, 1)
    },
    singleSelect(id) {
      this.averageCostId = this.averageCostId === id ? -1 : id
    },
    clear() {
      this[UPDATE_FILTER_DATA]({
        sortFilter: '',
        activityIds: [],
        supportIds: [],
        averageCostId: -1,
      })
      this.$emit('search')
    },
    ensure() {
      this[UPDATE_FILTER_DATA]({
        sortFilter: '',
        activityIds: this.activityIds,
        supportIds: this.supportIds,
        averageCostId: this.averageCostId,
      })
      this.$emit('search')
    },
    ...mapMutations('shop', [UPDATE_FILTER_DATA]),
  },
}
</script>

<style lang="scss" scoped>
  .multipart-sort-filter-container {
    position: relative;
    padding: 0 px2rem(30);
    height: 70%;
    overflow: hidden;
    background-color: #fff;
  }
  .title {
    margin-bottom: px2rem(30);
    font-size: px2rem(28);
    font-weight: 200;
    color: #999;
  }
  .list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
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
    font-size: px2rem(28);
    color: $primaryTextColor;
    text-align: center;
    line-height: px2rem(80);
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
    display: flex;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: px2rem(90);
  }
  .clear, .ensure {
    flex: 1;
    height: 100%;
    font-size: px2rem(28);
    text-align: center;
    line-height: px2rem(90);
  }
  .clear {
    color: #999;
  }
  .ensure {
    color: #fff;
    background-color: #00d762;
  }
</style>
