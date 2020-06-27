import {
  SAVE_FILTER_DATA,
  UPDATE_FILTER_DATA,
} from './mutation-types'

const initState = {
  filter: {
    initial: false,
    sortFilter: '',
    insideSortFilter: [],
    outsideSortFilter: [],
    outsideFilters: [],
    supports: [],
    supportIds: [],
    activities: [],
    activityIds: [],
    averageCosts: [],
    averageCostId: -1,
    insideSortFilterIndex: -1,
    outsideSortFilterIndex: -1,
  },
}

const mutations = {
  [SAVE_FILTER_DATA]({ filter }, payload) {
    filter.initial = true
    filter.insideSortFilterIndex = 0
    for (const key in payload) {
      if (filter.hasOwnProperty(key)) {
        filter[key] = payload[key]
      }
    }
  },
  [UPDATE_FILTER_DATA]({ filter }, payload) {
    for (const key in payload) {
      if (filter.hasOwnProperty(key)) {
        filter[key] = payload[key]
      }
    }
  },
}

export default {
  namespaced: true,
  state: initState,
  mutations,
}
