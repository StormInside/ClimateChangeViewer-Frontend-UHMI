<template>
  <div>
    <l-geo-json
      :geojson="geoData"
      @click="gaugeClickGeoJson($event.layer, $event.layer.feature.properties)"
      :options="style.passive"
      ref="administrativeRayons"
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

import geoData from "../../../../../../static/UA_rayons_en_with_anomalies_2.geojson";
const overlay = {
  name: "Administrative rayons",
  parentName: "Climate projections (Euro-CORDEX)",
};

export default {
  name: "AdministrativeRayons",
  mixins: [ClickedMultiPolygonMixin],
  overlay,
  data() {
    return {
      geoData,
      refName: "administrativeRayons",
      layerPrefix: "",
    };
  },
};
</script>

<style></style>
