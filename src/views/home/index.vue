<template>
  <div class="home">
    <home-header
      ref="header"
      :style="{
        transform: `translateY(${translateY}px)`,
      }"
    />
    <scroll-view
      ref="scroll"
      :probe-type="1"
    >
      <main
        :style="{
          paddingTop: `${paddingTop}px`,
        }"
        class="scroll-wrapper"
      >
        <div class="wave-container">
          <wave />
        </div>
        <advertisement :advertisement="advertisement" />
        <kind :data-source="kindGroup" />
        <div class="constraint">
          <div class="super-vip">
            <div class="left">
              <img
                src="https://cube.elemecdn.com/8/0e/4dd212d831becab6e3ebd484c0941jpeg.jpeg?x-oss-process=image/resize,m_lfit,w_36,h_36/quality,q_90/format,webp"
                alt="vip"
              >
              <span class="title">加入超级会员</span>
              <span class="desc">每月领20元红包</span>
            </div>
            <div class="right">
              <span>立即开通</span>
              <elm-icon
                name="arrow"
                color="#644f1b"
                :rotate="90"
              />
            </div>
          </div>
          <p class="guess">猜你喜欢</p>
          <!-- <shop /> -->
          <div>
            <sort-filter
              ref="filter"
              :style="{
                top: `${top}px`,
              }"
              @reset="reset"
            />
            <shop-list @reset="reset" />
          </div>
        </div>
      </main>
    </scroll-view>
  </div>
</template>

<script>
import axios from 'axios'
import HomeHeader from './header.vue'
import ScrollView from '@/components/scrollView/index.vue'
import Wave from '@/components/wave/index.vue'
import Advertisement from './advertisement'
import Kind from './kind'
// import Shop from './shop'
import SortFilter from './sortFilter'
import ShopList from './list'

export default {
  name: 'Home',
  components: {
    HomeHeader,
    ScrollView,
    Wave,
    Advertisement,
    Kind,
    SortFilter,
    ShopList,
    // Shop,
  },
  data() {
    return {
      loading: false,
      advertisement: [],
      kindGroup: [],
      col: 10, // 每组个数
      paddingTop: 0,
      translateY: 0,
      offsetTop: 0,
      top: 0,
    }
  },
  mounted() {
    const { headerHeight, locationHeight } = this.$refs.header.height()
    const inputHeight = headerHeight - locationHeight
    console.log(inputHeight)
    this.paddingTop = headerHeight
    this.$refs.scroll.on('scroll', ({ y }) => {
      y = Math.ceil(y)
      this.translateY = locationHeight + y <= 0 ? -locationHeight : y
      this.top = -y <= this.offsetTop - inputHeight ? 0 : -y - (this.offsetTop - inputHeight)
    })
    this.$refs.scroll.on('scrollEnd', ({ y }) => {
      y = Math.ceil(y)
      this.translateY = locationHeight + y <= 0 ? -locationHeight : y
    })
    this.loading = true
    Promise.all([
      this.getAdvertisement(),
      this.getKind(),
    ]).then(() => {
      this.reset()
      this.$nextTick(() => {
        this.offsetTop = this.$refs.filter.$el.offsetTop
      })
    }).catch(() => {
      this.$notify({ type: 'danger', message: '获取数据失败' })
    }).finally(() => {
      this.loading = false
    })
  },
  methods: {
    getAdvertisement() {
      return axios.get('/api/advertisement/list')
        .then(({ data }) => {
          if (data.code !== 0) throw new Error()
          this.advertisement = data.data
        })
    },
    getKind() {
      return axios.get('/api/kind/list')
        .then(({ data }) => {
          if (data.code !== 0) throw new Error()
          const kinds = data.data
          const length = Math.ceil(kinds.length / this.col)
          for (let i = 0; i < length; i += 1) {
            this.kindGroup.push(kinds.slice(i * this.col, (i + 1) * this.col))
          }
        })
    },
    reset() {
      this.$refs.scroll.reset()
    },
  },
}
</script>

<style lang="scss" scoped>
  .home {
    width: 100%;
    height: 100%;
  }
  .scroll-wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .wave-container {
    position: absolute;
    left: 0;
    z-index: -1;
    width: 100%;
    height: px2rem(114);
    background-color: $themeColor;
  }
  .constraint {
    padding: 0 px2rem(30);
  }
  .super-vip {
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
    height: px2rem(80);
    padding: 0 px2rem(14) 0 px2rem(28);
    color: #644f1b;
    line-height: px2rem(80);
    background-image: linear-gradient(90deg, #ffefc4,  #f3dda0);
    border-radius: px2rem(8);

    .left {
      float: left;

      img {
        width: px2rem(36);
        height: px2rem(36);
        object-fit: cover;
        vertical-align: sub;
      }
      .title {
        font-size: px2rem(28);
        font-weight: 700;
      }
      .desc {
        font-size: px2rem(24);
      }
    }
    .right {
      float: right;
      font-size: px2rem(24);
    }
  }
  .guess {
    height: px2rem(96);
    padding-top: px2rem(20);
    font-size: px2rem(36);
    font-weight: 700;
    line-height: px2rem(96);
    color: $primaryTextColor;
  }
</style>
