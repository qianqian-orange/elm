<template>
  <slider
    :data-source="advertisement"
    :auto-play="true"
    :nested="true"
  >
    <ul class="advertisement-list">
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
    <template #dot="{ current }">
      <dot
        :data-source="advertisement"
        :current="current"
      />
    </template>
  </slider>
</template>

<script>
import { mapState } from 'vuex'
import Slider from '@/components/slider/index.vue'
import Dot from '@/components/dot/index.vue'

export default {
  name: 'Advertisement',
  components: {
    Slider,
    Dot,
  },
  computed: {
    ...mapState('home', {
      advertisement: state => state.advertisement,
    }),
  },
}
</script>

<style lang="scss" scoped>
  .advertisement-list {
    overflow: hidden;
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
    }
  }
</style>
