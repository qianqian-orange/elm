import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
import { Notify } from '@/ui'
import { UPDATE_LOCATION } from '@/store/modules/global/mutation-types'
import { AmapKey } from '@/config'

export default {
  computed: {
    ...mapState('global', {
      location: state => state.location,
    }),
  },
  methods: {
    getCurrentCity() {
      return axios.get('https://restapi.amap.com/v3/ip', {
        params: {
          key: AmapKey,
        },
      })
    },
    getCurrentAddress() {
      return axios.get('https://restapi.amap.com/v3/geocode/regeo', {
        params: {
          location: `${this.location.longitude},${this.location.latitude}`,
          key: AmapKey,
          extensions: 'all',
        },
      })
    },
    locateCore(initial) {
      return this.getCurrentCity()
        .then(({ data }) => {
          if (data.status !== '1') {
            Notify({ type: 'danger', message: '请求数据失败' })
            return
          }
          const [longitude, latitude] = data.rectangle.split(';')[0].split(',')
          this[UPDATE_LOCATION]({
            initial,
            city: data.city,
            adcode: data.adcode,
            longitude,
            latitude,
          })
          return this.getCurrentAddress()
            .then(({ data }) => {
              if (data.status !== '1') {
                Notify({ type: 'danger', message: '请求数据失败' })
                return
              }
              const { township } = data.regeocode.addressComponent
              this[UPDATE_LOCATION]({ address: township })
              return data
            })
        })
    },
    ...mapMutations('global', [UPDATE_LOCATION]),
  },
}
