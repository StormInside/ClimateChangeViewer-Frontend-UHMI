import mapsData from 'static/maps/maps-data.json'

export default {
  state: () => ({
    mapsData,
    geoComponent: null,
    geoComponentInfo: null,
  }),
  mutations: {
    changeProvider(state, layer) {
      mapsData.mapsProviders.find(
        (layer) => layer.visible === true
      ).visible = false
      layer.visible = true
    },
    changeGeoComponent(state, component) {
      state.geoComponent = component
    },
    changeGeoComponentInfo(state, component) {
      state.geoComponentInfo = component
    },
  },
  getters: {
    mapsData: (state) => state.mapsData,
    geoComponent: (state) => state.geoComponent,
    geoComponentInfo: (state) => state.geoComponentInfo,
  },
}
