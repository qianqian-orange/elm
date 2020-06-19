<template>
  <search
    v-model="search"
    placeholder="请输入小区、写字楼、学校名称等"
    :top="top"
    :data-source="result"
  >
    <list
      ref="list"
      :data-source="result"
      :probe-type="1"
      :search="search"
      :highlight="true"
      :loading="loading"
      @loadmore="loadmore"
      @ensure="ensure"
    />
  </search>
</template>

<script>
import axios from 'axios'
import Search from '@/components/search/index.vue'
import List from './list.vue'
import { Notify } from '@/ui'
import { AmapKey } from '@/config'
import variale from '@/scss/var.scss'

export default {
  name: 'AddressSearchList',
  components: {
    Search,
    List,
  },
  props: {
    adcode: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      search: '',
      result: [],
      pageSize: 20,
      currentPage: 1,
      loading: false,
      top: +variale.headerHeight,
    }
  },
  watch: {
    search(val) {
      this.$refs.list.scrollTo(0)
      this.currentPage = 1
      if (val === '') {
        this.result = []
        return
      }
      this.loading = true
      this.getPois()
        .then((data) => {
          if (this.search === '') {
            this.result = []
            return
          }
          this.result = data
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
  methods: {
    getPois() {
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
            Notify({ type: 'danger', message: '获取数据失败' })
            return []
          }
          this.currentPage += 1
          return data.pois.map((poi) => {
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
        })
        .finally(() => {
          this.loading = false
        })
    },
    loadmore() {
      this.getPois()
        .then((data) => {
          this.result.push(...data)
        })
    },
    ensure(poi) {
      this.$emit('ensure', poi)
    },
  },
}
</script>
