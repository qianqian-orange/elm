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
    <ul
      v-if="!hidden"
      class="outside-filter-list"
    >
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
        :inside-sort-filter-index="insideSortFilterIndex"
        :outside-sort-filter-index="outsideSortFilterIndex"
        @select-insert-sort-filter="selectInsertSortFilter"
      />
      <multipart-sort-filter
        v-if="sortFilter === sortFilters.multipart"
        :activity-ids="activityIds"
        :support-ids="supportIds"
        :average-cost-id="averageCostId"
        @clear="clear"
        @ensure="ensure"
        @multiple-select="multipleSelect"
        @single-select="singleSelect"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import InsertSortFilter from './insertSortFilter.vue'
import MultipartSortFilter from './multipartSortFilter.vue'
import { GET_FILTER_DATA } from '@/store/modules/shop/action-types'
import {
  SAVE_FILTER_DATA,
} from '@/store/modules/shop/mutation-types'
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
  props: {
    // 是否隐藏outside-filter
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      sortFilter: '',
      outsideSortFilterIndex: -1,
      insideSortFilterIndex: -1,
      activityIds: [],
      supportIds: [],
      averageCostId: -1,
    }
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
    ...mapState('shop', {
      filter: state => state.filter,
      insideSortFilter: state => state.filter.insideSortFilter,
      outsideSortFilter: state => state.filter.outsideSortFilter,
      outsideFilters: state => state.filter.outsideFilters,
    }),
  },
  mounted() {
    if (this.filter.initial) {
      this.insideSortFilterIndex = 0
      return
    }
    this.getData()
  },
  methods: {
    getData() {
      this[GET_FILTER_DATA]()
        .then(() => { this.insideSortFilterIndex = 0 })
        .catch(() => { this.$notify({ type: 'danger', message: '获取数据失败' }) })
    },
    toggle(sortFilter) {
      this.sortFilter = this.sortFilter === sortFilter ? '' : sortFilter
      this.$emit('top')
    },
    selectOutsideSortFilter(index) {
      this.sortFilter = ''
      this.insideSortFilterIndex = 0
      this.outsideSortFilterIndex = index
      this.search()
    },
    selectOutsideFilter(id) {
      const index = this.activityIds.findIndex(item => item.id === id)
      if (index === -1) this.activityIds.push(id)
      else this.activityIds.splice(index, 1)
      this.search()
    },
    selectInsertSortFilter(index) {
      this.sortFilter = ''
      this.outsideSortFilterIndex = -1
      this.insideSortFilterIndex = index
      this.search()
    },
    multipleSelect({ key, id }) {
      const index = this[key].findIndex(item => item === id)
      if (index === -1) this[key].push(id)
      else this[key].splice(index, 1)
    },
    singleSelect(id) {
      this.averageCostId = this.averageCostId === id ? -1 : id
    },
    clear() {
      this.sortFilter = ''
      this.activityIds = []
      this.supportIds = []
      this.averageCostId = -1
      this.search()
    },
    ensure({ activityIds, supportIds, averageCostId }) {
      this.sortFilter = ''
      this.activities = activityIds
      this.supportIds = supportIds
      this.averageCostId = averageCostId
      this.search()
    },
    search() {
      this.$emit('search')
    },
    ...mapActions('shop', [GET_FILTER_DATA]),
    ...mapMutations('shop', [SAVE_FILTER_DATA]),
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
