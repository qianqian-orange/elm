<template>
  <div class="filter-container">
    <div class="sort-filter-container">
      <div
        class="inside-sort-filter-head"
        :class="outsideSortFilterIndex === -1 ? 'active' : ''"
        @click.stop="toggle(sortFilters.insert)"
      >
        <span>{{ insideSortFilterHead }}</span>
        <elm-icon
          name="arrow"
          :rotate="sortFilter === sortFilters.insert ? 0 : 180"
          :color="outsideSortFilterIndex === -1 ? variable.themeColor : variable.primaryTextColor"
        />
      </div>
      <ul class="ouside-sort-filter-list">
        <li
          v-for="({ id, name }, index) in outsideSortFilter"
          :key="id"
          class="outside-sort-filter-item"
          :class="index === outsideSortFilterIndex ? 'active' : ''"
          @click.stop="selectOutsideSortFilter(index)"
        >{{ name }}</li>
      </ul>
      <span
        class="filter"
        :class="filterActive ? 'active' : ''"
        @click.stop="toggle(sortFilters.multipart)"
      >筛选<elm-icon
        name="filter"
        :font-size="32"
        :color="filterActive ? variable.themeColor : variable.primaryTextColor"
      /></span>
    </div>
    <ul class="outside-filter-list">
      <li
        v-for="{ id, name } in outsideFilters"
        :key="id"
        class="outside-filter-item"
        :class="activityIds.includes(id) ? 'active' : ''"
        @click.stop="selectOutsideFilter(id)"
      >
        <div>{{ name }}</div>
      </li>
    </ul>
    <div
      v-if="sortFilter !== ''"
      class="mask"
      @click.stop.self="toggle('')"
    >
      <insert-sort-filter
        v-if="sortFilter === sortFilters.insert"
        @search="search"
      />
      <multipart-sort-filter
        v-if="sortFilter === sortFilters.multipart"
        @search="search"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
import InsertSortFilter from './insertSortFilter.vue'
import MultipartSortFilter from './multipartSortFilter.vue'
import {
  SAVE_FILTER_DATA,
  UPDATE_FILTER_DATA,
} from '@/store/modules/shop/mutation-types'
import { resolveImageUrl } from '@/utils'
import variable from '@/scss/var.scss'

const sortFilters = {
  insert: 'insertSortFilter',
  multipart: 'multipartSortFilter',
}

export default {
  name: 'SortFilter',
  components: {
    InsertSortFilter,
    MultipartSortFilter,
  },
  computed: {
    variable() {
      return variable
    },
    sortFilters() {
      return sortFilters
    },
    insideSortFilterHead() {
      return this.insideSortFilterIndex === -1 ? '' : this.insideSortFilter[this.insideSortFilterIndex].name
    },
    filterActive() {
      return this.activityIds.length || this.supportIds.length || this.averageCostId !== -1
    },
    ...mapState('global', {
      location: state => state.location,
    }),
    ...mapState('shop', {
      filter: state => state.filter,
      sortFilter: state => state.filter.sortFilter,
      insideSortFilter: state => state.filter.insideSortFilter,
      outsideSortFilter: state => state.filter.outsideSortFilter,
      outsideFilters: state => state.filter.outsideFilters,
      insideSortFilterIndex: state => state.filter.insideSortFilterIndex,
      outsideSortFilterIndex: state => state.filter.outsideSortFilterIndex,
      activityIds: state => state.filter.activityIds,
      supportIds: state => state.filter.supportIds,
      averageCostId: state => state.filter.averageCostId,
    }),
  },
  mounted() {
    if (this.filter.initial) return
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
        const { sortList, filterList } = data.data
        this[SAVE_FILTER_DATA]({
          insideSortFilter: sortList.insideSortFilter,
          outsideSortFilter: sortList.outsideSortFilter,
          outsideFilters: sortList.outsideFilters,
          supports: filterList.supports.map(support => ({
            id: support.id,
            name: support.name,
            imagePath: resolveImageUrl(support.iconHash),
          })),
          activities: filterList.activityTypes,
          averageCosts: filterList.averageCosts,
        })
        this.$emit('reset')
      })
    },
    toggle(sortFilter) {
      if (this.sortFilter === sortFilter) this[UPDATE_FILTER_DATA]({ sortFilter: '' })
      else this[UPDATE_FILTER_DATA]({ sortFilter })
      this.$emit('top')
    },
    selectOutsideSortFilter(index) {
      this[UPDATE_FILTER_DATA]({
        sortFilter: '',
        insideSortFilterIndex: 0,
        outsideSortFilterIndex: index,
      })
      this.search()
    },
    selectOutsideFilter(id) {
      const activityIds = [...this.activityIds]
      const index = this.activityIds.findIndex(item => item === id)
      if (index === -1) activityIds.push(id)
      else activityIds.splice(index, 1)
      this[UPDATE_FILTER_DATA]({ activityIds })
      this.$emit('search')
    },
    search() {
      this.$emit('search')
    },
    ...mapMutations('shop', [SAVE_FILTER_DATA, UPDATE_FILTER_DATA]),
  },
}
</script>

<style lang="scss" scoped>
  .filter-container {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    padding: 0 px2rem(30);
    background-color: #fff;
  }

  .sort-filter-container {
    display: flex;
    width: 100%;
    height: px2rem(80);
    color: $primaryTextColor;
    font-size: px2rem(28);
    line-height: px2rem(80);
  }

  .inside-sort-filter-head {
    height: 100%;

    &.active {
      color: $themeColor;
    }
  }

  .ouside-sort-filter-list {
    overflow: hidden;
    flex: 1;

    .outside-sort-filter-item {
      float: left;
      padding: 0 px2rem(16);
      margin-left: px2rem(32);

      &.active {
        color: $themeColor;
      }
    }
  }

  .filter {
    &.active {
      color: $themeColor;
    }

    .elm-icon {
      vertical-align: bottom;
    }
  }

  .outside-filter-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: px2rem(84);
    color: $primaryTextColor;
    font-size: px2rem(24);
  }

  .outside-filter-item {
    flex-basis: 24%;
    height: px2rem(60);
    line-height: px2rem(60);
    text-align: center;
    background-color: #f1f1f1;
    border-radius: px2rem(8);

    &.active {
      color: $themeColor;
      background-color: #e5f6ff;
    }
  }

  .mask {
    position: absolute;
    top: px2rem(80);
    left: 0;
    z-index: 999;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .3);
  }
</style>
