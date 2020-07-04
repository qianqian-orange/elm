<template>
  <div :style="{ paddingTop: `${paddingTop}px` }">
    <elm-header ref="header" />
    <elm-empty title="页面不存在" />
  </div>
</template>

<script>
import ElmHeader from '@/components/header/index.vue'

export default {
  name: 'NotFound',
  components: {
    ElmHeader,
  },
  data() {
    return {
      paddingTop: 0,
    }
  },
  mounted() {
    this.paddingTop = this.$refs.header.$el.offsetHeight
  },
}
</script>
