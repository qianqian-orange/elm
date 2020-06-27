<template>
  <div>
    <ul class="shop-list">
      <shop-card
        v-for="shop in shopList"
        :key="shop.id"
        :shop="shop"
        @expand="expand"
      />
    </ul>
    <elm-loading v-show="loading" />
    <elm-finish v-show="shopList.length && finish" />
  </div>
</template>

<script>
import axios from 'axios'
import ShopCard from './card'
import ElmFinish from '@/components/finish/index.vue'
import { resolveImageUrl } from '@/utils'

export default {
  name: 'ShopList',
  components: {
    ShopCard,
    ElmFinish,
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 8,
      shopList: [],
      loading: false,
      finish: false,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData(more = true) {
      if (this.loading || this.finish) return
      // 注意这里需要先设置loading为true再触发reset事件
      // 因为修改loading值,会添加一个重新渲染的回调函数，执行时机就是nextTick,
      // 而触发reset事件，reset的目的也是添加一个scroll重新reset的回调，执行时机也是nextTick
      // 所以需要先重新渲染再执行scroll的reset，这样获取的节点的高度才能最新的
      this.loading = true
      this.$emit('reset')
      return axios.get('/api/shop/recommend', {
        params: {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        },
      }).then(({ data }) => {
        if (data.code !== 0) {
          this.$notify({ type: 'danger', message: '获取数据失败' })
          return
        }
        const result = data.data.map((shop) => {
          const {
            id,
            name,
            rating,
            recentOrderNumDisplay,
            floatMinimumOrderAmount, // 最低起送价
            floatDeliveryFee, // 配送费 0 表示免费配送
            distance, // m km
            orderLeadTime, // 配送时间 分钟 xx小时xx分钟
            recommendReasons,
            supportTags,
            imagePath,
          } = shop.restaurant
          return {
            id,
            name,
            rating,
            recentOrderNumDisplay,
            floatMinimumOrderAmount,
            floatDeliveryFee,
            distance,
            orderLeadTime,
            recommendReasons,
            supportTags,
            imagePath: resolveImageUrl(imagePath),
          }
        })
        if (result.length === 0) {
          this.finish = true
          return
        }
        this.currentPage += 1
        if (more) this.shopList.push(...result)
        else this.shopList = result
      }).finally(() => {
        this.loading = false
        this.$emit('reset')
      })
    },
    expand() {
      this.$emit('expand')
    },
    search() {
      this.finish = false
      this.currentPage = 1
      this.loading = false
      return this.getData(false)
    },
  },
}
</script>
