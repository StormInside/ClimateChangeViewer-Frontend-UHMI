<template>
  <div>
    <div
      v-for="(componentName, i) in componentNames"
      :key="i"
    >
      <component
        :is="componentName"
        :currentPeriod="currentPeriod"
        :selectedGauges="selectedGauges"
        :currentEmissionScenario="currentEmissionScenario"
        :layerType="currentOverlayLayer.optionalLayer
            ? currentOverlayLayer.optionalLayer.realLabel
            : null
          "
        :dataSeason="dataSeason"
        :rgbaColors="rgbaColors"
        @gauge-click="gaugeClick"
        @update-current-center="updateParentCurrentCenter"
        @overlay-is-loaded="$emit('overlay-is-loaded')"
        ref="dynamicLayer"
      ></component>
    </div>
  </div>
</template>

<script>
/* Base layers | imports */
const UaBasins = () => import("./Overlays/BaseLayers/UaBasins.vue");
/* Climate projections -> Air temperature/Precipitation | imports */
const AdministrativeOblasts = () =>
  import(
    "./Overlays/ClimateProjections/AirTemperature_Precipitation/AdministrativeOblasts.vue"
  );
const AdministrativeRayons = () =>
  import(
    "./Overlays/ClimateProjections/AirTemperature_Precipitation/AdministrativeRayons.vue"
  );
const TerritorialCommunities = () =>
  import(
    "./Overlays/ClimateProjections/AirTemperature_Precipitation/TerritorialCommunities.vue"
  );
const ClimateProjectionNodes = () =>
  import(
    "./Overlays/ClimateProjections/AirTemperature_Precipitation/ClimateProjectionNodes.vue"
  );
const RiverBasins = () =>
  import(
    "./Overlays/ClimateProjections/AirTemperature_Precipitation/RiverBasins.vue"
  );
const UkraineProjected = () =>
  import(
    "./Overlays/ClimateProjections/AirTemperature_Precipitation/UkraineProjected.vue"
  );
/* *Out Accordion* Historical observations | imports */
const Ukraine1946 = () =>
  import("./Overlays/HistoricalObservations/Ukraine1946.vue");
const AdministrativeOblasts1946 = () =>
  import("./Overlays/HistoricalObservations/AdministrativeOblasts1946.vue");
const AdministrativeRayons1946 = () =>
  import("./Overlays/HistoricalObservations/AdministrativeRayons1946.vue");
const TerritorialCommunities1946 = () =>
  import("./Overlays/HistoricalObservations/TerritorialCommunities1946.vue");
const HistoricalNodes1946 = () =>
  import("./Overlays/HistoricalObservations/HistoricalNodes1946.vue");
const MeteorologicalStations1946 = () =>
  import("./Overlays/HistoricalObservations/MeteorologicalStations1946.vue");

