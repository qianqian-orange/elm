<template>
  <transition
    name="elm-drawer"
    appear
  >
    <div
      class="elm-drawer-mask"
      @click.stop.self="close"
    >
      <div
        class="elm-drawer-container"
        :style="{
          height,
        }"
      >
        <header class="elm-drawer-header">{{ title }}<elm-icon
          name="clear"
          color="#999"
          :font-size="46"
          @click="close"
        /></header>
        <div class="elm-drawer-content">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ElmDrawer',
  props: {
    title: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '84%',
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
}
</script>
