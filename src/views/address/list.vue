<template>
  <list-scroll-view
    ref="scroll"
    :loading="loading"
    :finish="finish"
    :data-source="dataSource"
    :probe-type="probeType"
    @loadmore="loadmore"
  >
    <ul class="poi-list">
      <li
        v-for="poi in dataSource"
        :key="poi.id"
        class="poi-item"
        @click="ensure(poi)"
      >
        <p
          v-if="!highlight"
          class="name"
        >{{ poi.name }}</p>
        <p
          v-else
          class="name"
          v-html="process(poi.name)"
        />
        <p class="address">{{ `${poi.city}${poi.address}` }}</p>
      </li>
    </ul>
  </list-scroll-view>
</template>

<script>
import ListScrollView from '@/components/listScrollView/index.vue'
import variable from '@/scss/var.scss'

export default {
  name: 'AddressList',
  components: {
    ListScrollView,
  },
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
    probeType: {
      type: Number,
      default: 0,
    },
    highlight: {
      type: Boolean,
      default: false,
    },
    search: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    finish: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    process(val) {
      const index = val.indexOf(this.search)
      return val.substring(0, index) + `<strong style="color:${variable.themeColor};">${this.search}</strong>` + val.substring(index + this.search.length)
    },
    ensure(poi) {
      this.$emit('ensure', poi)
    },
    scrollTo(offsetHeight) {
      this.$refs.scroll.scrollTo(offsetHeight)
    },
    loadmore() {
      this.$emit('loadmore')
    },
  },
}
</script>

<style lang="scss" scoped>
  .poi-list {
    padding-left: px2rem(30);

    .poi-item {
      width: 100%;
      height: px2rem(92);
      padding: px2rem(20) 0;

      .name {
        font-size: px2rem(28);
        line-height: px2rem(56);
        color: $primaryTextColor;
      }
      .address {
        font-size: px2rem(24);
        line-height: px2rem(36);
        color: $secondaryTextColor;

        @include single-line-overflow();
      }
    }
    .poi-item:not(:last-child) {
      @include border-bottom-1px();
    }
  }
</style>
