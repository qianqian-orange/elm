import { SAVE_FILTER_DATA } from './mutation-types'

const initState = {
  filter: {
    initial: false,
    insideSortFilter: [],
    outsideSortFilter: [],
    outsideFilters: [],
    insideSortFilterIndex: -1,
    outsideSortFilterIndex: -1,
    activityTypes: [],
  },
}

const mutations = {
  [SAVE_FILTER_DATA]({ filter }, payload) {
    filter.initial = true
    filter.insideSortFilter = payload.insideSortFilter
    filter.outsideSortFilter = payload.outsideSortFilter
    filter.outsideFilters = payload.outsideFilters
    filter.insideSortFilterIndex = 0
  },
}

export default {
  namespaced: true,
  state: initState,
  mutations,
}
