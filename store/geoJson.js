export default {
  state: () => ({
    tooltipItem: null,
  }),
  mutations: {
    setTooltipItem(state, item) {
      state.tooltipItem = item
    },
  },
  actions: {},
  getters: {
    tooltipItem: (state) => state.tooltipItem,
  },
}
