export default {
  state: () => ({
    tooltipItem: null,
    tooltipPositionCoordinates: {
      x: null,
      y: null,
    },
  }),
  mutations: {
    setTooltipItem(state, item) {
      state.tooltipItem = item
    },
    setTooltipPositionCoordinates(state, { x, y }) {
      state.tooltipPositionCoordinates.x = x
      state.tooltipPositionCoordinates.y = y
    },
  },
  actions: {},
  getters: {
    tooltipItem: (state) => state.tooltipItem,
    tooltipPositionCoordinates: (state) => state.tooltipPositionCoordinates,
  },
}
