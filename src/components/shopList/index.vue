<template>
  <list-scroll-view
    ref="list"
    :probe-type="1"
    :data-source="shopList"
    :loading="loading"
    :finish="finish"
    @loadmore="getData"
  >
    <ul>
      <shop-card
        v-for="shop in shopList"
        :key="shop.id"
        :shop="shop"
        :extra="extra"
        @expand="expand"
        @hate="hate"
      />
    </ul>
  </list-scroll-view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import {
  SAVE_SHOPLIST_DATA,
  CLEAR_SHOPLIST_DATA,
  DECREASE_SHOPLIST_DATA,
} from '@/store/modules/shop/mutation-types'
import { GET_SHOPLIST_DATA } from '@/store/modules/shop/action-types'
import ListScrollView from '@/components/listScrollView/index.vue'
import ShopCard from '@/components/shopCard/index.vue'

export default {
  name: 'ShopList',
  components: {
    ListScrollView,
    ShopCard,
  },
  props: {
    init: {
      type: Boolean,
      default: true,
    },
    extra: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapState('shop', {
      shopList: state => state.shopList.data,
      finish: state => state.shopList.finish,
    }),
  },
  mounted() {
    if (!this.init || this.shopList.length) return
    this.getData()
  },
  methods: {
    hate(id) {
      const index = this.shopList.findIndex(shop => shop.id === id)
      if (index === -1) return
      this[DECREASE_SHOPLIST_DATA](index)
      this.$refs.list.reset()
    },
    getData() {
      this.loading = true
      return this[GET_SHOPLIST_DATA]()
        .then(() => {
          this.loading = false
        })
    },
    expand() {
      this.$refs.list.reset()
    },
    search() {
      this[CLEAR_SHOPLIST_DATA]()
      this.getData()
    },
    computedHeight() {
      this.$refs.list.computedHeight()
    },
    reset() {
      this.$refs.list.reset()
    },
    getScroll() {
      return this.$refs.list.getScroll()
    },
    ...mapActions('shop', [GET_SHOPLIST_DATA]),
    ...mapMutations('shop', [SAVE_SHOPLIST_DATA, CLEAR_SHOPLIST_DATA, DECREASE_SHOPLIST_DATA]),
  },
}
</script>
