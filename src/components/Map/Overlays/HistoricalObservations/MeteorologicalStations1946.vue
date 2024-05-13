<template>
  <div>
    <l-geo-json
      ref="meteorologicalStations1946"
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
import geoDataAirTemperature from "../../../../../static/meteostations_homogen_Tm_Tn_Tx.geojson";
import geoDataPrecipitation from "../../../../../static/meteostations_homogen_RR.geojson";

const overlay = {
  name: "Meteorological stations (1946-2020)",
  parentName: "Historical observations",
};
export default {
  mixins: [ClickedGaugesMixin],
  name: "MeteorologicalStations1946",
  overlay,
  props: {
    layerType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      refName: "meteorologicalStations1946",
    };
  },
  methods: {
    createTooltip(properties) {
      if(this.lang == 'en') return properties.station;
      else return properties.St_UA;
    },
  },
  computed: {
    geoData() {
      return this.layerType === "Air temperature"
        ? geoDataAirTemperature
        : geoDataPrecipitation;
    },
    lang(){
      return this.$store.state.LangState.currLang;
    }
  },
  watch: {
    lang(){
      this.$forceUpdate();
    }
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
