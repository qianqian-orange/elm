<template>
  <elm-mask>
    <div class="elm-dialog">
      <p class="elm-dialog-title">{{ title }}</p>
      <div class="elm-dialog-btn">
        <div
          class="cancel"
          @click.stop="cancel"
        >取消</div>
        <div
          class="ensure"
          @click.stop="ensure"
        >确定</div>
      </div>
    </div>
  </elm-mask>
</template>

<script>
export default {
  name: 'ElmDialog',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  methods: {
    ensure() {
      this.$emit('ensure')
    },
    cancel() {
      this.$emit('cancel')
    },
  },
}
</script>
