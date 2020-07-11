<template>
  <div
    v-show="visible"
    class="inside-category"
    @click.stop.self="close"
  >
    <p class="tip">请选择分类</p>
    <div class="category-container">
      <div class="main-category">
        <scroll-view ref="main-scroll">
          <ul>
            <li
              v-for="{ id, name, count } in dataSource"
              ref="main-category-item"
              :key="id"
              class="main-category-item"
              :class="id === mainActiveId ? 'active' : ''"
              @click.stop="selectMainCategory(id)"
            >
              <span class="name">{{ name }}</span>
              <span class="count">{{ count }}</span>
            </li>
          </ul>
        </scroll-view>
      </div>
      <div class="sub-category">
        <scroll-view ref="sub-scroll">
          <ul>
            <li
              v-for="{ id, name, count, imagePath } in subCategory"
              ref="sub-category-item"
              :key="id"
              class="sub-category-item"
              :class="id === subActiveId ? 'active' : ''"
              @click.stop="selectSubCategory(id)"
            >
              <img
                v-lazy="imagePath"
                alt="category"
              >
              <span class="name">{{ name }}</span>
              <span class="count">{{ count }}</span>
            </li>
          </ul>
        </scroll-view>
      </div>
    </div>
    <elm-icon
      name="clear"
      color="#999"
      :font-size="42"
      @click="close"
    />
  </div>
</template>

<script>
import ScrollView from '@/components/scrollView/index.vue'

export default {
  name: 'InsideCategory',
  components: {
    ScrollView,
  },
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      mainActiveId: -1,
      subActiveId: -1,
    }
  },
  computed: {
    subCategory() {
      if (this.mainActiveId === -1) return []
      const data = this.dataSource.find(item => item.id === this.mainActiveId)
      return data.subs
    },
  },
  watch: {
    subCategory() {
      this.$refs['sub-scroll'].scrollTo({ y: 0 })
      this.$refs['sub-scroll'].reset()
    },
    visible(val) {
      if (!val) return
      this.$nextTick(() => {
        this.scrollToElement()
      })
    },
  },
  created() {
    const visibleWatch = this.$watch('visible', function (val) {
      this.$refs['main-scroll'].reset()
      this.$refs['sub-scroll'].reset()
      visibleWatch()
    })
    const dataSourceWatch = this.$watch('dataSource', function (val) {
      this.mainActiveId = val[0].id
      this.subActiveId = this.dataSource[0].subs[0].id
      dataSourceWatch()
    })
  },
  methods: {
    close() {
      this.$emit('toggle')
    },
    selectMainCategory(id) {
      this.mainActiveId = id
    },
    selectSubCategory(id) {
      this.subActiveId = id
      this.$emit('toggle')
      this.$emit('search', {
        id,
        subCategory: this.subCategory,
      })
    },
    scrollToElement() {
      let index = this.dataSource.findIndex(item => item.id === this.mainActiveId)
      this.$refs['main-scroll'].scrollToElement(this.$refs['main-category-item'][index])
      index = this.dataSource[index].subs.findIndex(item => item.id === this.subActiveId)
      // subAcitveId对应的子菜单可能不存在
      if (index === -1) return
      this.$refs['sub-scroll'].scrollToElement(this.$refs['sub-category-item'][index])
    },
  },
}
</script>

<style lang="scss" scoped>
  .inside-category {
    position: absolute;
    top: px2rem($headerHeight);
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .3);
  }

  .tip {
    height: px2rem(80);
    padding: 0 px2rem(30);
    color: $primaryTextColor;
    font-size: px2rem(28);
    font-weight: 700;
    line-height: px2rem(80);
    background-color: #fafafa;
  }

  .elm-icon {
    position: absolute;
    top: 0;
    right: px2rem(30);
    line-height: px2rem(80);
  }

  .category-container {
    overflow: hidden;
    height: px2rem(800);

    .main-category {
      float: left;
      width: px2rem(260);
      height: 100%;
      background-color: #fafafa;
    }

    .sub-category {
      overflow: hidden;
      height: 100%;
      padding: 0 px2rem(30) 0 px2rem(42);
      background-color: #fff;
    }
  }

  .name {
    @include single-line-overflow();
    flex: 1;
    font-size: px2rem(28);
    line-height: px2rem(96);
  }

  .count {
    min-width: px2rem(48);
    padding: px2rem(4);
    border: 1px solid #ccc;
    font-size: px2rem(20);
    text-align: center;
    border-radius: px2rem(16);
  }

  .main-category-item {
    position: relative;
    display: flex;
    align-items: center;
    height: px2rem(96);
    padding-right: px2rem(20);
    padding-left: px2rem(40);
    color: #999;

    &.active {
      background-color: #fff;
    }

    &.active::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: px2rem(8);
      height: px2rem(56);
      background-color: $themeColor;
    }
  }

  .sub-category-item {
    display: flex;
    align-items: center;
    height: px2rem(96);

    &.active {
      .name {
        color: $themeColor;
      }
    }

    img {
      width: px2rem(74);
      height: px2rem(74);
      margin-right: px2rem(26);
      object-fit: cover;
    }
  }
</style>
