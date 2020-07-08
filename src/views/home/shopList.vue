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
import { mapState, mapActions, mapMutations } from 'vuex'
import { GET_SHOPLIST_DATA } from '@/store/modules/home/action-types'
import { UPDATE_SHOPLIST_DATA } from '@/store/modules/home/mutation-types'
import ShopCard from '@/components/shopCard/index.vue'
import ElmFinish from '@/components/finish/index.vue'

export default {
  name: 'ShopList',
  components: {
    ShopCard,
    ElmFinish,
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapState('home', {
      shopList: state => state.shopList.data,
      finish: state => state.shopList.finish,
    }),
  },
  mounted() {
    if (this.shopList.length) return
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
      if (this.loading) return
      // 注意这里需要先设置loading为true再触发reset事件
      // 因为修改loading值,会添加一个重新渲染的回调函数，执行时机就是nextTick,
      // 而触发reset事件，reset的目的也是添加一个scroll重新reset的回调，执行时机也是nextTick
      // 所以需要先重新渲染再执行scroll的reset，这样获取的节点的高度才是最新的
      this.loading = true
      this.$emit('reset')
      return this[GET_SHOPLIST_DATA](more)
        .then(() => {
          this.loading = false
          this.$emit('reset')
        })
        .catch(() => { this.$notify({ type: 'danger', message: '获取数据失败' }) })
    },
    expand() {
      this.$emit('expand')
    },
    search() {
      this.loading = false
      this[UPDATE_SHOPLIST_DATA]()
      return this.getData(false)
    },
    ...mapActions('home', [GET_SHOPLIST_DATA]),
    ...mapMutations('home', [UPDATE_SHOPLIST_DATA]),
  },
}
</script>
