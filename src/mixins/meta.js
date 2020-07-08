import { isServer } from '@/config'
import { get } from '@/utils/head'

const serverMetaMixin = {
  created() {
    const meta = get(this, 'meta')
    if (!meta) return
    this.$ssrContext.meta = Object.keys(meta).reduce((result, key) => {
      return `${result}<meta name="${key}" content="${meta[key]}" >`
    }, '')
  },
}

const clientMetaMixin = {
  mounted() {
    const meta = get(this, 'meta')
    if (!meta) return
    Object.keys(meta).forEach((key) => {
      let tag = document.querySelector(`meta[name="${key}"]`)
      if (tag) {
        tag.setAttribute('content', meta[key])
        return
      }
      tag = document.createElement('meta')
      tag.setAttribute('name', key)
      tag.setAttribute('content', meta[key])
      document.head.appendChild(tag)
    })
  },
}

export default isServer ? serverMetaMixin : clientMetaMixin
