<template>
  <div class="home-header">
    <router-link to="/address">
      <div
        ref="location"
        class="location"
      >
        <elm-icon
          name="icon-location1"
          :font-size="28"
        />
        <span class="address">{{ location.address }}</span>
        <elm-icon
          name="arrow"
          :rotate="180"
        />
      </div>
    </router-link>
    <div class="input">
      <elm-icon
        name="search"
        color="#999"
        :font-size="28"
        :style="{ fontWeight: 700 }"
      />
      <span>酸菜鱼</span>
    </div>
  </div>
</template>

<script>
import locateMixin from '@/mixins/locate'

export default {
  name: 'HomeHeader',
  mixins: [locateMixin],
  mounted() {
    // if (this.location.initial) return
    // this.locateCore(true)
  },
  methods: {
    height() {
      return {
        headerHeight: this.$el.offsetHeight,
        locationHeight: this.$refs.location.offsetHeight,
      }
    },
  },
}
</script>
<style lang="scss" scoped>
  .home-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    box-sizing: border-box;
    width: 100%;
    padding: px2rem(20) px2rem(30);
    background-image: linear-gradient(90deg,#1db5ff,#008cff);
  }
  .location {
    display: flex;
    align-items: center;
    width: 100%;
    height: px2rem(64);
    padding-bottom: px2rem(8);
    font-size: px2rem(28);
    line-height: px2rem(64);
    color: #fff;

    .address {
      max-width: px2rem(250);
      height: 100%;
      margin: 0 px2rem(8) 0 px2rem(12);

      @include single-line-overflow();
    }
  }
  .input {
    width: 100%;
    height: px2rem(60);
    text-align: center;
    font-size: px2rem(28);
    font-weight: 200;
    color: $secondaryTextColor;
    line-height: px2rem(60);
    background-color: #fff;
    border-radius: px2rem(48);
  }
</style>
