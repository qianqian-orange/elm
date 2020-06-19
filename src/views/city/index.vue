<template>
  <div class="city-container">
    <elm-header to="/address">
      <div class="search-container">
        <search
          v-model="search"
          placeholder="输入城市名或首字母查询"
          :top="top"
          :data-source="result"
        >
          <list-scroll-view
            ref="list"
            :data-source="result"
          >
            <list
              :data-source="result"
              @locate="locate"
            />
          </list-scroll-view>
        </search>
      </div>
    </elm-header>
    <div class="scroll-wrapper">
      <scroll-view ref="scroll">
        <!-- 当前定位城市 -->
        <p class="title">当前定位城市</p>
        <p class="content">{{ location.city }}</p>
        <!-- 热门城市 -->
        <p class="title">热门城市</p>
        <ul class="hot-city-list">
          <li
            v-for="{ id, name } in hotCity"
            :key="id"
            class="hot-city-item"
            @click="locate(name)"
          >{{ name }}</li>
        </ul>
        <!-- 城市分组 -->
        <div
          v-for="{ letter, cities } in groupCity"
          :key="letter"
        >
          <p
            ref="letters"
            class="title"
          >{{ letter }}</p>
          <list
            :data-source="cities"
            @locate="locate"
          />
        </div>
        <div
          v-show="loading"
          class="loading-container"
        >
          <elm-loading />
        </div>
      </scroll-view>
    </div>
    <letter-nav
      v-if="letters.length"
      :letters="letters"
      @transform="transform"
    />
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
import ElmHeader from '@/components/elmHeader/index.vue'
import ScrollView from '@/components/scrollView/index.vue'
import ListScrollView from '@/components/listScrollView/index.vue'
import Search from '@/components/search/index.vue'
import LetterNav from '@/components/letterNav/index.vue'
import { Notify } from '@/ui'
import List from './list.vue'
import { UPDATE_LOCATION } from '@/store/modules/global/mutation-types'
import { AmapKey } from '@/config'
import variale from '@/scss/var.scss'

export default {
  name: 'City',
  components: {
    ElmHeader,
    ScrollView,
    ListScrollView,
    LetterNav,
    Search,
    List,
  },
  data() {
    return {
      hotCity: [],
      groupCity: [],
      search: '',
      result: [],
      loading: false,
      top: +variale.headerHeight,
    }
  },
  computed: {
    letters() {
      return this.groupCity.map(group => group.letter)
    },
    ...mapState('global', {
      location: state => state.location,
    }),
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
  mounted() {
    this.loading = true
    this.getHotAndGroupCity()
      .then(({ data }) => {
        if (data.code !== 0) {
          Notify({ type: 'danger', message: '获取数据失败' })
          return
        }
        this.hotCity = data.data.hot_city.map(city => ({ id: city.city_id, name: city.city_name }))
        this.groupCity = data.data.city_nav.map(group => ({
          letter: group.idx,
          cities: group.cities.map(city => ({ id: city.city_id, name: city.city_name })),
        }))
        this.groupCity.sort((a, b) => a.letter < b.letter ? -1 : 1)
        this.reset()
      })
      .finally(() => {
        this.loading = false
        this.reset()
      })
  },
  methods: {
    reset() {
      this.$nextTick(() => {
        if (this.$refs.scroll) this.$refs.scroll.reset()
      })
    },
    getHotAndGroupCity() {
      return axios.get('/api/city/list')
    },
    transform(index) {
      this.$refs.scroll.scrollToElement(this.$refs.letters[index])
    },
    locate(city) {
      axios.get('https://restapi.amap.com/v3/geocode/geo', {
        params: {
          key: AmapKey,
          address: city,
        },
      }).then(({ data }) => {
        if (data.status !== '1') {
          Notify({ type: 'danger', message: '获取数据失败' })
          return
        }
        const { adcode, location } = data.geocodes[0]
        const [longitude, latitude] = location.split(',')
        this[UPDATE_LOCATION]({
          city,
          adcode,
          longitude,
          latitude,
        })
        this.$router.push('/address')
      })
    },
    ...mapMutations('global', [UPDATE_LOCATION]),
  },
}
</script>

<style lang="scss" scoped>
  .city-container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-top: px2rem($headerHeight);
    overflow: hidden;
    background-color: #fff;
  }
  .scroll-wrapper {
    width: 100%;
    height: 100%;
  }
  .search-container {
    box-sizing: border-box;
    overflow: hidden;
    border-radius: px2rem(48);
    flex: 1;
    height: px2rem(60);
    margin-right: px2rem(20);
  }
  .title {
    box-sizing: border-box;
    width: 100%;
    height: px2rem(72);
    padding-left: px2rem(30);
    font-size: px2rem(28);
    line-height: px2rem(72);
    color: $secondaryTextColor;
    background-color: #f1f1f1;

    @include border-bottom-1px();
  }
  .content {
    box-sizing: border-box;
    width: 100%;
    height: px2rem(84);
    padding-left: px2rem(30);
    font-size: px2rem(28);
    line-height: px2rem(84);
    color: $themeColor;
  }
  .hot-city-list {
    display: flex;
    flex-wrap: wrap;

    .hot-city-item {
      box-sizing: border-box;
      width: 25%;
      height: px2rem(84);
      border-bottom: 1px solid $hairlineColor;
      border-right: 1px solid $hairlineColor;
      font-size: px2rem(28);
      text-align: center;
      line-height: px2rem(84);
      color: $primaryTextColor;
    }
    .hot-city-item:nth-child(4n) {
      border-right: none;
    }
  }
  .loading-container {
    padding-top: px2rem(30);
  }
</style>
