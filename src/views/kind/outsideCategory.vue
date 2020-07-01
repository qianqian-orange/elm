<template>
  <div class="outside-category">
    <div class="scroll-wrapper">
      <scroll-view
        ref="scroll"
        :scroll-x="true"
        :scroll-y="false"
      >
        <ul class="outside-category-list">
          <li
            v-for="{ id, name } in dataSource"
            :key="id"
            class="outside-category-item"
            :class="id === activeId ? 'active' : ''"
            @click.stop="search(id)"
          >{{ name }}</li>
        </ul>
      </scroll-view>
    </div>
    <span
      class="expand"
      @click.stop="expand"
    >
      <elm-icon
        name="arrow"
        :color="variable.themeColor"
        :font-size="36"
        :rotate="180"
      />
    </span>
  </div>
</template>

<script>
import variable from '@/scss/var.scss'
import ScrollView from '@/components/scrollView/index.vue'

export default {
  name: 'OutsideCategory',
  components: {
    ScrollView,
  },
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      activeId: -1,
    }
  },
  computed: {
    variable() {
      return variable
    },
  },
  watch: {
    dataSource(val) {
      this.activeId = val[0].id
      this.$refs.scroll.reset()
    },
  },
  methods: {
    search(id) {
      this.activeId = id
      this.$emit('search')
    },
    expand() {
      this.$emit('expand')
    },
  },
}
</script>

<style lang="scss" scoped>
  .outside-category {
    display: flex;
    width: 100%;
    height: px2rem(64);

    .scroll-wrapper {
      overflow: hidden;
      flex: 1;
      height: 100%;
      white-space: nowrap;
    }

    .expand {
      width: px2rem(64);
      height: px2rem(64);
      line-height: px2rem(64);
      text-align: center;
    }

    .outside-category-list {
      display: flex;
      flex-wrap: nowrap;
      height: 100%;

      .outside-category-item {
        position: relative;
        flex-shrink: 0;
        height: 100%;
        padding: 0 px2rem(20);
        color: #999;
        font-size: px2rem(28);
        line-height: px2rem(64);
        text-align: center;

        &.active {
          color: $primaryTextColor;
          font-weight: 700;
        }

        &.active::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: px2rem(48);
          height: px2rem(8);
          background-color: $themeColor;
          border-radius: px2rem(12);
        }
      }
    }
  }
</style>
