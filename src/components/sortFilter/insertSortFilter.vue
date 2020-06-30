<template>
  <div style="position: relative;">
    <ul class="insert-sort-filter-list">
      <li
        v-for="({ id, name }, index) in insideSortFilter"
        :key="id"
        class="insert-sort-filter-item"
        :class="outsideSortFilterIndex === -1 && insideSortFilterIndex === index ? 'active' : ''"
        @click.stop="selectInsertSortFilter(index)"
      >{{ name }}</li>
    </ul>
    <elm-icon
      v-if="outsideSortFilterIndex === -1"
      name="success"
      :color="varibale.themeColor"
      :style="{
        top: px2rem(insideSortFilterIndex * height),
      }"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { UPDATE_FILTER_DATA } from '@/store/modules/shop/mutation-types'
import px2rem from '@/utils/px2rem'
import varibale from '@/scss/var.scss'

export default {
  name: 'InsertSortFilter',
  data() {
    return {
      px2rem,
      height: 68,
    }
  },
  computed: {
    varibale() {
      return varibale
    },
    ...mapState('shop', {
      insideSortFilter: state => state.filter.insideSortFilter,
      insideSortFilterIndex: state => state.filter.insideSortFilterIndex,
      outsideSortFilterIndex: state => state.filter.outsideSortFilterIndex,
    }),
  },
  methods: {
    selectInsertSortFilter(index) {
      this[UPDATE_FILTER_DATA]({
        sortFilter: '',
        insideSortFilterIndex: index,
        outsideSortFilterIndex: -1,
      })
      this.$emit('search')
    },
    ...mapMutations('shop', [UPDATE_FILTER_DATA]),
  },
}
</script>

<style lang="scss" scoped>
  .insert-sort-filter-list {
    padding: 0 px2rem(30) px2rem(20);
    background-color: #fff;
  }

  .insert-sort-filter-item {
    width: 100%;
    height: px2rem(68);
    color: $primaryTextColor;
    font-size: px2rem(28);
    line-height: px2rem(68);

    &.active {
      color: $themeColor;
    }
  }

  .elm-icon {
    position: absolute;
    right: px2rem(30);
    height: px2rem(68);
    line-height: px2rem(68);
  }
</style>
