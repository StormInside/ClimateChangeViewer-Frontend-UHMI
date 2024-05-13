<template>
  <div>
    <l-geo-json
      :geojson="geoData"
      @click="gaugeClickGeoJson($event.layer, $event.layer.feature.properties)"
      :options="style.passive"
      ref="ukraineProjected"
      @mouseover="
        bindTooltipToLayer($event.layer, $event.layer.feature.properties, $store.state.LangState.currLang)
      "
      @mouseout="
        unbindTooltipToLayer($event.layer, $event.layer.feature.properties)
      "
    ></l-geo-json>
  </div>
</template>

<script>
/* relative imports */
import ClickedMultiPolygonMixin from "../../../../../mixins/Map/ClickedMultiPolygonMixin.js";
import geoData from "../../../../../../static/UA_country_with_anomalies_2.geojson";

const overlay = {
  name: "Ukraine",
  parentName: "Climate projections (Euro-CORDEX)",
};
export default {
  name: "UkraineProjected",
  mixins: [ClickedMultiPolygonMixin],
  overlay,
  data() {
    return {
      geoData,
      refName: "ukraineProjected",
      layerPrefix: "",
    };
  },
};
</script>

<style></style>
