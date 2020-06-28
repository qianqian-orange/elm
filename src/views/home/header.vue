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
    if (this.location.initial) return
    this.locateCore(true)
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
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    padding: px2rem(20) px2rem(30);
    background-image: linear-gradient(90deg, #1db5ff, #008cff);
  }

  .location {
    display: flex;
    align-items: center;
    width: 100%;
    height: px2rem(64);
    padding-bottom: px2rem(8);
    color: #fff;
    font-size: px2rem(28);
    line-height: px2rem(64);

    .address {
      @include single-line-overflow();
      height: 100%;
      max-width: px2rem(250);
      margin: 0 px2rem(8) 0 px2rem(12);
    }
  }

  .input {
    width: 100%;
    height: px2rem(60);
    color: $secondaryTextColor;
    font-size: px2rem(28);
    font-weight: 200;
    line-height: px2rem(60);
    text-align: center;
    background-color: #fff;
    border-radius: px2rem(48);
  }
</style>
