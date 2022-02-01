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
      absolute
      :left="tooltipPositionHorizontal"
      :right="!tooltipPositionHorizontal"
      :nudge-bottom="tooltipNudgeBottom"
      :nudge-top="tooltipNudgeTop"
      :nudge-left="tooltipNudgeLeft"
      :nudge-right="tooltipNudgeRight"
      min-width="30vw"
      max-width="50vw"
      :position-y="tooltipPositionCoordinates.y"
      :position-x="tooltipPositionCoordinates.x"
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
    ...mapGetters('geoJson', ['tooltipItem', 'tooltipPositionCoordinates']),
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
    tooltipPositionHorizontal() {
      return this.tooltipPositionCoordinates.x >= window.innerWidth / 2
    },
    tooltipNudgeBottom() {
      if (this.tooltipPositionCoordinates.y < window.innerHeight / 2) {
        return 350
      } else return 0
    },
    tooltipNudgeTop() {
      if (this.tooltipPositionCoordinates.y > window.innerHeight / 2) {
        return 350
      } else return 0
    },
    tooltipNudgeLeft() {
      if (this.tooltipPositionCoordinates.x > window.innerWidth / 2) {
        return 30
      } else return 0
    },
    tooltipNudgeRight() {
      if (this.tooltipPositionCoordinates.x < window.innerWidth / 2) {
        return 30
      } else return 0
    },
  },
  methods: {
    mouseover(event) {
      event.layer.setStyle(this.style.active)
      this.$store.commit(
        'geoJson/setTooltipItem',
        event.layer.feature.properties
      )
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
