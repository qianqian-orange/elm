<template>
  <transition
    name="food-loading"
    appear
  >
    <elm-mask background-color="rgba(255, 255, 255, .6)">
      <span
        ref="icon"
        :style="{
          backgroundPosition: `0 -${index * height}px`,
        }"
        class="food-loading-icon"
      />
    </elm-mask>
  </transition>
</template>

<script>
export default {
  name: 'FoodLoading',
  data() {
    return {
      id: null,
      index: 0,
      height: 0,
      interval: 800,
      count: 7,
    }
  },
  beforeDestroy() {
    clearTimeout(this.id)
  },
  mounted() {
    this.height = this.$refs.icon.offsetHeight
    this.id = this.jump()
  },
  methods: {
    jump() {
      return setTimeout(() => {
        this.index = (this.index + 1) % 7
        this.id = this.jump()
      }, this.interval)
    },
  },
}
</script>

<style lang="scss" scoped>
  .food-loading-icon {
    width: px2rem(100);
    height: px2rem(100);
    background-image: url('~@/assets/image/icon.png');
    background-repeat: no-repeat;
    background-size: cover;
    animation: jump .8s ease-in-out infinite;
  }

  @keyframes jump {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-60%);
    }

    100% {
      transform: translateY(0);
    }
  }

  .food-loading-enter,
  .food-loading-leave-to {
    opacity: 0;
  }

  .food-loading-enter-active,
  .food-loading-leave-active {
    transition: opacity .8s ease;
  }
</style>
