<template>
  <div class="shop-search">
    <elm-header :to="`${$route.query.from || '/home'}`">
      <div class="search-container">
        <elm-search
          ref="search"
          v-model="search"
          :placeholder="hotWords.length ? hotWords[0].word : ''"
          @focus="focus"
          @clear="empty"
        />
      </div>
      <template name="right">
        <span
          class="search"
          @click.stop="searchShop"
        >搜索</span>
      </template>
    </elm-header>
    <!-- 历史搜索 -->
    <div v-if="historyWords.length">
      <h1 class="title">历史搜索<elm-icon
        name="trash"
        color="#999"
        :font-size="28"
        @click="toggle"
      /></h1>
      <ul class="word-list">
        <li
          v-for="(word, index) in historyWords"
          :key="index"
          class="word-item"
          @click.stop="searchHotWord(word)"
        >{{ word }}</li>
      </ul>
    </div>
    <!-- 搜索发现 -->
    <h1 class="title">搜索发现</h1>
    <ul class="word-list">
      <li
        v-for="({ word }, index) in hotWords"
        :key="index"
        class="word-item"
        @click.stop="searchHotWord(word)"
      >{{ word }}</li>
    </ul>
    <!-- 搜索列表 -->
    <search-list
      :search="search"
      @blur="blur"
      @click="searchShop"
    />
    <!-- 商店列表 -->
    <shop
      v-if="visible"
      ref="shop"
    />
    <elm-dialog
      v-if="dialog"
      title="确认删除全部历史记录吗?"
      @cancel="toggle"
      @ensure="clear"
    />
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
import transitionMixin from '@/mixins/transition'
import { UPDATE_TRANSITION } from '@/store/modules/global/mutation-types'
import { CLEAR_SHOPLIST_DATA } from '@/store/modules/shop/mutation-types'
import { transition, localStorageKey } from '@/config'
import { routes } from '@/config/router'
import { get, set, remove } from '@/utils/localStorage'
import ElmHeader from '@/components/header/index.vue'
import Shop from './shop.vue'
import SearchList from './searchList.vue'

export default {
  name: 'ShopSearch',
  components: {
    ElmHeader,
    SearchList,
    Shop,
  },
  mixins: [transitionMixin],
  beforeRouteLeave(to, from, next) {
    const { home, kind, shopOrder } = routes
    switch (to.name) {
      case home.name:
      case kind.name:
        this[CLEAR_SHOPLIST_DATA]()
        this[UPDATE_TRANSITION](transition.slideRight)
        break
      case shopOrder.name:
        from.meta.search = this.search
        // 记录离开时的scrollHeight
        // 这里跳转到商品详情页有两种情况，一种是点击searchList列表，一种是点击shopList列表
        // 这里只针对点击shopList列表的情况
        if (this.visible) from.meta.scrollHeight = this.$refs.shop.getScroll().getCurrent().y
        else from.meta.scrollHeight = 0
        this[UPDATE_TRANSITION](transition.slideLeft)
        break
    }
    next()
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const { shopOrder, shopComment, shopDetail } = routes
      const { scrollHeight } = to.meta
      switch (from.name) {
        case shopOrder.name:
        case shopComment.name:
        case shopDetail.name:
          vm.search = to.meta.search
          if (vm.search) {
            vm.visible = true
            vm.$nextTick(() => {
              vm.$refs.shop.getScroll().scrollTo({ y: scrollHeight })
            })
          }
          break
      }
    })
  },
  data() {
    return {
      search: '',
      historyWords: [],
      max: 10, // 最多存储10个历史搜索词
      hotWords: [],
      visible: false,
      dialog: false,
    }
  },
  mounted() {
    const data = get(localStorageKey.historySearch)
    if (data) this.historyWords = data
    this.getData()
  },
  methods: {
    getData() {
      axios.get('/api/shop/hot_words')
        .then(({ data }) => {
          if (data.code !== 0) {
            this.$notify({ type: 'danger', message: '获取数据失败' })
            return
          }
          this.hotWords = data.data
        })
    },
    searchHotWord(value) {
      this.search = value
      if (this.historyWords.includes(value)) return
      if (this.historyWords.length >= this.max) this.historyWords.pop()
      this.historyWords.unshift(value)
      set(localStorageKey.historySearch, this.historyWords)
    },
    searchShop() {
      if (this.search === '') this.search = this.hotWords.length ? this.hotWords[0].word : '汉堡'
      this.visible = true
    },
    toggle() {
      this.dialog = !this.dialog
    },
    clear() {
      this.dialog = false
      this.historyWords = []
      remove(localStorageKey.historySearch)
    },
    empty() {
      this.visible = false
    },
    focus() {
      this.visible = false
    },
    blur() {
      this.$refs.search.blur()
    },
    ...mapMutations('shop', [CLEAR_SHOPLIST_DATA]),
  },
}
</script>

<style lang="scss" scoped>
  .shop-search {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 100%;
    padding: px2rem($headerHeight) px2rem(30) 0 px2rem(30);
  }

  .search-container {
    box-sizing: border-box;
    overflow: hidden;
    flex: 1;
    height: px2rem(60);
    background-color: #fff;
    border-radius: px2rem(48);
  }

  .search {
    margin: 0 px2rem(20);
    color: #fff;
    font-size: px2rem(32);
    line-height: px2rem(60);
  }

  .title {
    padding: px2rem(30) 0;
    color: $primaryTextColor;
    font-size: px2rem(28);
    font-weight: 400;
    line-height: px2rem(36);
  }

  .word-list {
    display: flex;
    flex-wrap: wrap;

    .word-item {
      @include single-line-overflow();
      padding: px2rem(20);
      margin-right: px2rem(20);
      margin-bottom: px2rem(20);
      color: $primaryTextColor;
      font-size: px2rem(24);
      background-color: #fafafa;
      border-radius: px2rem(8);
    }
  }

  .elm-icon {
    @include expand();
    float: right;
  }
</style>
