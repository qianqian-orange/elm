<template>
  <div>
    <sort-filter />
    <shop-list />
  </div>
</template>

<script>
import SortFilter from './sortFilter'
import ShopList from './list'

export default {
  components: {
    SortFilter,
    ShopList,
  },
}
</script>
