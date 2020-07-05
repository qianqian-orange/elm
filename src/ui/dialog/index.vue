<template>
  <elm-mask style="position: fixed;">
    <transition
      name="elm-dialog"
      appear
    >
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
    </transition>
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
