<template>
  <div
    class="header"
    :style="{
      backgroundColor: `rgba(255, 255, 255, ${opacity})`,
    }"
  >
    <elm-icon
      name="arrow"
      :color="opacity === 1 ? variable.primaryTextColor : '#fff'"
      :font-size="44"
      :rotate="-90"
      @click="back"
    />
    <div
      v-show="opacity === 1"
      style="flex: 1;"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import variable from '@/scss/var.scss'

export default {
  name: 'ScrollHeader',
  props: {
    opacity: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    variable() {
      return variable
    },
  },
  methods: {
    back() {
      const { from } = this.$route.query
      this.$router.push(from || '/home')
    },
  },
}
</script>

<style lang="scss" scoped>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    width: 100%;
    height: px2rem(84);
  }

  .elm-icon {
    width: px2rem(72);
    height: px2rem(72);
    line-height: px2rem(72);
    text-align: center;
  }
</style>
