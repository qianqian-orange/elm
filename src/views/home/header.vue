<template>
  <div class="header">
    <router-link to="/address">
      <div class="location">
        <i class="icon iconfont icon-location1" />
        <span class="address">{{ location.address }}</span>
        <div class="arrow-contaienr">
          <arrow />
        </div>
      </div>
    </router-link>
    <div class="input">
      <i class="icon iconfont icon-search" />
      <span>酸菜鱼</span>
    </div>
  </div>
</template>

<script>
import Arrow from '@/components/arrow/index.vue'
import locateMixin from '@/mixins/locate'

export default {
  name: 'HomeHeader',
  components: {
    Arrow,
  },
  mixins: [locateMixin],
  mounted() {
    // if (this.location.initial) return
    // this.locateCore(true)
  },
}
</script>
<style lang="scss" scoped>
  .header {
    box-sizing: border-box;
    width: 100%;
    padding: px2rem(20) px2rem(30);
    background-image: linear-gradient(90deg,#1db5ff,#008cff);
  }
  .location {
    width: 100%;
    height: px2rem(56);
    margin-bottom: px2rem(8);
    font-size: px2rem(28);
    line-height: px2rem(56);
    color: #fff;

    .icon {
      font-size: px2rem(28);
      vertical-align: top;
    }
    .address {
      display: inline-block;
      max-width: px2rem(250);
      height: 100%;

      @include single-line-overflow();
    }
    .arrow-contaienr {
      display: inline-block;
      height: 100%;
      transform: rotate(180deg);
      vertical-align: top;
    }
  }
  .input {
    width: 100%;
    height: px2rem(60);
    text-align: center;
    font-size: px2rem(28);
    font-weight: 200;
    color: #999;
    line-height: px2rem(60);
    background-color: #fff;
    border-radius: px2rem(48);

    .icon {
      font-size: px2rem(28);
      font-weight: 700;
    }
  }
</style>
