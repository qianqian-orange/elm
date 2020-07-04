<template>
  <ul class="nav-list">
    <router-link
      v-for="({name, link}) in navList"
      :key="name"
      :to="{
        path: link,
      }"
      :style="{
        flex: 1,
      }"
    >
      <li
        class="nav-item"
      >{{ name }}</li>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'NavList',
  data() {
    return {
      navList: [{
        name: '点餐',
        link: `/shop/${this.$route.params.id}/order?from=${this.$route.query.from}`,
      }, {
        name: '评价',
        link: `/shop/${this.$route.params.id}/comment?from=${this.$route.query.from}`,
      }, {
        name: '商家',
        link: `/shop/${this.$route.params.id}/detail?from=${this.$route.query.from}`,
      }],
    }
  },
}
</script>

<style lang="scss" scoped>
  .nav-list {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    padding: 0 px2rem(30) px2rem(20);
    background-color: #fff;

    .router-link-active .nav-item::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: px2rem(46);
      height: px2rem(8);
      background-color: $themeColor;
      border-radius: px2rem(4);
    }

    .nav-item {
      position: relative;
      color: $primaryTextColor;
      font-size: px2rem(28);
      line-height: px2rem(60);
      text-align: center;
    }
  }
</style>
