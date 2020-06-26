<template>
  <div class="filter-container">
    <div class="sort-filter-container">
      <div
        class="inside-sort-filter-head"
        :class="outsideSortFilterIndex === -1 ? 'active' : ''"
      >
        <span>{{ insideSortFilterHead }}</span>
        <elm-icon
          name="arrow"
          :rotate="180"
          :color="variable.themeColor"
        />
      </div>
      <ul class="ouside-sort-filter-list">
        <li
          v-for="{ id, name } in outsideSortFilter"
          :key="id"
          class="outside-sort-filter-item"
        >{{ name }}</li>
      </ul>
      <span class="filter">筛选<elm-icon
        name="filter"
        :font-size="32"
        :color="variable.primaryTextColor"
      /></span>
    </div>
    <ul class="outside-filter-list">
      <li
        v-for="{ id, name } in outsideFilters"
        :key="id"
        class="outside-filter-item"
        :class="activityTypes.includes(id) ? 'active' : ''"
      >
        <div>{{ name }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
// orderBy: 1
// activityTypes[]: 3
// activityTypes[]: 20
// activityTypes[]: 13
// supportIds[]: 11
// costFrom: 20
// costTo: 40
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
import { SAVE_FILTER_DATA } from '@/store/modules/shop/mutation-types'
import variable from '@/scss/var.scss'

export default {
  name: 'SortFilter',
  data() {
    return {
      variable,
    }
  },
  computed: {
    insideSortFilterHead() {
      return this.insideSortFilterIndex === -1 ? '' : this.insideSortFilter[this.insideSortFilterIndex].name
    },
    ...mapState('global', {
      location: state => state.location,
    }),
    ...mapState('shop', {
      initial: state => state.filter.initial,
      insideSortFilter: state => state.filter.insideSortFilter,
      outsideSortFilter: state => state.filter.outsideSortFilter,
      outsideFilters: state => state.filter.outsideFilters,
      insideSortFilterIndex: state => state.filter.insideSortFilterIndex,
      outsideSortFilterIndex: state => state.filter.outsideSortFilterIndex,
      activityTypes: state => state.filter.activityTypes,
    }),
  },
  mounted() {
    if (this.initial) return
    this.getData()
  },
  methods: {
    getData() {
      // longitude=116.437356&latitude=23.242659
      return axios.get('/api/shop/sort', {
        params: {
          longitude: this.location.longitude || 116.437356,
          latitude: this.location.latitude || 23.242659,
        },
      }).then(({ data }) => {
        if (data.code !== 0) {
          this.$notify({ type: 'danger', message: '获取数据失败' })
          return
        }
        const { sortList } = data.data
        this[SAVE_FILTER_DATA]({
          insideSortFilter: sortList.insideSortFilter,
          outsideSortFilter: sortList.outsideSortFilter,
          outsideFilters: sortList.outsideFilters,
        })
        this.$emit('reset')
      })
    },
    ...mapMutations('shop', [SAVE_FILTER_DATA]),
  },
}
</script>

<style lang="scss" scoped>
  .filter-container {
    width: 100%;
    background-color: #fff;
  }
  .sort-filter-container {
    display: flex;
    width: 100%;
    height: px2rem(80);
    font-size: px2rem(28);
    line-height: px2rem(80);
    color: $primaryTextColor;
  }
  .inside-sort-filter-head {
    height: 100%;

    &.active {
      color: $themeColor;
    }
  }
  .ouside-sort-filter-list {
    flex: 1;
    overflow: hidden;

    .outside-sort-filter-item {
      float: left;
      padding: 0 px2rem(16);
      margin-left: px2rem(32);
    }
  }
  .outside-filter-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: px2rem(84);
    font-size: px2rem(24);
    color: $primaryTextColor;
  }
  .outside-filter-item {
    flex-basis: 24%;
    height: px2rem(60);
    text-align: center;
    line-height: px2rem(60);
    background-color: #f1f1f1;
    border-radius: px2rem(8);

    &.active {
      color: $themeColor;
      background-color: #e5f6ff;
    }
  }
  .elm-icon {
    vertical-align: bottom;
  }
</style>
