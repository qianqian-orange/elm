<template>
  <slider
    :data-source="dataSource"
    :loop="false"
    :bounce="false"
  >
    <ul class="group-list">
      <li
        v-for="(kinds, index) in dataSource"
        :key="index"
        class="group-item"
      >
        <ul class="kind-list">
          <li
            v-for="kind in kinds"
            :key="kind.title"
            :style="styleObj"
            class="kind-item"
          >
            <img
              :src="kind.img"
              alt="kind"
            >
            <p class="title">{{ kind.title }}</p>
          </li>
        </ul>
      </li>
    </ul>
    <template #dot="{ current }">
      <dot
        :data-source="dataSource"
        :current="current"
      />
    </template>
  </slider>
</template>

<script>
import Slider from '@/components/slider/index.vue'
import Dot from '@/components/dot/index.vue'

export default {
  name: 'Kind',
  components: {
    Slider,
    Dot,
  },
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
    col: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    styleObj() {
      return {
        flexBasis: `${100 / this.col}%`,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .group-list {
    overflow: hidden;
  }

  .group-item {
    float: left;
    overflow: hidden;
    width: 100%;
  }

  .kind-list {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: px2rem(20) 0 px2rem(40);
  }

  .kind-item {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: px2rem(90);
      height: px2rem(90);
      object-fit: cover;
    }

    .title {
      margin-top: px2rem(8);
      color: $secondaryTextColor;
      font-size: px2rem(24);
    }
  }

  ::v-deep .dot-list .dot-item.active {
    background-color: $themeColor;
  }
</style>
