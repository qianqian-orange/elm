<template>
  <div class="address-search">
    <elm-header>
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
        @ensure="jump"
      />
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
import transitionMixin from '@/mixins/transition'
import addressMixin from './mixin'
import { UPDATE_LOCATION, UPDATE_TRANSITION } from '@/store/modules/global/mutation-types'
import { get } from '@/utils/sessionStorage'
import { AmapKey, sessionStorageKey, transition } from '@/config'
import { routes } from '@/config/router'
import ElmHeader from '@/components/header/index.vue'
import List from './list.vue'

export default {
  name: 'AddressSearch',
  components: {
    ElmHeader,
    List,
  },
  mixins: [addressMixin, transitionMixin],
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
      this.$refs.list.scrollTo({ y: 0 })
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
  beforeRouteLeave(to, from, next) {
    const { address, city } = routes
    switch (to.name) {
      case address.name:
        this[UPDATE_TRANSITION](transition.slideRight)
        break
      case city.name:
        this[UPDATE_TRANSITION](transition.slideLeft)
        break
    }
    next()
  },
  mounted() {
    const data = get(sessionStorageKey.city)
    if (!data) {
      this.$notify({ type: 'danger', message: '数据异常' })
      this.$router.replace('/address')
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
    jump(poi) {
      this.ensure(poi)
      this.$router.push('/home')
    },
    ...mapMutations('global', [UPDATE_LOCATION]),
  },
}
</script>

<style lang="scss" scoped>
  .address-search {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-top: px2rem($headerHeight);
  }

  .scroll-wrapper {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .search-container {
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    flex: 1;
    height: px2rem(60);
    padding-left: px2rem(140);
    margin-right: px2rem(20);
    background-color: #fff;
    border-radius: px2rem(48);

    .link {
      @include border-right-1px();
      @include single-line-overflow();
      position: absolute;
      top: 50%;
      left: px2rem(30);
      transform: translateY(-50%);
      width: px2rem(90);
      padding-right: px2rem(20);
      font-size: px2rem(28);
    }
  }
</style>
