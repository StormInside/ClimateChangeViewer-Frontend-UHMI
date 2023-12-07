const state = {
  currLang: 'en',
  langs: ['en', 'ua'],
};
const actions = {
  CHANGE_LANG({ commit }) {
    commit("CHANGE_LANG")
  }
}
const mutations = {
  CHANGE_LANG(state) {
    state.currLang = state.langs.filter(el => el !== state.currLang)[0]
  }
}
const getters = {
  getCurrentLang(state) {
    return state.currLang
  }
}

export default {
  state,
  actions,
  mutations,
  getters,
};