<template>
  <span class="elm-badge">{{ value }}</span>
</template>

<script>
export default {
  name: 'ElmBadge',
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
}
</script>
