<template>
  <div style="position: relative; width: 100%; height: 100%;">
    <input
      ref="input"
      :value="value"
      class="search-input"
      type="text"
      :placeholder="placeholder"
      @input="onInput"
      @compositionstart="onCompositionStart"
      @compositionend="onCompositionEnd"
    >
    <span class="icon iconfont icon-search" />
    <span
      v-show="value"
      class="icon iconfont icon-clear"
      @click="clear"
    />
  </div>
</template>

<script>
import { throttle } from '@/utils'

export default {
  name: 'SearchInput',
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '请输入...',
    },
  },
  methods: {
    onInput: throttle(function (e) {
      if (e.target.composing) return
      this.$emit('input', e.target.value)
    }, 300),
    onCompositionStart(e) {
      e.target.composing = true
    },
    onCompositionEnd(e) {
      e.target.composing = false
      const event = new Event('input')
      this.$refs.input.dispatchEvent(event)
    },
    clear() {
      this.$emit('input', '')
    },
  },
}
</script>

<style lang="scss" scoped>
  .search-input {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 0 px2rem(60);
    font-size: px2rem(28);
    color: #222;
    outline: none;
    border: none;
    appearance: none;
  }
  .search-input::-webkit-input-placeholder {
    color: #999;
  }
  .icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: px2rem(36);
    color: #999;
  }
  .icon-search {
    left: px2rem(16);
  }
  .icon-clear {
    right: px2rem(16);
  }
</style>
