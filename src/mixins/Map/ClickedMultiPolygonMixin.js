import { LPolygon, LGeoJson } from "vue2-leaflet";
import { Point } from "leaflet";
import {
  getGaugeMarkerStyle,
  findGauge,
  getDefaultItemName,
} from "../../components/Map/overlayLayersModes.js";
import maxAndMinValues from "../../../static/Max_And_Min_Basin-and-Oblasts.json";

export default {
  props: {
    selectedGauges: {
      type: Array || null,
      required: true,
    },
    currentEmissionScenario: {
      type: String,
      required: true,
    },
    currentPeriod: {
      type: String,
      required: true,
    },
    layerType: {
      type: String,
      required: true,
    },
    dataSeason: {
      type: String,
      required: true,
    },
    rgbaColors: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      style: getGaugeMarkerStyle(this.$options.overlay),
      maxAndMinValues: null,
      maxAndMinResult: null,
      selectedLayers: [],
      currentSelectedLayerId: null,
      point: Point,
    };
  },
  computed: {
    getMeassureUnit() {
      let meassureUnit = "";
      if (this.layerType === "Precipitation") {
        meassureUnit = "%";
      } else if (this.layerType === "Air temperature") {
        meassureUnit = " °C";
      }
      return meassureUnit;
    },
  },
  methods: {
    isSelectedGauge(properties) {
      return !!this.selectedGauges.find(
        findGauge(this.$options.overlay, properties)
      );
    },
    defineGaugeMarkerStyle(properties) {
      return this.isSelectedGauge(properties)
        ? this.style.active
        : this.style.passive;
    },
    getTargetPropertyName() {
      //eslint-disable-next-line
      let kindOfData = this.layerType === "Precipitation" ? "pcp" : "tmp";
      if (this.layerPrefix === "observed") {
        kindOfData = this.layerType === "Precipitation" ? "RR" : "Tm";
      }
      const endOfPeriod = parseInt(this.currentPeriod.split("-")[1]);
      let season;
      if (endOfPeriod <= 2020 && this.layerPrefix === "observed") {
        season =
          this.dataSeason === "annual"
            ? `${this.layerPrefix}_anom`
            : `${this.dataSeason}_${this.layerPrefix}_anom`;
      } else {
        season =
          this.dataSeason === "annual"
            ? `${this.currentEmissionScenario}_anom`
            : `${this.currentEmissionScenario}_anom_${this.dataSeason}`;
      }
      const targetPropertyName = [
        kindOfData,
        season,
        this.currentPeriod.split("-").join("_"),
      ].join("_");
      return targetPropertyName;
    },
    generateColorObj(layerProperties) {
      const kindOfData =
        this.layerType === "Precipitation" ? "Precipitation" : "Temperature";
      const targetPropertyName = this.getTargetPropertyName();
      const value = layerProperties[targetPropertyName];
      let color = "rgba(0, 0, 0, 0)";
      if (value) {
        let correctOpacity;
        const biggestValueModule =
          Math.abs(this.maxAndMinResult[`max${kindOfData}`]) >
          Math.abs(this.maxAndMinResult[`min${kindOfData}`])
            ? Math.abs(this.maxAndMinResult[`max${kindOfData}`])
            : Math.abs(this.maxAndMinResult[`min${kindOfData}`]);
        if (value > 0) {
          color = this.rgbaColors.maxValueColor.split(",");
          correctOpacity = value / biggestValueModule;
        } else if (value < 0) {
          color = this.rgbaColors.minValueColor.split(",");
          correctOpacity = Math.abs(value) / biggestValueModule;
        }
        if (value !== 0) {
          color[3] = ` ${correctOpacity})`;
          color = color.join();
        }
      }
      return color ? { fillColor: color } : {};
    },
    gaugeClickGeoJson(layer, properties) {
      if (this.layerIsReady) {
        layer.bringToFront();
        const center = layer.getBounds().getCenter();
        this.$emit("update-current-center", [center.lat, center.lng]);
        this.$nextTick(() =>
          this.$emit("gauge-click", {
            properties,
            clickedOverlay: this.$options.overlay,
          })
        );
        if (this.currentSelectedLayerId) {
          this.$refs[this.refName].mapObject._layers[
            this.currentSelectedLayerId
          ].setStyle(this.style.passive);
        }
        this.currentSelectedLayerId = layer._leaflet_id;
        if (this.isSelectedGauge(properties)) {
          layer.setStyle(this.style.passive);
        } else {
          layer.setStyle(this.style.active);
        }
      }
    },
    defineLayersStyle(layers) {
      layers.forEach((layer) => {
        layer.setStyle(this.defineGaugeMarkerStyle(layer.feature.properties));
      });
    },
    createTooltip(properties, lang) {
      return `${getDefaultItemName(this.$options.overlay, properties)[lang] || getDefaultItemName(this.$options.overlay, properties)}: ${
        properties[this.getTargetPropertyName()]
      }${this.getMeassureUnit}`;
    },
    loadColor() {
      Object.entries(this.$refs[this.refName].mapObject._layers).forEach(
        ([key, value]) => {
          this.$refs[this.refName].mapObject._layers[key].setStyle(
            this.generateColorObj(value.feature.properties)
          );
        }
      );
    },
    unbindTooltipToLayer(layer, properties) {
      if (!this.isSelectedGauge(properties)) {
        layer.bringToBack();
        layer.setStyle({
          dashArray: 1,
          color: this.style.passive.color,
        });
      }
      layer.unbindTooltip();
    },
    bindTooltipToLayer(layer, properties, lang) {
      //! Действие не соответствует названию метода, требует изменений
      if (!this.isSelectedGauge(properties)) {
        layer.bringToFront();
        layer.setStyle({
          dashArray: 4,
          color: this.style.active.color,
        });
      }
      layer.bindTooltip(this.createTooltip(properties, lang)).openTooltip();
    },
  },
  watch: {
    layerType() {
      this.loadColor();
    },
    dataSeason() {
      this.loadColor();
    },
    currentEmissionScenario() {
      this.loadColor();
    },
    currentPeriod() {
      this.loadColor();
    },
    selectedGauges() {
      if (this.selectedGauges.length < 1) {
        if (this.currentSelectedLayerId) {
          this.$refs[this.refName].mapObject._layers[
            this.currentSelectedLayerId
          ].setStyle(this.style.passive);
        }
      }
    },
  },
  mounted() {
    this.maxAndMinValues = maxAndMinValues.values;
    this.maxAndMinResult = maxAndMinValues.result;
    this.loadColor();
    setTimeout(() => {
      this.layerIsReady = true;
    }, 0);

    this.$emit("overlay-is-loaded");
  },

  components: {
    LPolygon,
    LGeoJson,
  },
};
