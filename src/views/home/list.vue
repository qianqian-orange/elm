<template>
  <div>
    <ul class="shop-list">
      <shop-card
        v-for="shop in shopList"
        :key="shop.id"
        :shop="shop"
      />
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import ShopCard from './card'

export default {
  name: 'ShopList',
  components: {
    ShopCard,
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
    getData() {
      this.loading = true
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
        const types = ['png', 'jpg']
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
          let ext = imagePath.substr(-3)
          if (!types.includes(ext.toLowerCase())) ext = imagePath.substr(-4)
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
            imagePath: `https://cube.elemecdn.com/${imagePath[0]}/${imagePath[1]}${imagePath[2]}/${imagePath.substr(3)}.${ext}?x-oss-process=image/resize,m_lfit,w_160,h_160/quality,q_90/format,webp`,
          }
        })
        this.shopList.push(...result)
        this.$emit('reset')
      }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>