export default {
  name: "AllOverlaysSimple",
  components: {
    UkraineProjected,
    UaBasins,
    AdministrativeOblasts,
    ClimateProjectionNodes,
    RiverBasins,
    AdministrativeRayons,
    TerritorialCommunities,
    Ukraine1946,
    AdministrativeOblasts1946,
    AdministrativeRayons1946,
    TerritorialCommunities1946,
    HistoricalNodes1946,
    MeteorologicalStations1946,
  },
  props: {
    selectedGauges: {
      type: Array || null,
      required: true,
    },
    currentOverlayLayer: {
      required: true,
    },
    currentPeriod: {
      type: String,
      required: true,
    },
    currentEmissionScenario: {
      type: String,
      required: true,
    },
    dataSeason: {
      type: String,
      required: true,
    },
    rgbaColors: {
      type: Object,
      required: false,
      default: () => {
        return {
          minValueColor: "rgba(7, 47, 97, 1)",
          maxValueColor: "rgba(105, 0, 33, 1)",
        };
      },
    },
  },
  computed: {
    componentNames() {
      const componentNames = [];
      const currentOverlayLayerBoth = [
        this.currentOverlayLayer.baseLayer,
        this.currentOverlayLayer.optionalLayer,
      ].filter((overlayLayer) => overlayLayer !== null);
      if (currentOverlayLayerBoth.length) {
        if (
          currentOverlayLayerBoth.some(
            (currentOverlayLayer) =>
              currentOverlayLayer.parentName === "Base layers" &&
              currentOverlayLayer.name === "River basins"
          )
        ) {
          componentNames.push("UaBasins");
        }
        if (
          currentOverlayLayerBoth.some(
            (currentOverlayLayer) =>
              currentOverlayLayer.parentName === "Historical observations" &&
              currentOverlayLayer.name === "Ukraine (1946-2020)"
          )
        ) {
          componentNames.push("Ukraine1946");
        }
        if (
          currentOverlayLayerBoth.some(
            (currentOverlayLayer) =>
              currentOverlayLayer.parentName === "Historical observations" &&
              currentOverlayLayer.name === "Administrative oblasts (1946-2020)"
          )
        ) {
          componentNames.push("AdministrativeOblasts1946");
        }
        if (
          currentOverlayLayerBoth.some(
            (currentOverlayLayer) =>
              currentOverlayLayer.parentName === "Historical observations" &&
              currentOverlayLayer.name === "Administrative rayons (1946-2020)"
          )
        ) {
          componentNames.push("AdministrativeRayons1946");
        }
        if (
          currentOverlayLayerBoth.some(
            (currentOverlayLayer) =>
              currentOverlayLayer.parentName === "Historical observations" &&
              currentOverlayLayer.name === "Territorial communities (1946-2020)"
          )
        ) {
          componentNames.push("TerritorialCommunities1946");
        }
        if (
          currentOverlayLayerBoth.some(
            (currentOverlayLayer) =>
              currentOverlayLayer.parentName === "Historical observations" &&
              currentOverlayLayer.name === "grid 0.1x0.1°"
          )
        ) {
          componentNames.push("HistoricalNodes1946");
        }
        if (
          currentOverlayLayerBoth.some(
            (currentOverlayLayer) =>
              currentOverlayLayer.parentName === "Historical observations" &&
              currentOverlayLayer.name === "Meteorological stations (1946-2020)"
          )
        ) {
          componentNames.push("MeteorologicalStations1946");
        }
        if (
          currentOverlayLayerBoth.some(
            (currentOverlayLayer) =>
              currentOverlayLayer.parentName ===
              "Climate projections (Euro-CORDEX)" &&
              currentOverlayLayer.name === "grid 0.11x0.11°"
          )
        ) {
          componentNames.push("ClimateProjectionNodes");
        }
        if (
          currentOverlayLayerBoth.some(
            (currentOverlayLayer) =>
              currentOverlayLayer.parentName ===
              "Climate projections (Euro-CORDEX)" &&
              currentOverlayLayer.name === "Ukraine"
          )
        ) {
          componentNames.push("UkraineProjected");
        }
        if (
          currentOverlayLayerBoth.some(
            (currentOverlayLayer) =>
              currentOverlayLayer.parentName ===
              "Climate projections (Euro-CORDEX)" &&
              currentOverlayLayer.name === "Administrative oblasts"
          )
        ) {
          componentNames.push("AdministrativeOblasts");
        }
        if (
          currentOverlayLayerBoth.some(
            (currentOverlayLayer) =>
              currentOverlayLayer.parentName ===
              "Climate projections (Euro-CORDEX)" &&
              currentOverlayLayer.name === "Administrative rayons"
          )
        ) {
          componentNames.push("AdministrativeRayons");
        }
        if (
          currentOverlayLayerBoth.some(
            (currentOverlayLayer) =>
              currentOverlayLayer.parentName ===
              "Climate projections (Euro-CORDEX)" &&
              currentOverlayLayer.name === "Territorial communities"
          )
        ) {
          componentNames.push("TerritorialCommunities");
        }
        if (
          currentOverlayLayerBoth.some(
            (currentOverlayLayer) =>
              currentOverlayLayer.parentName ===
              "Climate projections (Euro-CORDEX)" &&
              currentOverlayLayer.name === "River basins"
          )
        ) {
          componentNames.push("RiverBasins");
        }
      }
      return componentNames;
    },
  },
  methods: {
    gaugeClick(param) {
      this.$emit("gauge-click", param);
    },
    updateParentCurrentCenter(latlng) {
      this.$emit("update-current-center", latlng);
    },
  },
};
</script>

<style></style>
