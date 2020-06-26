import { remove } from '@/utils/sessionStorage'
import { UPDATE_LOCATION } from '@/store/modules/global/mutation-types'
import { sessionStorageKey } from '@/config'

export default {
  methods: {
    ensure(poi) {
      remove(sessionStorageKey.city)
      this[UPDATE_LOCATION]({
        initial: true,
        city: poi.city,
        adcode: poi.adcode,
        longitude: poi.longitude,
        latitude: poi.latitude,
        address: poi.name || poi.address,
      })
      this.$router.push('/home')
    },
  },
}
