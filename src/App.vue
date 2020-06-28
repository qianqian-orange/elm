<template>
  <div id="app">
    <transition
      :name="transition"
    >
      <keep-alive include="Home">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState('global', {
      transition: state => state.transition,
    }),
  },
}
</script>

<style lang="scss" scoped>
  #app {
    width: 100%;
    height: 100%;
  }
</style>
