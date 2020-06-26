<template>
  <div class="address-search fullscreen-fixed-container">
    <elm-header to="/address">
      <div class="search-container">
        <router-link
          to="/city"
          class="link"
        >{{ city }}</router-link>
        <elm-search
          ref="search"
          v-model="search"
          placeholder="请输入小区、写字楼、学校名称等"
        />
      </div>
    </elm-header>
    <main
      class="scroll-wrapper"
      @touchstart="blur"
    >
      <list
        ref="list"
        :data-source="result"
        :probe-type="1"
        :search="search"
        :highlight="true"
        :loading="loading"
        :finish="finish"
        @loadmore="loadmore"
        @ensure="ensure"
      />
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
import addressMixin from './mixin'
import ElmHeader from '@/components/header/index.vue'
import List from './list.vue'
import { UPDATE_LOCATION } from '@/store/modules/global/mutation-types'
import { get } from '@/utils/sessionStorage'
import { AmapKey, sessionStorageKey } from '@/config'

export default {
  name: 'AddressSearch',
  components: {
    ElmHeader,
    List,
  },
  mixins: [addressMixin],
  data() {
    return {
      search: '',
      result: [],
      pageSize: 20,
      currentPage: 1,
      loading: false,
      finish: false,
      city: '',
      adcode: '',
    }
  },
  watch: {
    search(val) {
      this.finish = false
      this.currentPage = 1
      this.$refs.list.scrollTo(0)
      if (val === '') {
        this.result = []
        return
      }
      this.getData()
        .then((data) => {
          if (this.search === '') {
            this.result = []
            return
          }
          this.result = data
        })
    },
  },
  mounted() {
    const data = get(sessionStorageKey.city)
    if (!data) {
      this.$notify({ type: 'danger', message: '数据异常' })
      this.$router.replace('/adress')
      return
    }
    this.city = data.city
    this.adcode = data.adcode
  },
  methods: {
    blur() {
      this.$refs.search.blur()
    },
    getData() {
      if (this.finish) return
      this.loading = true
      return axios.get('https://restapi.amap.com/v3/place/text', {
        params: {
          key: AmapKey,
          keywords: this.search,
          city: this.adcode,
          citylimit: true,
          offset: this.pageSize,
          page: this.currentPage,
          extensions: 'all',
        },
      })
        .then(({ data }) => {
          if (data.status !== '1') {
            this.$notify({ type: 'danger', message: '获取数据失败' })
            return []
          }
          // 如果search已经是空，那么直接返回
          if (this.search === '') return
          this.currentPage += 1
          const result = data.pois.map((poi) => {
            const [longitude, latitude] = poi.location.split(',')
            return {
              id: poi.id,
              name: poi.name,
              city: poi.cityname,
              address: poi.address,
              adcode: poi.adcode,
              longitude,
              latitude,
            }
          })
          if (result.length === 0 || result.length < this.pageSize) this.finish = true
          return result
        })
        .finally(() => {
          this.loading = false
        })
    },
    loadmore() {
      this.getData()
        .then((data) => {
          this.result.push(...data)
        })
    },
    ...mapMutations('global', [UPDATE_LOCATION]),
  },
}
</script>

<style lang="scss" scoped>
  // 一部分样式在index.vue中也就写了，使用::v-deep 进行复用即可
  .address-search {
    padding-top: px2rem($headerHeight);
  }
  .scroll-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
