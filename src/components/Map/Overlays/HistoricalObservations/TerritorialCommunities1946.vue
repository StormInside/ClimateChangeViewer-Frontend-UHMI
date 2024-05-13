<template>
  <div>
    <l-geo-json
      :geojson="geoData"
      @click="gaugeClickGeoJson($event.layer, $event.layer.feature.properties)"
      @mouseover="
        bindTooltipToLayer($event.layer, $event.layer.feature.properties, $store.state.LangState.currLang)
      "
      @mouseout="
        unbindTooltipToLayer($event.layer, $event.layer.feature.properties)
      "
      :options="style.passive"
      ref="territorialCommunities1946"
    ></l-geo-json>
  </div>
</template>

<script>
/* relative imports */
import ClickedMultiPolygonMixin from "../../../../mixins/Map/ClickedMultiPolygonMixin.js";
import geoData from "../../../../../static/UA_terhromads_with_1951_2020_anomalies.geojson";

const overlay = {
  name: "Territorial communities (1946-2020)",
  parentName: "Historical observations",
};

export default {
  name: "TerritorialCommunities1946",
  overlay,
  mixins: [ClickedMultiPolygonMixin],
  data() {
    return {
      geoData,
      refName: "territorialCommunities1946",
      layerPrefix: "observed",
    };
  },
};
</script>

<style></style>
