<template>
  <div class="circle-button">
    <transition
      name="circle-button"
    >
      <span v-show="count">
        <!-- 之所以需要用span包一层是因为elm-icon有用到transfrom属性，那么会是过渡样式的
          的transform设置失效
         -->
        <elm-icon
          name="decrease"
          :color="variable.themeColor"
          :font-size="44"
          :stop-propagation="true"
          @click="decrease"
        />
      </span>
    </transition>
    <span
      v-show="count"
      class="count"
    >{{ count }}</span>
    <elm-icon
      name="increase"
      :color="variable.themeColor"
      :font-size="44"
      :stop-propagation="true"
      @click="increase"
    />
  </div>
</template>

<script>
import variable from '@/scss/var.scss'

export default {
  name: 'CircleButton',
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      count: 0,
    }
  },
  computed: {
    variable() {
      return variable
    },
  },
  watch: {
    value(val) {
      this.count = val
    },
  },
  mounted() {
    this.count = this.value
  },
  methods: {
    decrease() {
      if (this.count === 0) return
      this.count -= 1
      this.$emit('decrease')
    },
    increase(e) {
      this.count += 1
      this.$emit('increase', e)
    },
  },
}
</script>

<style lang="scss" scoped>
  .circle-button {
    display: flex;
    align-items: center;
  }

  .elm-icon {
    width: px2rem(44);
    height: px2rem(44);
  }

  .count {
    overflow: hidden;
    width: px2rem(60);
    color: $primaryTextColor;
    font-size: px2rem(28);
    text-align: center;
  }

  .circle-button-enter,
  .circle-button-leave-to {
    opacity: 0;
  }

  .circle-button-enter {
    transform: translateX(px2rem(104)) rotate(0deg);
  }

  .circle-button-enter-to {
    transform: translateX(0) rotate(-1turn);
  }

  .circle-button-leave {
    transform: translateX(0) rotate(-1turn);
  }

  .circle-button-leave-to {
    transform: translateX(px2rem(44)) rotate(0deg);
  }

  .circle-button-enter-active,
  .circle-button-leave-active {
    transition: all .2s ease;
  }
</style>
