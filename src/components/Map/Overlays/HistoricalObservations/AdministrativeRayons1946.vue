<template>
  <div>
    <l-geo-json
      :geojson="geoData"
      @click="gaugeClickGeoJson($event.layer, $event.layer.feature.properties)"
      :options="style.passive"
      ref="administrativeRayons1946"
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
import ClickedMultiPolygonMixin from "../../../../mixins/Map/ClickedMultiPolygonMixin.js";

import geoData from "../../../../../static/UA_rayons_with_1951_2020_anomalies.geojson";
const overlay = {
  name: "Administrative rayons (1946-2020)",
  parentName: "Historical observations",
};

export default {
  name: "AdministrativeRayons1946",
  mixins: [ClickedMultiPolygonMixin],
  overlay,
  data() {
    return {
      geoData,
      refName: "administrativeRayons1946",
      layerPrefix: "observed",
    };
  },
};
</script>

<style></style>
