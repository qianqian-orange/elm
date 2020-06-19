<template>
  <div style="width: 100%; height: 100%;">
    <search-input
      v-model="search"
      :placeholder="placeholder"
    />
    <div
      v-show="dataSource.length || search"
      class="search-result"
      :style="styleObj"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import SearchInput from '@/components/searchInput/index.vue'

export default {
  name: 'Search',
  components: {
    SearchInput,
  },
  props: {
    placeholder: {
      type: String,
      default: '请输入...',
    },
    top: {
      type: Number,
      default: 0,
    },
    backgroundColor: {
      type: String,
      default: '#fff',
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      search: this.value,
    }
  },
  computed: {
    styleObj() {
      return {
        top: `${this.top}px`,
        backgroundColor: this.backgroundColor,
      }
    },
  },
  watch: {
    search(val) {
      this.$emit('input', val)
    },
  },
}
</script>

<style lang="scss" scoped>
  .search-result {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
  }
</style>
