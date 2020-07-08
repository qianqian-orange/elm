<template>
  <common ref="common">
    <elm-empty />
  </common>
</template>

<script>
import { mapMutations } from 'vuex'
import { UPDATE_TRANSITION } from '@/store/modules/global/mutation-types'
import transitionMixin from '@/mixins/transition'
import { routes } from '@/config/router'
import { transition } from '@/config'
import Common from '../common/index.vue'

export default {
  name: 'Comment',
  title: '饿了么商店评论',
  meta: {
    keyword: 'elm, comment',
    description: '这里是饿了么商家评论页面，这里可以看到大家对店家的评价',
  },
  components: {
    Common,
  },
  mixins: [transitionMixin],
  beforeRouteLeave(to, from, next) {
    const {
      home,
      kind,
      shopSearch,
    } = routes
    switch (to.name) {
      case home.name:
      case kind.name:
      case shopSearch.name:
        this[UPDATE_TRANSITION](transition.slideRight)
        break
    }
    next()
  },
  mounted() {
    this.$notify({ type: 'primary', message: '功能正在开发中', duration: 1000 })
  },
  methods: {
    ...mapMutations('global', [UPDATE_TRANSITION]),
  },
}
</script>
