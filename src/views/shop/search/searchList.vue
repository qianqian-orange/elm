<template>
  <div
    v-show="visible"
    class="scroll-wrapper"
    @touchstart="blur"
  >
    <list-scroll-view
      ref="list"
      :data-source="restaurants.concat(words)"
      :loading="loading"
      :finish="!loading"
    >
      <ul>
        <router-link
          v-for="item in restaurants"
          :key="item.id"
          to="/shop/E10511953419827396488/order?from=/shop/search"
        >
          <li
            class="search-item"
          >
            <img
              :src="item.imagePath"
              alt="shop"
            >
            <div class="content">
              <span
                class="name"
                v-html="process(item.name)"
              />
              <elm-tag
                v-for="(tag, index) in item.tags"
                :key="index"
                color="#fff"
                :font-size="20"
                :style="{
                  backgroundColor: `#${tag.bgColor}`,
                  borderWidth: 0,
                }"
              >{{ tag.name }}</elm-tag>
              <span class="rating">评价{{ item.rating }}</span>
            </div>
          </li>
        </router-link>
      </ul>
      <ul>
        <li
          v-for="(item, index) in words"
          :key="index"
          class="search-item"
          @click.stop="searchShop"
        >
          <elm-icon
            name="search"
            color="#999"
            :font-size="36"
          />
          <span
            class="word"
            v-html="process(item)"
          />
        </li>
      </ul>
    </list-scroll-view>
  </div>
</template>

<script>
import axios from 'axios'
import { resolveImageUrl } from '@/utils'
import variable from '@/scss/var.scss'
import ListScrollView from '@/components/listScrollView/index.vue'

export default {
  name: 'SearchList',
  components: {
    ListScrollView,
  },
  props: {
    search: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      restaurants: [],
      words: [],
    }
  },
  computed: {
    visible() {
      return this.loading || this.restaurants.length || this.words.length
    },
  },
  watch: {
    search(val) {
      this.$refs.list.scrollTo({ y: 0 })
      if (val === '') {
        this.restaurants = []
        this.words = []
        return
      }
      this.getData()
    },
    visible(val) {
      // 由于使用了v-show，当visble为false时节点的diplay为none, 导致list-scroll-view获取不到
      // 正确的parentHeight, 会影响list-scroll-view的布局和loadmore的逻辑
      if (val) this.$refs.list.computedHeight()
    },
  },
  methods: {
    getData() {
      this.loading = true
      return axios.get('/api/shop/search')
        .then(({ data }) => {
          if (data.code !== 0) {
            this.$notify({ type: 'danger', message: '请求数据失败' })
            return
          }
          if (this.search === '') return
          const { restaurants, words } = data.data
          this.restaurants = restaurants.map(item => ({
            id: item.id,
            name: item.name,
            rating: item.rating,
            tags: item.tags.map(tag => ({
              name: tag.name,
              bgColor: tag.name_color,
            })),
            imagePath: resolveImageUrl(item.image_path),
          }))
          this.words = words
        })
        .finally(() => {
          this.loading = false
        })
    },
    process(val) {
      if (!val) return ''
      const key = '汉堡'
      const index = val.indexOf(key)
      return val.substring(0, index) + `<strong style="color:${variable.themeColor};">${key}</strong>` + val.substring(index + key.length)
    },
    blur() {
      this.$emit('blur')
    },
    searchShop() {
      this.$emit('click')
    },
  },
}
</script>

<style lang="scss" scoped>
  .scroll-wrapper {
    box-sizing: border-box;
    position: absolute;
    top: px2rem($headerHeight);
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    overflow: hidden;
    padding: 0 px2rem(30);
    background-color: #fff;
  }

  .search-item {
    display: flex;
    align-items: center;
    width: 100%;
    height: px2rem(100);

    img {
      width: px2rem(48);
      height: px2rem(48);
      margin-right: px2rem(30);
      object-fit: cover;
    }

    .content {
      @include border-bottom-1px();
      display: flex;
      flex: 1;
      align-items: center;
      height: 100%;

      .name {
        @include single-line-overflow();
        max-width: px2rem(360);
        color: $primaryTextColor;
        font-size: px2rem(28);
      }

      .rating {
        flex: 1;
        color: #999;
        font-size: px2rem(24);
        text-align: right;
      }
    }

    .word {
      @include border-bottom-1px();
      @include single-line-overflow();
      box-sizing: border-box;
      width: 100%;
      height: px2rem(100);
      margin-left: px2rem(20);
      color: $primaryTextColor;
      font-size: px2rem(28);
      line-height: px2rem(100);
    }
  }

  .elm-tag {
    padding: px2rem(4);
    margin-left: px2rem(12);
  }
</style>
