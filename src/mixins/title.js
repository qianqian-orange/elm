import { isServer } from '@/config'
import { get } from '@/utils/head'

const serverTitleMixin = {
  created() {
    const title = get(this, 'title')
    if (!title) return
    this.$ssrContext.title = title
  },
}

const clientTitleMixin = {
  mounted() {
    const title = get(this, 'title')
    if (!title) return
    document.title = title
  },
}

export default isServer ? serverTitleMixin : clientTitleMixin
