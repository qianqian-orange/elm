<template>
  <div class="bar">
    bar
    <div
      style="height:1500px"
    />
    <p
      id="anchor"
      style="height:500px"
    >
      Anchor
    </p>
    <p
      id="anchor2"
      style="height:500px"
    >
      Anchor2
    </p>
    <p id="1number">
      with number
    </p>
  </div>
</template>

<script>
export default {
  beforeMount() {
    // debugger
    console.log('C beforeMount')
  },
  mounted() {
    console.log('C mounted')
  },
  beforeDestroy() {
    console.log('C beforeDestroy')
  },
  destroyed() {
    console.log('C destroyed')
  },
  // beforeRouteLeave(to, from, next) {
  //   from.meta.savedPosition = { x: 0, y: document.documentElement.scrollTop }
  //   next()
  // },
}
</script>
