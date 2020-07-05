<template>
  <div>
    <ul>
      <shop-card
        v-for="shop in shopList"
        :key="shop.id"
        :shop="shop"
        @expand="expand"
        @hate="hate"
      />
    </ul>
    <elm-loading v-show="loading" />
    <elm-finish v-show="shopList.length && finish" />
  </div>
</template>

<script>
import axios from 'axios'
import ShopCard from '@/components/shopCard/index.vue'
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
    hate(id) {
      const index = this.shopList.findIndex(shop => shop.id === id)
      if (index === -1) return
      this.shopList.splice(index, 1)
      this.$emit('hate')
    },
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
        const result = data.data.map(({ restaurant, foods }) => {
          return {
            id: restaurant.id,
            name: restaurant.name,
            rating: restaurant.rating,
            recentOrderNum: restaurant.recent_order_num,
            floatMinimumOrderAmount: restaurant.float_minimum_order_amount,
            floatDeliveryFee: restaurant.float_delivery_fee,
            distance: restaurant.distance,
            orderLeadTime: restaurant.order_lead_time,
            recommendReasons: restaurant.recommend_reasons.map(({ reason }) => reason),
            supportTags: restaurant.support_tags.map(item => ({
              color: item.color,
              border: item.border,
              text: item.text,
              background: item.background ? {
                rgbFrom: item.background.rgb_from,
                rgbTo: item.background.rgb_to,
              } : null,
            })),
            imagePath: resolveImageUrl(restaurant.image_path),
            activities: restaurant.activities.map(item => ({
              description: item.description,
              iconColor: item.icon_color,
              iconName: item.icon_name,
              id: item.id,
            })),
            foods: foods.map((food) => ({
              id: food.id,
              name: food.name,
              price: food.price,
              imagePath: resolveImageUrl(food.image_path),
            })),
          }
        })
        if (result.length === 0 || result.length < this.pageSize) this.finish = true
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
