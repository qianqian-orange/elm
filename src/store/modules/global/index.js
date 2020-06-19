import { UPDATE_LOCATION } from './mutation-types'

const initState = {
  location: {
    initial: false,
    city: '',
    longitude: '',
    latitude: '',
    address: '',
    adcode: '',
  },
}

const mutations = {
  [UPDATE_LOCATION]({ location }, payload) {
    for (const key in payload) {
      if (location.hasOwnProperty(key)) {
        location[key] = payload[key]
      }
    }
  },
}

export default {
  namespaced: true,
  state: initState,
  mutations,
}
