export default {
  state: () => ({
    style: {
      active: {
        fillColor: '#dce653',
        radius: 6.5,
        color: '#294b67',
        weight: 1.3,
        fillOpacity: 1,
      },
      passive: {
        color: '#294b67',
        fillColor: 'rgba(57, 61, 63, 0.25)',
        radius: 5,
        weight: 1.3,
        fillOpacity: 1,
      },
    },
  }),
  mutations: {},
  actions: {
    mouseOver({ getters }, layer) {
      layer.setStyle(getters.style.active)
    },
    mouseOut({ getters }, layer) {
      layer.setStyle(getters.style.passive)
    },
  },
  getters: {
    style: (state) => state.style,
  },
}
