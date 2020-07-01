import axios from 'axios'
import { set } from '@/utils/sessionStorage'
import { AmapKey, sessionStorageKey } from '@/config'

export default {
  methods: {
    saveData({ city, adcode, longitude, latitude }) {
      set(sessionStorageKey.city, { city, adcode, longitude, latitude })
    },
    locate(city) {
      axios.get('https://restapi.amap.com/v3/geocode/geo', {
        params: {
          key: AmapKey,
          address: city,
        },
      }).then(({ data }) => {
        if (data.status !== '1') {
          this.$notify({ type: 'danger', message: '获取数据失败' })
          return
        }
        const { adcode, location } = data.geocodes[0]
        const [longitude, latitude] = location.split(',')
        this.saveData({ city, adcode, longitude, latitude })
        this.$router.push(this.$route.query.from)
      })
    },
  },
}
