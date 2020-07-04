<template>
  <div
    class="menu-container"
  >
    <div
      class="scroll-wrapper"
      :style="{
        height: `${height}px`,
      }"
    >
      <scroll-view
        ref="scroll"
        :stop-propagation="true"
      >
        <ul
          class="menu-list"
          :style="{
            paddingBottom: `${paddingBottom}px`,
          }"
        >
          <li
            v-for="(menu, index) in restaurant.menu"
            :key="menu.id"
            ref="menu"
            class="menu-item"
            :class="active === index ? 'active' : ''"
            @click.stop="select(index)"
          >
            <img
              v-if="menu.iconUrl"
              :src="menu.iconUrl"
              alt="icon"
              class="icon"
            >
            <span class="name">{{ menu.name }}</span>
            <elm-badge
              v-show="menu.count"
              :value="menu.count"
            />
          </li>
        </ul>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ScrollView from '@/components/scrollView/index.vue'

export default {
  name: 'ElmMenu',
  components: {
    ScrollView,
  },
  props: {
    height: {
      type: Number,
      required: true,
    },
    paddingBottom: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      active: 0,
    }
  },
  computed: {
    ...mapState('shop', {
      restaurant: state => state.restaurant,
    }),
  },
  watch: {
    height() {
      this.$refs.scroll.reset()
    },
  },
  methods: {
    select(index) {
      this.active = index
      this.$emit('select', index)
    },
    scrollToElement(index) {
      if (index === this.active) return
      this.active = index
      this.$refs.scroll.scrollToElement(this.$refs.menu[index])
    },
  },
}
</script>

<style lang="scss" scoped>
  .menu-container {
    background-color: #fafafa;
  }

  .scroll-wrapper {
    overflow: hidden;
    width: px2rem(160);
  }

  .menu-item {
    position: relative;
    padding: px2rem(30);
    color: $secondaryTextColor;
    font-size: px2rem(24);
    line-height: px2rem(36);
    text-align: center;

    &.active {
      background-color: #fff;
    }

    .icon {
      width: px2rem(24);
      height: px2rem(24);
    }

    .name {
      vertical-align: text-bottom;
    }

    .elm-badge {
      position: absolute;
      top: px2rem(10);
      right: px2rem(10);
    }
  }
</style>
