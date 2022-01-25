export default {
  state: () => ({
    tooltip: {
      visible: false,
      item: null,
    },
  }),
  mutations: {
    setTooltip(state, { visible, item }) {
      state.tooltip.visible = visible
      state.tooltip.item = item
    },
  },
  actions: {},
  getters: {
    tooltip: (state) => state.tooltip,
  },
}
