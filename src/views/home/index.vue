<template>
  <div class="home">
    <home-header />
    <main class="main">
      <div class="wave-container">
        <wave />
      </div>
      <slider
        v-if="advertisement.length"
        :data-source="advertisement"
      >
        <ul>
          <li
            v-for="(item, index) in advertisement"
            :key="index"
            class="advertisement-item"
          >
            <img
              :src="item"
              alt="advertisement"
            >
          </li>
        </ul>
      </slider>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import { Notify } from '@/ui'
import HomeHeader from './header.vue'
import Wave from '@/components/wave/index.vue'
import Slider from '@/components/slider/index.vue'

export default {
  name: 'Home',
  components: {
    HomeHeader,
    Wave,
    Slider,
  },
  data() {
    return {
      loading: true,
      advertisement: [],
    }
  },
  mounted() {
    this.getAdvertisement()
  },
  methods: {
    getAdvertisement() {
      return axios.get('/api/advertisement')
        .then(({ data }) => {
          if (data.code !== 0) {
            Notify({ type: 'danger', message: '获取数据失败' })
            return
          }
          this.advertisement = data.data
        })
    },
  },
}
</script>

<style lang="scss" scoped>
  .main {
    position: relative;
  }
  .wave-container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: px2rem(114);
    background-color: $themeColor;
  }
  .advertisement-item {
    box-sizing: border-box;
    float: left;
    width: 100%;
    height: px2rem(180);
    padding: 0 px2rem(30);

    img {
      width: 100%;
      height: 100%;
      border-radius: px2rem(12);
      object-fit: cover;
    }
  }
</style>
