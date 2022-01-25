<template>
  <div>
    <l-geo-json
      :geojson="soilLayer"
      :options="options"
      :options-style="style.passive"
      @mouseover="mouseover($event.layer)"
      @mouseout="mouseout($event.layer)"
    ></l-geo-json>
    <lazy-geo-tooltip v-if="tooltip.visible" />
  </div>
</template>

<script>
import soilLayer from 'static/Soils_UA_RU_MD_BY.geojson'
import { mapGetters } from 'vuex'

export default {
  name: 'GeoSoilLayer',
  data() {
    return {
      soilLayer,
      style: {
        active: {
          color: '#ff0000',
          radius: 5,
          weight: 4,
          fillOpacity: 1,
        },
        passive: {
          color: '#000000',
          radius: 5,
          weight: 0.5,
          fillOpacity: 1,
        },
      },
    }
  },
  computed: {
    ...mapGetters('geoJson', ['tooltip']),
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction,
      }
    },
    onEachFeatureFunction() {
      return (feature, layer) => {
        switch (feature.properties.HYDGRP) {
          case 'A':
            layer.setStyle({
              fillColor: 'rgba(158,211,155,0.65)',
            })
            break
          case 'B':
            layer.setStyle({
              fillColor: 'rgba(239,241,139,0.65)',
            })
            break
          case 'C':
            layer.setStyle({
              fillColor: 'rgba(255,195,134,0.65)',
            })
            break
          case 'D':
            layer.setStyle({
              fillColor: 'rgba(236,174,175,0.65)',
            })
            break
        }
      }
    },
  },
  methods: {
    mouseover(layer) {
      layer.setStyle(this.style.active)
      this.$store.commit('geoJson/setTooltip', {
        visible: true,
        item: layer.feature.properties,
      })
    },
    mouseout(layer) {
      layer.setStyle({
        color: '#000000',
        weight: 0.5,
      })
      this.$store.commit('geoJson/setTooltip', { visible: false, item: null })
    },
  },
}
</script>
