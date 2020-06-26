<template>
  <div class="city-search fullscreen-fixed-container">
    <elm-header to="/city">
      <div class="search-container">
        <elm-search
          ref="search"
          v-model="search"
          placeholder="输入城市名或首字母查询"
        />
      </div>
    </elm-header>
    <main
      class="scroll-wrapper"
      @touchstart="blur"
    >
      <list-scroll-view
        ref="list"
        :data-source="result"
        :finish="true"
      >
        <list
          :data-source="result"
          @locate="locate"
        />
      </list-scroll-view>
    </main>
  </div>
</template>

<script>
import ElmHeader from '@/components/header/index.vue'
import ListScrollView from '@/components/listScrollView/index.vue'
import List from './list.vue'
import cityMixin from './mixin'

export default {
  name: 'CitySearch',
  components: {
    ElmHeader,
    ListScrollView,
    List,
  },
  mixins: [cityMixin],
  props: {
    groupCity: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      search: '',
      result: [],
    }
  },
  watch: {
    search(val) {
      this.$refs.list.scrollTo(0)
      if (val === '') {
        this.result = []
        return
      }
      if (val.length === 1) {
        const char = val.toUpperCase()
        const code = char.charCodeAt()
        if (code >= 65 && code <= 90) {
          const group = this.groupCity.find(group => group.letter === char)
          if (!group) return
          this.result = group.cities
          return
        }
      }
      this.result = this.groupCity.reduce((result, group) => {
        return result.concat(group.cities.filter(city => city.name.includes(val)))
      }, [])
    },
  },
  methods: {
    blur() {
      // 当我们输入完成后我们点击结果列表，此时输入框还处于聚焦状态
      // 那么在手机端是会再次弹出输入键盘的，所以这里我们手动去除聚焦状态
      this.$refs.search.blur()
    },
  },
}
</script>

<style lang="scss" scoped>
  .city-search {
    padding-top: px2rem($headerHeight);
  }
  .scroll-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
