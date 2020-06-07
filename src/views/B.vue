<template>
  <div class="foo">
    foo
  </div>
</template>

<script>
export default {
  beforeMount() {
    // debugger
    console.log('B beforeMount')
  },
  mounted() {
    console.log('B mounted')
  },
  beforeDestroy() {
    // debugger
    console.log('B beforeDestroy')
  },
  destroyed() {
    console.log('B destroyed')
  }
}
</script>
