import { mapMutations } from 'vuex'
import { UPDATE_TRANSITION } from '@/store/modules/global/mutation-types'

export default {
  methods: {
    ...mapMutations('global', [UPDATE_TRANSITION]),
  },
}
