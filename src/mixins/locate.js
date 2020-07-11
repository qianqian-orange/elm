import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
import { UPDATE_LOCATION } from '@/store/modules/global/mutation-types'
import { AmapKey } from '@/config'

export default {
  computed: {
    ...mapState('global', {
      location: state => state.location,
    }),
  },
  methods: {
    getCurrentCity(initial) {
      return axios.get('https://restapi.amap.com/v3/ip', {
        params: {
          key: AmapKey,
        },
      }).then(({ data }) => {
        if (data.status !== '1') throw new Error()
        if (data.rectangle.length === 0) {
          this.$notify({ type: 'danger', message: '获取地址数据失败，使用默认数据' })
          this[UPDATE_LOCATION]({
            initial: initial,
            city: '汕头',
            adcode: '440500',
            longitude: '116.6117942',
            latitude: '23.28637076',
          })
          return
        }
        const [longitude, latitude] = data.rectangle.split(';')[0].split(',')
        this[UPDATE_LOCATION]({
          initial: initial,
          city: data.city,
          adcode: data.adcode,
          longitude,
          latitude,
        })
      })
    },
    getCurrentAddress() {
      return axios.get('https://restapi.amap.com/v3/geocode/regeo', {
        params: {
          location: `${this.location.longitude},${this.location.latitude}`,
          key: AmapKey,
          extensions: 'all',
        },
      }).then(({ data }) => {
        if (data.status !== '1') throw new Error()
        const { township } = data.regeocode.addressComponent
        this[UPDATE_LOCATION]({ address: township })
        return data
      })
    },
    locateCore(initial) {
      this[UPDATE_LOCATION]({
        address: '正在定位中',
      })
      return this.getCurrentCity(initial)
        .then(() => this.getCurrentAddress())
        .catch(() => {
          this[UPDATE_LOCATION]({
            address: '定位失败',
          })
          this.$notify({ type: 'danger', message: '请求数据失败' })
        })
    },
    ...mapMutations('global', [UPDATE_LOCATION]),
  },
}
