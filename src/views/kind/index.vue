<template>
  <div class="kind-container">
    <elm-header to="/home">
      <div class="search-container">
        <router-link :to="`/shop/search?from=${$route.path}`">
          <p class="placeholder">
            <span class="icon">
              <elm-icon
                name="search"
                color="#999"
                :font-size="36"
              />
            </span>搜索商家、商品名称</p>
        </router-link>
      </div>
    </elm-header>
    <outside-category
      :data-source="category.outside"
      @search="search"
      @expand="toggle"
    />
    <sort-filter
      @search="search"
    />
    <div class="scroll-wrapper">
      <shop-list ref="list" />
    </div>
    <inside-category
      v-if="visible"
      :data-source="category.inside"
      @toggle="toggle"
      @search="search"
    />
  </div>
</template>

<script>
import axios from 'axios'
import { routes } from '@/config/router'
import transitionMixin from '@/mixins/transition'
import { transition, sessionStorageKey } from '@/config'
import { UPDATE_TRANSITION } from '@/store/modules/global/mutation-types'
import { resolveImageUrl } from '@/utils'
import { remove } from '@/utils/sessionStorage'
import ElmHeader from '@/components/header/index.vue'
import OutsideCategory from './outsideCategory.vue'
import InsideCategory from './insideCategory.vue'
import SortFilter from '@/components/sortFilter/index.vue'
import ShopList from '@/components/shopList/index.vue'

export default {
  name: 'Kind',
  components: {
    ElmHeader,
    OutsideCategory,
    InsideCategory,
    SortFilter,
    ShopList,
  },
  mixins: [transitionMixin],
  beforeRouteLeave(to, from, next) {
    const { home, shopSearch } = routes
    switch (to.name) {
      case home.name:
        this[UPDATE_TRANSITION](transition.slideRight)
        break
      case shopSearch.name:
        this[UPDATE_TRANSITION](transition.slideLeft)
        break
    }
    next()
  },
  data() {
    return {
      category: {
        outside: [],
        inside: [],
      },
      visible: false,
    }
  },
  mounted() {
    // 在insideCategory组件会将选择结果保留到sessionStorage中
    remove(sessionStorageKey.category)
    this.getData()
  },
  methods: {
    getData() {
      axios.get('/api/kind/category', {
        params: {
          id: +this.$route.params.id,
        },
      }).then(({ data }) => {
        if (data.code !== 0) {
          this.$notify({ type: 'danger', message: '获取数据失败' })
          return
        }
        const { outside, inside } = data.data
        this.category.outside = outside.map(({ id, name }) => ({ id, name }))
        for (let i = 1; i < inside.length; i += 1) {
          const category = inside[i]
          const subCategory = category.sub_categories.filter(item => item.image_url)
          if (subCategory.length === 0) continue
          this.category.inside.push({
            id: category.id,
            name: category.name,
            count: category.count,
            subs: subCategory.map(item => ({
              id: item.id,
              name: item.name,
              count: item.count,
              imagePath: resolveImageUrl(item.image_url, category.name, item.name),
            })),
          })
        }
      })
    },
    search() {
      this.$refs.list.search()
    },
    toggle() {
      this.visible = !this.visible
    },
  },
}
</script>

<style lang="scss" scoped>
  .kind-container {
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding-top: px2rem($headerHeight);
  }

  .search-container {
    box-sizing: border-box;
    overflow: hidden;
    flex: 1;
    height: px2rem(60);
    margin-right: px2rem(20);
    background-color: #fff;
    border-radius: px2rem(48);
  }

  .placeholder {
    position: relative;
    padding: 0 px2rem(60);
    color: #999;
    font-size: px2rem(28);
    line-height: px2rem(60);

    .icon {
      position: absolute;
      top: 50%;
      left: px2rem(16);
      transform: translateY(-50%);
    }
  }

  .scroll-wrapper {
    overflow: hidden;
    flex: 1;
    padding: 0 px2rem(30);
  }
</style>
