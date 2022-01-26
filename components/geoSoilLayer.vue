<template>
  <div>
    <l-geo-json
      :geojson="soilLayer"
      :options="options"
      :options-style="style.passive"
      @mouseover="mouseover($event)"
      @mouseout="mouseout($event.layer)"
    />
    <v-tooltip
      v-model="showToolTip"
      bottom
      max-width="35vw"
      :position-y="position.y"
      :position-x="position.x"
      offset-overflow
      z-index="999"
      color="transparent"
      transition="scroll-y-transition"
    >
      <lazy-geo-tooltip />
    </v-tooltip>
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
      showToolTip: false,
      position: {
        x: null,
        y: null,
      },
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
    ...mapGetters('geoJson', ['tooltipItem']),
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
              fillColor: 'rgba(158,211,155,0.6)',
            })
            break
          case 'B':
            layer.setStyle({
              fillColor: 'rgba(239,241,139,0.6)',
            })
            break
          case 'C':
            layer.setStyle({
              fillColor: 'rgba(255,195,134,0.6)',
            })
            break
          case 'D':
            layer.setStyle({
              fillColor: 'rgba(236,174,175,0.6)',
            })
            break
        }
      }
    },
  },
  methods: {
    mouseover(event) {
      event.layer.setStyle(this.style.active)
      this.$store.commit(
        'geoJson/setTooltipItem',
        event.layer.feature.properties
      )
      this.position.y = event.containerPoint.y
      this.position.x = event.containerPoint.x
      this.showToolTip = true
    },
    mouseout(layer) {
      layer.setStyle({
        color: '#000000',
        weight: 0.5,
      })
      this.$store.commit('geoJson/setTooltipItem', null)
    },
  },
}
</script>
