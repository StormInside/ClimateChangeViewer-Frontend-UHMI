import mapsData from 'static/maps/maps-data.json'

export default {
  state: () => ({
    mapsData,
  }),
  mutations: {
    changeProvider({ state }, layer) {
      mapsData.mapsProviders.find(
        (layer) => layer.visible === true
      ).visible = false
      layer.visible = true
    },
  },
  getters: {
    mapsData: (state) => state.mapsData,
  },
}
