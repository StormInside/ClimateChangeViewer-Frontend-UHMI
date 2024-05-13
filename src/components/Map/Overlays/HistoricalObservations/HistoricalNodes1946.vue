<template>
  <div>
    <l-geo-json
      ref="historicalNodes"
      pane="overlayPane"
      :geojson="geoData"
      :options="{
        pointToLayer: createCircles,
      }"
      @click="gaugeClickGeoJson($event.layer, $event.layer.feature.properties)"
    >
    </l-geo-json>
  </div>
</template>

<script>
/* relative imports */
import ClickedGaugesMixin from "../../../../mixins/Map/ClickedGaugesMixin.js";
import geoData from "../../../../../static/nodes_observed_interpol_wo_zeroes.geojson";

const overlay = {
  name: "grid 0.1x0.1°",
  parentName: "Historical observations",
};
export default {
  mixins: [ClickedGaugesMixin],
  name: "HistoricalNodes1946",
  overlay,
  data() {
    return {
      geoData,
      refName: "historicalNodes",
    };
  },
  computed: {
    lang(){
      return this.$store.state.LangState.currLang;
    }
  },
  watch: {
    lang(){
      this.$forceUpdate();
    }
  },
  methods: {
    createTooltip(properties) {
      if(this.$store.state.LangState.currLang == 'en') return `<b>Latitude</b>: ${properties.lat}<br><b>Longitude</b>: ${properties.lon}`
      else return `<b>Широта</b>: ${properties.lat}<br><b>Довгота</b>: ${properties.lon}`
    },
  },
};
</script>

<style lang="scss">
.unselect-icon {
  width: 12px;
  height: 12px;
  background-color: $main-blue;
  border-radius: 50%;
}
</style>
