<template>
  <div id="app">
    <keep-alive include="Home">
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="scss" scoped>
  #app {
    width: 100%;
    height: 100%;
  }
</style>
