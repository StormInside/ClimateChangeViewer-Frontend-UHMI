<template>
  <div
    :style="{ height: mapHeight, width: mapWidth }"
    class="map-wrapper"
    ref="mapWrapper"
  >
    <div
      class="blocker-wrapper"
      v-show="overlayLayerIsLoading"
    >
      <div class="spinner-wrapper">
        <div class="spinner">
          <div class="spinner-dot"></div>
        </div>
      </div>
    </div>
    <div
      ref="mapToExport"
      class="mapToExport"
      :style="{ pointerEvents: overlayLayerIsLoading ? 'none' : 'auto' }"
    >
      <header class="header">
        <div class="logo logo--big">
          <img
            class="logo__img"
            src="@/assets/icons/inst.svg"
          />
          <template v-if="lang == 'ua'">
            Український Гідрометеорологічний Інститут
          </template>
          <template v-else>
            Ukrainian Hydrometeorological Institute
          </template>
        </div>
        <div class="logo logo--small">
          <img
            class="logo__img"
            src="@/assets/icons/lab-1.svg"
          />
          <div class="logo__divider"></div>
          <img
            v-if="lang == 'ua'"
            class="logo__icon"
            src="@/assets/icons/lab-1-text.svg"
          />
          <img
            v-else
            class="logo__icon"
            src="@/assets/icons/lab-1-text-eng.svg"
          />
        </div>

        <div class="name"><img
            src="@/assets/icons/logo.svg"
            class="name__logo"
          >
          <h2 class="name__name"> Climate Change Viewer </h2>
        </div>

        <!-- to 'center' name -->
        <div style="width: 460px;"></div>
      </header>
      <div style="position: relative; top: 80px;">
        <v-select
          :options="seasons.allSeasons"
          :label="$store.state.LangState.currLang"
          ref="seasonListComp"
          class="select-list gauges-list"
          v-model="seasons.currentSeason"
          v-show="!(isExportingToJpeg && isCurrentLayerWithoutColor)"
        ></v-select>

        <transition name="controlPanel-slide">
          <div
            class="discret-slider"
            v-if="showRangeSlider"
            :class="{ 'd-none': isExportingToJpeg && isCurrentLayerWithoutColor }"
          >
            <range-slider
              v-model="currentTimelineValue"
              :labels="getTimelineSlider.allTimelineValues"
              :endValue="getTimelineSlider.endValue"
              :currentEmissionScenario="currentEmissionScenario"
              :tooltipMode="getTimelineSlider.tooltipMode"
              :disabled="!mapLoaded"
              :isExportingToJpeg="isExportingToJpeg"
            ></range-slider>
          </div>
        </transition>

        <div class="map-action-buttons">
          <div
            class="layers-group-button-wrapper"
            @click="layersPanelShower()"
            v-show="!isExportingToJpeg"
            :class="{ 'layers-group-button-wrapper-open': showLayersPanel }"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="layer-group"
              class="svg-inline--fa fa-layer-group fa-w-16 layers-group-icon"
              :class="{ 'layers-group-icon-open': showLayersPanel }"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              :width="24.8 / 14 + 'rem'"
              :height="25.5 / 14 + 'rem'"
            >
              <path
                fill="currentColor"
                d="M12.41 148.02l232.94 105.67c6.8 3.09 14.49 3.09 21.29 0l232.94-105.67c16.55-7.51 16.55-32.52 0-40.03L266.65 2.31a25.607 25.607 0 0 0-21.29 0L12.41 107.98c-16.55 7.51-16.55 32.53 0 40.04zm487.18 88.28l-58.09-26.33-161.64 73.27c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.51 209.97l-58.1 26.33c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 276.3c16.55-7.5 16.55-32.5 0-40zm0 127.8l-57.87-26.23-161.86 73.37c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.29 337.87 12.41 364.1c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 404.1c16.55-7.5 16.55-32.5 0-40z"
              ></path>
            </svg>
          </div>
          <div
            class="map-icon-button-wrapper"
            @click="exportMapToJpeg()"
            v-tooltip.left="lang == 'en' ? 'Download map in .jpeg' : 'Завантажити мапу в .jpeg'"
            v-show="!isExportingToJpeg"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="file-image"
              class="svg-inline--fa fa-file-image fa-w-12 layers-group-icon"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              style="width: 1.771428571428571rem; height: 1.821428571428571rem"
            >
              <path
                fill="currentColor"
                d="M384 121.941V128H256V0h6.059a24 24 0 0 1 16.97 7.029l97.941 97.941a24.002 24.002 0 0 1 7.03 16.971zM248 160c-13.2 0-24-10.8-24-24V0H24C10.745 0 0 10.745 0 24v464c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24V160H248zm-135.455 16c26.51 0 48 21.49 48 48s-21.49 48-48 48-48-21.49-48-48 21.491-48 48-48zm208 240h-256l.485-48.485L104.545 328c4.686-4.686 11.799-4.201 16.485.485L160.545 368 264.06 264.485c4.686-4.686 12.284-4.686 16.971 0L320.545 304v112z"
              ></path>
            </svg>
          </div>

          <a
            class="map-icon-button-wrapper"
            v-tooltip.left="lang == 'en' ? 'Get additional information' : 'Додаткова інформація'"
            style="text-decoration: inherit"
            v-show="!isExportingToJpeg"
            @click="$emit('update-popup-show', true)"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="file-image"
              class="svg-inline--fa fa-file-image fa-w-16 layers-group-icon"
              role="img"
              :width="10 / 14 + 'rem'"
              :height="25.5 / 14 + 'rem'"
              viewBox="0 0 10 26"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.39355 21.0278H2.37012V13.9742H1.39355C0.854199 13.9742 0.416992 13.537 0.416992 12.9976V10.665C0.416992 10.1257 0.854199 9.68848 1.39355 9.68848H6.8623C7.40166 9.68848 7.83887 10.1257 7.83887 10.665V21.0278H8.81543C9.35479 21.0278 9.79199 21.465 9.79199 22.0043V24.3369C9.79199 24.8763 9.35479 25.3135 8.81543 25.3135H1.39355C0.854199 25.3135 0.416992 24.8763 0.416992 24.3369V22.0043C0.416992 21.465 0.854199 21.0278 1.39355 21.0278ZM5.10449 0.313477C3.16284 0.313477 1.58887 1.88745 1.58887 3.8291C1.58887 5.77075 3.16284 7.34473 5.10449 7.34473C7.04614 7.34473 8.62012 5.77075 8.62012 3.8291C8.62012 1.88745 7.04609 0.313477 5.10449 0.313477Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a
            class="map-icon-button-wrapper"
            v-tooltip.left="lang == 'en' ? 'Translate' : 'Переклад'"
            style="text-decoration: inherit; text-transform: uppercase;"
            v-show="!isExportingToJpeg"
            @click="$store.dispatch('CHANGE_LANG')"
          >
            {{ $store.state.LangState.currLang }}
          </a>
        </div>

        <transition name="controlPanel-slide">
          <v-select
            :options="[
              { label: $store.state.LangState.currLang == 'en' ? 'High emissons scenario' : 'Сценарій високих викидів', value: 'rcp85' },
              { label: $store.state.LangState.currLang == 'en' ? 'Middle emissons scenario' : 'Сценарій середніх викидів', value: 'rcp45' },
            ]"
            label="label"
            :reduce="(emissionScenario) => emissionScenario.value"
            ref="rcpSwitcher"
            v-tooltip.down="currentEmissionScenario === 'rcp85'
              ? (
                lang == 'en' ?
                  'Scenario when countries ignore measures to minimize emissions of greenhouse gases' :
                  'Сценарій, коли країни нехтують заходами зменшення викидів парникових газів'
              )
              : (
                lang == 'en' ?
                  'Scenario when countries apply measures to minimize emissions of greenhouse gases' :
                  'Сценарій, коли країни запроваджують заходи зменшення викидів парникових газів'
              )
              "
            class="rcp-switcher-wrapper select-list"
            v-model="currentEmissionScenario"
            v-show="!isExportingToJpeg"
          ></v-select>
        </transition>
      </div>

      <transition name="layers-panel-zoom-in-down">
        <div
          v-show="showLayersPanel"
          class="layers-panel"
          :class="{ 'd-none': isExportingToJpeg }"
          ref="layersPanel"
        >
          <span
            class="layers-panel__title layers-panel__title-select"
            @click="showBaseLayersPanel = !showBaseLayersPanel"
          >
            <p>
              <template v-if="$store.state.LangState.currLang == 'en'">Base layers</template>
              <template v-else>Базова мапа</template>
            </p>
            <ArrowIcon
              :class="{ 'layers-panel__arrow-open': showBaseLayersPanel }"
              :style="{
                transform: showBaseLayersPanel
                  ? `scale(${currentRootFontSize / 17.5}) rotate(180deg)`
                  : `scale(${currentRootFontSize / 17.5})`,
              }"
            />
          </span>
          <div v-if="showBaseLayersPanel">
            <ul>
              <li
                v-for="(layer, i) in mapData"
                :key="i"
                class="layers-panel__li"
                :class="{ 'layers-panel__li-open': layer === currentMapLayer }"
              >
                <input
                  type="radio"
                  :value="layer"
                  v-model="currentMapLayer"
                  :id="layer.name[$store.state.LangState.currLang]"
                  class="layers-panel__radio custom__radio"
                  @click="mapLayerSwitch(layer)"
                />
                <label :for="layer.name[$store.state.LangState.currLang]">{{ layer.name[$store.state.LangState.currLang]
                }}</label>
              </li>
              <li class="layers-panel__li">
                <input
                  type="radio"
                  class="layers-panel__checkbox custom__checkbox"
                  :value="{
                    parentName: 'Base layers',
                    name: {
                      'en': 'River basins',
                      'ua': 'Річкові басейни'
                    },
                    show: true,
                    type: 'radio',
                  }"
                  @click="
                    clickOnBaseOverlayLayer(
                      'radio',
                      'River basins',
                      'Base layers'
                    )
                    "
                  id="river-basins"
                  v-model="currentBaseOverlayLayer"
                />
                <label for="river-basins">
                  <template v-if="$store.state.LangState.currLang == 'en'">River basins</template>
                  <template v-else>Річкові басейни</template>
                </label>
              </li>
            </ul>
          </div>

          <div
            v-for="(overlay, i) in dynamicOverlayLayers.concat(
              dependentOverlayLayers
            )"
            :key="i"
          >
            <p class="layers-panel__title">{{ overlay.name[$store.state.LangState.currLang] }}</p>
            <div>
              <ul>
                <li
                  v-for="(overlayChildName, i) in overlay.overlayNames"
                  v-show="overlayChildName.show"
                  :key="i"
                  class="layers-panel__li"
                >
                  <input
                    :type="overlayChildName.type"
                    class="layers-panel__checkbox custom__checkbox"
                    :value="{
                      parentName: overlay.name.en,
                      name: overlayChildName.name.en,
                      show: overlayChildName.show,
                      realLabel: overlayChildName.realLabel,
                      chartTitle: overlayChildName.chartTitle,
                      type: overlayChildName.type,
                    }"
                    @click="
                      clickOnOptOverlayLayer(
                        overlayChildName.type,
                        overlayChildName.name.en,
                        overlay.name.en
                      )
                      "
                    :id="`${overlay.name.en}-${overlayChildName.name.en}`"
                    v-model="currentOptOverlayLayer"
                  />
                  <label :for="`${overlay.name.en}-${overlayChildName.name.en}`">{{
                    overlayChildName.name[$store.state.LangState.currLang]
                  }}</label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </transition>

      <transition name="chart-slide">
        <div
          v-show="showDefaultChart && selectedGauges.length"
          :class="{ 'd-none': isExportingToJpeg }"
          class="chart"
        >
          <div @click="closeChart()">
            <CloseIcon
              class="chart-close-btn"
              :width="16 / 14 + 'rem'"
              :height="16 / 14 + 'rem'"
            />
          </div>

          <custom-chart-simple
            :key="showDefaultChart"
            :chartType="currentChartType"
            :chartId="'default-line-chart'"
            :chartHeight="parseInt(235)"
            :chartMode="currentChartMode"
            :period="baselinePeriod"
            :additionalTexts="additionalTexts"
            :chartLabel="currentChartLabel"
            :parentIsExportingToImg="isExportingToJpeg"
          ></custom-chart-simple>
        </div>
      </transition>

      <transition name="chart-slide">
        <div
          v-if="scaleIsShow"
          class="scale"
        >
          <custom-scale
            :mode="getScaleObj.mode"
            :stepSize="getScaleObj.stepSize"
            :startValue="getScaleObj.startValue"
            :endValue="getScaleObj.endValue"
            :minValue="getScaleObj.minValue"
            :maxValue="getScaleObj.maxValue"
            :title="getScaleObj.title[$store.state.LangState.currLang]"
            :description="getScaleObj.description"
            :rgbaColors="getScaleObj.rgbaColors"
            :currentEmissionScenario="currentEmissionScenario"
          ></custom-scale>
        </div>
      </transition>

      <l-map
        ref="CustomMap"
        v-if="mapLoaded"
        :zoom="currentMapLayer.zoom"
        :center="mapParams.center"
        :options="getMapOptions"
        style="height: 100%"
        @update:center="centerUpdate"
        @update:zoom="zoomUpdate"
      >
        <l-control-attribution
          position="bottomleft"
          :prefix="false"
          class="custom-leaflet-attribution"
        ></l-control-attribution>
        <l-tile-layer
          v-for="tile in mapData"
          :key="tile.name.en || tile.name"
          :url="tile.url"
          :name="tile.name.en || tile.name"
          :attribution="tile.attribution"
          :subdomains="tile.subdomains"
          :tms="tile.tms"
          :visible="tile.visible"
          layer-type="base"
        />

        <all-overlays-simple
          :currentOverlayLayer="currentOverlayLayer"
          :selectedGauges="selectedGauges"
          :currentPeriod="currentTimelineValue"
          :currentEmissionScenario="currentEmissionScenario"
          :dataSeason="seasons.currentSeason.en.toLowerCase()"
          :rgbaColors="getScaleObj.rgbaColors"
          @gauge-click="gaugeClick"
          @update-current-center="updateMapCenter"
          @overlay-is-loaded="offBlockWrapper()"
        ></all-overlays-simple>
      </l-map>
    </div>
  </div>
</template>

<script>
/* Server import */
import { create } from "axios";
/* Absolute imports */
import qs from "qs";
/* Vue-Select Import */
import "vue-select/dist/vue-select.css";
/* Map import */
import { latLng, SVG } from "leaflet";
import { LMap, LTileLayer, LControlAttribution } from "vue2-leaflet";
import maxAndMinValues from "../../../static/Max_And_Min_Basin-and-Oblasts.json";
import maxAndMinValuesRCP45 from "../../../static/Max_And_Min_Basin-and-Oblasts_RCP45.json";
import maxAndMinValuesRCP85 from "../../../static/Max_And_Min_Basin-and-Oblasts_RCP85.json";
import dependentOverlayLayers from "../../../static/accordion-staticOverlayLayers.json";
import maxAndMinValuesHistorical from "../../../static/Scale_Limits_Values_Historical_Observations.json";
/* Helping modules import */
import {
  findGauge,
  findGaugeByGauge,
  filterGauge,
  getGaugeObj,
  getServerParams,
  checkOverlaysSelectedOption,
  getLayerType,
} from "./overlayLayersModes.js";
/* Event emitter import */
import { eventEmitter } from "../../main.js";
/* Timeline import */
const RangeSlider = () => import("../Timelines/RangeSlider.vue");
/* Tooltip import */
const CustomScale = () => import("./Tooltips/CustomScale.vue");
/* Chart import */
const CustomChartSimple = () => import("../Charts/CustomChartSimple.vue");
const AllOverlaysSimple = () => import("./AllOverlaysSimple.vue");
/* Icon imports */
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import ArrowIcon from "@/assets/icons/ArrowIcon.vue";

export default {
  props: {
    mapData: {
      type: Array,
      required: true,
    },
    mapHeight: {
      type: String,
      required: true,
    },
    mapWidth: {
      type: String,
      required: true,
    },
  },
  emits: ["unselect-chart", "close-chart", "generate-default-simple-chart"],
  name: "CustomMapSimple",
  data() {
    return {
      currentLayerType: "",
      selectedGauges: [],
      selectedLayers: [],
      mapRenderer: { renderer: new SVG({ padding: 0 }) },
      scaleObj: {},
      currentEmissionScenario: "rcp85",
      currentTimelineValue: "2011-2020",
      showDefaultChart: false,
      currentChartType: "line",
      currentGauge: "Select gauge on a map",
      currentChartMode: { mode: "Daily", option: "Mean" },
      showLayersPanel: false,
      showBaseLayersPanel: false,
      mapLoaded: false,
      popupShow: false,
      seasons: {
        allSeasons: [
          {
            en: "Annual",
            ua: "Рік"
          }, {
            en: "Winter",
            ua: "Зима"
          }, {
            en: "Spring",
            ua: "Весна"
          }, {
            en: "Summer",
            ua: "Літо"
          }, {
            en: "Autumn",
            ua: "Осінь"
          }
        ],
        currentSeason: {
          en: "Annual",
          ua: "Рік"
        },
      },
      currentMapLayer:
        this.mapData.find((layer) => layer.visible === true) || this.mapData[0],
      mapParams: {
        center: null,
        currentZoom: null,
        currentCenter: null,
      },
      currentOptOverlayLayer: {
        name: "Administrative oblasts",
        show: true,
        parentName: "Climate projections (Euro-CORDEX)",
        realLabel: "Air temperature",
        type: "radio",
        chartTitle: {
          en: "Air temperature, °С",
          ua: "Температура повітря, °С"
        },
      },
      currentBaseOverlayLayer: null,
      dynamicOverlayLayers: [],
      dependentOverlayLayers: [],
      currentChartLabel: "",
      clickedOverlayLayer: null,
      isExportingToJpeg: false,
      overlayLayerIsLoading: false,
      serverUrl: "http://212.26.138.5:5001/",
      serverKey:
        "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYyOTQwMjg5NywiaWF0IjoxNjI5NDAyODk3fQ.NRZxQT8LQws7vq5ZQAUZI4OZb37BAvvuvFb1Du8Nr2w",
      overlayMethods: {
        findGauge,
        findGaugeByGauge,
        filterGauge,
        getGaugeObj,
        checkOverlaysSelectedOption,
        getServerParams,
        getLayerType,
      },
      layerLoaded: true,
    };
  },
  computed: {
    lang() {
      return this.$store.state.LangState.currLang;
    },
    currentOverlayLayer() {
      return {
        optionalLayer: this.currentOptOverlayLayer,
        baseLayer: this.currentBaseOverlayLayer,
      };
    },
    showRangeSlider() {
      return this.currentOptOverlayLayer
        ? this.overlayMethods.getLayerType(this.currentOptOverlayLayer) !==
        "gauge"
        : true;
    },
    isCurrentLayerWithoutColor() {
      return ["gauge", "polygon"].includes(
        this.overlayMethods.getLayerType(this.currentOptOverlayLayer)
      );
    },
    getMapOptions() {
      return Object.assign(this.mapRenderer, this.currentMapLayer.mapOptions);
    },
    getTimelineSlider() {
      if (this.currentOptOverlayLayer) {
        if (
          this.currentOptOverlayLayer.parentName ===
          "Historical observations" &&
          this.currentOptOverlayLayer.name.includes("(1946-2020)")
        ) {
          return {
            tooltipMode: "historical",
            endValue: 84,
            allTimelineValues: {
              6: "1951-1960",
              18: "1961-1970",
              30: "1971-1980",
              42: "1981-1990",
              54: "1991-2000",
              66: "2001-2010",
              78: "2011-2020",
            },
          };
        }
      }
      return {
        tooltipMode: "projected",
        endValue: 144,
        allTimelineValues: {
          6: "1981-1990",
          18: "1991-2000",
          30: "2001-2010",
          42: "2011-2020",
          54: "2021-2030",
          66: "2031-2040",
          78: "2041-2050",
          90: "2051-2060",
          102: "2061-2070",
          114: "2071-2080",
          126: "2081-2090",
          138: "2091-2100",
        },
      };
    },
    baselinePeriod() {
      if (this.currentOptOverlayLayer) {
        if (
          this.currentOptOverlayLayer.parentName ===
          "Climate projections (Euro-CORDEX)"
        ) {
          return "1981-2010";
        } else if (
          this.currentOptOverlayLayer.parentName === "Historical observations"
        ) {
          return "1961-1990";
        }
      }
      return "1981-2020";
    },
    getScaleObj() {
      const rcpValues =
        this.currentEmissionScenario === "rcp85"
          ? this.maxAndMinValuesRCP85
          : this.maxAndMinValuesRCP45;
      if (this.currentOptOverlayLayer) {
        if (
          this.currentOptOverlayLayer.parentName ===
          "Climate projections (Euro-CORDEX)"
        ) {
          if (this.currentOptOverlayLayer.realLabel === "Precipitation" || this.currentOptOverlayLayer.realLabel === "Опади") {
            return {
              mode: "cold2hot",
              rgbaColors: {
                minValueColor: "rgba(105, 0, 33, 1)",
                maxValueColor: "rgba(7, 47, 97, 1)",
              },
              stepSize: 5,
              minValue: this.maxAndMinValues.result.minPrecipitation,
              maxValue: this.maxAndMinValues.result.maxPrecipitation,
              startValue: rcpValues.result.minPrecipitation,
              endValue: rcpValues.result.maxPrecipitation,
              title: {
                en: 'Precipitation change over 1981-2010, %',
                ua: 'Зміна опадів відносно 1981-2010, %'
              },
              description: ``,
            };
          }
          if (this.currentOptOverlayLayer.realLabel === "Air temperature" || this.currentOptOverlayLayer.realLabel === "Температура повітря") {
            return {
              mode: "cold2hot",
              stepSize: 0.5,
              rgbaColors: {
                minValueColor: "rgba(7, 47, 97, 1)",
                maxValueColor: "rgba(105, 0, 33, 1)",
              },
              minValue: this.maxAndMinValues.result.minTemperature,
              maxValue: this.maxAndMinValues.result.maxTemperature,
              startValue: rcpValues.result.minTemperature,
              endValue: rcpValues.result.maxTemperature,
              title: {
                en: `Air temperature change over 1981-2010, °C`,
                ua: `Зміна температури повітря відносно 1981-2010, °С`
              },
              description: ``,
            };
          }
        } else if (
          this.currentOptOverlayLayer.parentName ===
          "Historical observations" &&
          this.currentOptOverlayLayer.name.includes("(1946-2020)")
        ) {
          if (this.currentOptOverlayLayer.realLabel === "Precipitation" || this.currentOptOverlayLayer.realLabel === "Опади") {
            return {
              mode: "cold2hot",
              stepSize: 10,
              rgbaColors: {
                minValueColor: "rgba(105, 0, 33, 1)",
                maxValueColor: "rgba(7, 47, 97, 1)",
              },
              minValue: maxAndMinValuesHistorical.result.minPrecipitation,
              maxValue: maxAndMinValuesHistorical.result.maxPrecipitation,
              startValue: maxAndMinValuesHistorical.result.minPrecipitation,
              endValue: maxAndMinValuesHistorical.result.maxPrecipitation,
              title: {
                en: `Precipitation change over ${this.baselinePeriod}, %`,
                ua: `Зміна опадів відносно ${this.baselinePeriod}, %`
              },
              description: ``,
            };
          }
          return {
            mode: "cold2hot",
            stepSize: 0.5,
            rgbaColors: {
              minValueColor: "rgba(7, 47, 97, 1)",
              maxValueColor: "rgba(105, 0, 33, 1)",
            },
            minValue: maxAndMinValuesHistorical.result.minTemperature,
            maxValue: maxAndMinValuesHistorical.result.maxTemperature,
            startValue: maxAndMinValuesHistorical.result.minTemperature,
            endValue: maxAndMinValuesHistorical.result.maxTemperature,
            title: {
              en: `Air temperature change over ${this.baselinePeriod}, °C`,
              ua: `Зміна температури повітря відносно ${this.baselinePeriod}, °С`
            },
            description: ``,
          };
        }
      }
      return {
        mode: "cold2hot",
        stepSize: 5,
        rgbaColors: {
          maxValueColor: "rgba(7, 47, 97, 1)",
          minValueColor: "rgba(105, 0, 33, 1)",
        },
        minValue: this.maxAndMinValues.result.minPrecipitation,
        maxValue: this.maxAndMinValues.result.maxPrecipitation,
        startValue: rcpValues.result.minPrecipitation,
        endValue: rcpValues.result.maxPrecipitation,
        title: {
          en: `Precipitation change over ${this.baselinePeriod}, %`,
          ua: `Зміна опадів відносно ${this.baselinePeriod}, %`
        },
        description: ``,
      };
    },
    scaleIsShow() {
      return (
        (this.currentOptOverlayLayer
          ? this.currentOptOverlayLayer.realLabel === "Precipitation" || this.currentOptOverlayLayer.realLabel === "Опади" ||
          this.currentOptOverlayLayer.realLabel === "Air temperature" || this.currentOptOverlayLayer.realLabel === "Температура повітря" ||
          this.currentOptOverlayLayer.parentName === "Historical observations"
          : false) &&
        !["gauge", "polygon"].includes(
          this.overlayMethods.getLayerType(this.currentOptOverlayLayer)
        )
      );
    },
    additionalTexts() {
      if (this.currentOptOverlayLayer) {
        if (
          this.currentOptOverlayLayer.parentName ===
          "Climate projections (Euro-CORDEX)"
        ) {
          return {
            defaultMode:
            {
              en: "The ensemble mean is represented by line. The uncertainty ranges (values between 2.5 and 97.5 percentiles) are represented by shading.",
              ua: "Середнє значення ансамблю представлено лінією. Діапазон відхилень (значення від 2,5 до 97,5 процентилів) представлено затіненням."
            },
            anomaliesMode: "The ensemble mean is represented by line.",
          };
        } else if (
          this.currentOptOverlayLayer.parentName === "Historical observations"
        ) {
          return {
            defaultMode: "",
            anomaliesMode: "",
          };
        }
      }
      return {};
    },
    currentRootFontSize() {
      return parseFloat(document.querySelector(":root").style.fontSize) || 13.5;
    },
  },
  methods: {
    mapLayerSwitch(layer) {
      this.currentMapLayer.visible = false;
      this.currentMapLayer = layer;
      layer.visible = true;
    },
    clickOnOptOverlayLayer(type, name, parentName) {
      if (this.currentOptOverlayLayer) {
        if (type === "radio") {
          if (
            this.currentOptOverlayLayer.parentName === parentName &&
            this.currentOptOverlayLayer.name === name
          ) {
            this.currentOptOverlayLayer = null;
          }
        }
      }
    },
    clickOnBaseOverlayLayer(type, name, parentName) {
      if (this.currentBaseOverlayLayer) {
        if (type === "radio") {
          if (
            this.currentBaseOverlayLayer.parentName === parentName &&
            this.currentBaseOverlayLayer.name === name
          ) {
            this.currentBaseOverlayLayer = null;
          }
        }
      }
    },
    offBlockWrapper() {
      this.overlayLayerIsLoading = false;
    },
    zoomUpdate(zoom) {
      this.mapParams.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.mapParams.currentCenter = center;
    },
    updateMapCenter(center) {
      this.mapParams.center = latLng(center[0], center[1]);
    },
    closeChart() {
      this.showDefaultChart = false;
      this.currentGauge = null;
      this.clickedOverlayLayer = null;
      eventEmitter.$emit("close-chart");
      this.selectedLayers = [];
      this.selectedGauges = [];
    },
    isSelectedGauge(properties, clickedOverlay) {
      const res = !!this.selectedGauges.find(
        this.overlayMethods.findGauge(clickedOverlay, properties)
      );
      return res;
    },
    exportMapToJpeg() {
      this.isExportingToJpeg = true;
      this.$refs.mapToExport.style.cursor = "wait";
      this.$refs.mapToExport.style.pointerEvents = "none";
      const myTiles =
        this.$refs.CustomMap.$el.querySelectorAll("img.leaflet-tile");
      const tilesLeft = [];
      const tilesTop = [];
      for (let i = 0; i < myTiles.length; i += 1) {
        tilesLeft.push(
          parseFloat(myTiles[i].style.left.replace("px", "")) || 0
        );
        tilesTop.push(parseFloat(myTiles[i].style.top.replace("px", "")) || 0);
        myTiles[i].style.left = `${tilesLeft[i]}px`;
        myTiles[i].style.top = `${tilesTop[i]}px`;
      }
      const options = {
        width: this.$refs.mapToExport.clientWidth,
        height: this.$refs.mapToExport.clientHeight,
        windowWidth: document.documentElement.clientWidth,
        imageTimeout: 0,
        useCORS: true,
      };
      this.$nextTick(() => {
        this.$html2canvas(this.$refs.mapToExport, options)
          .then((canvas) => {
            let firstPartOfTitle = "Map";
            let secondPartOfTitle = "";
            if (this.currentOptOverlayLayer) {
              if (
                ["Air temperature", "Precipitation"].includes(
                  this.currentOptOverlayLayer.realLabel
                )
              ) {
                firstPartOfTitle += `_${this.currentOptOverlayLayer.realLabel
                  .split(" ")
                  .join("_")}`;
              }
              if (!this.isCurrentLayerWithoutColor) {
                secondPartOfTitle = `_${this.seasons.currentSeason[this.$store.state.LangState.currLang]
                  }_${this.currentTimelineValue.split("-").join("_")}_${parseInt(this.currentTimelineValue.split("-")[1]) <= 2021
                    ? "Historical"
                    : `Projected_${this.currentEmissionScenario.toUpperCase()}`
                  }`;
              }
            }
            const title = `${firstPartOfTitle}${secondPartOfTitle}`;
            const link = document.createElement("a");
            link.download = `${title}.jpeg`;
            this.isExportingToJpeg = false;
            this.$refs.mapToExport.style.cursor = "inherit";
            this.$refs.mapToExport.style.pointerEvents = "auto";
            const canvasURL = canvas.toDataURL("image/jpeg");
            link.href = canvasURL;
            link.click();
          })
          .catch((err) => {
            throw new Error(err);
          });
      });
    },
    unselectGauge(properties, clickedOverlay) {
      let deletedGauge;
      let deletedGaugesArr = [];
      const newSelectedGauges = this.selectedGauges.filter(
        this.overlayMethods.filterGauge(clickedOverlay, properties)
      );
      this.selectedGauges.forEach((gauge, i) => {
        if (!deletedGauge) {
          deletedGauge = gauge === newSelectedGauges[i] ? deletedGauge : gauge;
        }
      });
      deletedGaugesArr = this.selectedGauges.filter(
        this.overlayMethods.findGaugeByGauge(deletedGauge)
      );
      this.selectedGauges = newSelectedGauges;
      deletedGaugesArr.forEach((delGauge) => {
        eventEmitter.$emit("unselect-chart", {
          gauge: delGauge,
          clickedOverlay,
        });
      });
      if (
        !this.selectedGauges.some((gauge) => gauge.overlay === clickedOverlay)
      ) {
        this.clickedOverlayLayer = null;
      }
    },
    selectGauge(properties, clickedOverlay) {
      this.selectedGauges.push(
        this.overlayMethods.getGaugeObj(clickedOverlay, properties)
      );
      this.clickedOverlayLayer = clickedOverlay;
    },
    layersPanelShower() {
      this.showLayersPanel = !this.showLayersPanel;
      this.showBaseLayersPanel = false;
    },
    async requestDataForGauge(params, type) {
      const myAxios = create({
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: "repeat" }),
      });
      const res = await myAxios
        .get(`${this.serverUrl}${type}`, {
          params,
        })
        .then((res) => res.data);
      return res;
    },
    processGaugeServerData(dataObj, rcp, valType) {
      let defaultData = {};
      let movingData = {};
      let anomaliesData = {};
      let anomaliesMovingData = {};
      const labels = [];
      // Absolute values
      const defaultHist = [];
      let defaultRcp85 = [];
      let defaultRcp45 = [];
      let defaultNonRcp = [];
      // Anomalies(Differences) values
      const anomaliesHist = [];
      const anomaliesRcp85 = [];
      const anomaliesRcp45 = [];
      const anomaliesNonRcp = [];
      // Moving values
      const movingHist = [];
      let movingRcp85 = [];
      let movingRcp45 = [];
      let movingNonRcp = [];
      // Anomalies Moving values
      const anomaliesMovingHist = [];
      const anomaliesMovingRcp85 = [];
      const anomaliesMovingRcp45 = [];
      const anomaliesMovingNonRcp = [];
      Object.entries(dataObj).forEach((arr) => {
        arr[0] = arr[0].replace("means", "mean");
        if (valType) {
          arr[0] = `${valType}_${arr[0]}`;
        }
        const [key] = arr;
        if (key.includes("hist")) {
          if (key.includes("anomalies")) {
            if (key.includes("moving")) {
              anomaliesMovingHist.push(arr);
            } else {
              anomaliesHist.push(arr);
            }
          } else if (key.includes("moving")) {
            movingHist.push(arr);
          } else {
            defaultHist.push(arr);
          }
        } else if (key.includes("rcp45")) {
          if (key.includes("anomalies")) {
            if (key.includes("moving")) {
              anomaliesMovingRcp45.push(arr);
            } else {
              anomaliesRcp45.push(arr);
            }
          } else if (key.includes("moving")) {
            movingRcp45.push(arr);
          } else {
            defaultRcp45.push(arr);
          }
        } else if (key.includes("rcp85")) {
          if (key.includes("anomalies")) {
            if (key.includes("moving")) {
              anomaliesMovingRcp85.push(arr);
            } else {
              anomaliesRcp85.push(arr);
            }
          } else if (key.includes("moving")) {
            movingRcp85.push(arr);
          } else {
            defaultRcp85.push(arr);
          }
        } else if (key.includes("anomalies")) {
          if (key.includes("moving")) {
            anomaliesMovingNonRcp.push(arr);
          } else {
            anomaliesNonRcp.push(arr);
          }
        } else if (key.includes("moving")) {
          movingNonRcp.push(arr);
        } else if (key !== undefined) {
          defaultNonRcp.push(arr);
        }
      });
      defaultRcp45 = [
        ...defaultRcp45.slice(-1),
        defaultRcp45[1],
        defaultRcp45[0],
      ];
      defaultRcp85 = [
        ...defaultRcp85.slice(-1),
        defaultRcp85[1],
        defaultRcp85[0],
      ];

      movingRcp45 = [...movingRcp45.slice(-1), movingRcp45[1], movingRcp45[0]];
      movingRcp85 = [...movingRcp85.slice(-1), movingRcp85[1], movingRcp85[0]];

      if (defaultNonRcp.length > 0) {
        defaultNonRcp = [
          ...defaultNonRcp.slice(-1),
          defaultNonRcp[1],
          defaultNonRcp[0],
        ];
        defaultNonRcp.map((arr) => [`${arr[0]}_${rcp[0]}`, arr[1]]);
      }
      if (movingNonRcp.length > 0) {
        movingNonRcp = [
          ...movingNonRcp.slice(-1),
          movingNonRcp[1],
          movingNonRcp[0],
        ];
        movingNonRcp.map((arr) => [`${arr[0]}_${rcp[0]}`, arr[1]]);
      }

      defaultData = this.generateXY([
        ...defaultHist,
        ...defaultRcp45,
        ...defaultRcp85,
        ...defaultNonRcp,
      ]);
      anomaliesData = this.generateXY([
        ...anomaliesHist,
        ...anomaliesRcp45,
        ...anomaliesRcp85,
        ...anomaliesNonRcp,
      ]);

      movingData = this.generateXY([
        ...movingHist,
        ...movingRcp45,
        ...movingRcp85,
        ...movingNonRcp,
      ]);

      anomaliesMovingData = this.generateXY([
        ...anomaliesMovingHist,
        ...anomaliesMovingRcp45,
        ...anomaliesMovingRcp85,
        ...anomaliesMovingNonRcp,
      ]);
      return {
        defaultData,
        movingData,
        anomaliesData,
        anomaliesMovingData,
        labels,
      };
    },
    async getGaugeData(gauge) {
      let defaultData = {};
      let movingData = {};
      let anomaliesData = {};
      let anomaliesMovingData = {};
      const labels = [];
      let params;
      let serverData;
      let valueType;
      if (
        this.currentOptOverlayLayer.parentName ===
        "Climate projections (Euro-CORDEX)"
      ) {
        valueType =
          this.currentOptOverlayLayer.realLabel === "Precipitation"
            ? "pr"
            : "tas";
      }
      if (
        this.currentOptOverlayLayer.parentName === "Historical observations"
      ) {
        valueType =
          this.currentOptOverlayLayer.realLabel === "Precipitation"
            ? "rr"
            : ["tm", "tn", "tx"];
      }
      const serverParams = this.overlayMethods.getServerParams(gauge);
      const { rcp, type } = serverParams;

      if (Array.isArray(valueType)) {
        serverData = {};
        for (const valType of valueType) {
          params = Object.assign(serverParams, {
            value_type: valType,
            season:
              this.seasons.currentSeason.en === "Annual"
                ? undefined
                : this.seasons.currentSeason.en.toLowerCase(),
            key: this.serverKey,
          });
          const partServerData = await this.requestDataForGauge(params, type);
          serverData[valType] = partServerData;
        }
      } else {
        params = Object.assign(serverParams, {
          value_type: valueType,
          season:
            this.seasons.currentSeason.en === "Annual"
              ? undefined
              : this.seasons.currentSeason.en.toLowerCase(),
          key: this.serverKey,
        });
        serverData = await this.requestDataForGauge(params, type);
      }

      if (Array.isArray(valueType)) {
        Object.entries(serverData).forEach(([valType, dataObj]) => {
          const processedData = this.processGaugeServerData(
            dataObj,
            rcp,
            valType
          );
          defaultData = Object.assign(defaultData, processedData.defaultData);
          movingData = Object.assign(movingData, processedData.movingData);
          anomaliesData = Object.assign(
            anomaliesData,
            processedData.anomaliesData
          );
          anomaliesMovingData = Object.assign(
            anomaliesMovingData,
            processedData.anomaliesMovingData
          );
        });
      } else {
        let processedData = this.processGaugeServerData(serverData, rcp);
        defaultData = processedData.defaultData;
        movingData = processedData.movingData;
        anomaliesData = processedData.anomaliesData;
        anomaliesMovingData = processedData.anomaliesMovingData;
      }
      return {
        defaultData,
        movingData,
        anomaliesData,
        anomaliesMovingData,
        labels,
      };
    },
    generateXY(entries) {
      const res = {};
      entries.forEach((arr) => {
        if (arr) {
          const [key, value] = arr;
          res[key] = value.map((dtLb) => {
            const [x, y] = dtLb.map((num) => parseFloat(num));
            return { x, y };
          });
        }
      });
      return res;
    },
    updateChartType(overlay) {
      this.currentChartType =
        overlay.parentName === "Climate projections (Euro-CORDEX)"
          ? "area"
          : "line";
    },
    async loadChart(gauge, mode) {
      this.updateChartType(gauge.overlay);
      const {
        defaultData,
        anomaliesData,
        movingData,
        anomaliesMovingData,
        labels,
      } = await this.getGaugeData(gauge);
      this.showDefaultChart = true;
      const label = gauge.getGaugeName;
      this.$nextTick(() => {
        // this.$nextTick() используется для корректного ре-рендеринга графика
        if (
          !this.currentChartLabel[this.$store.state.LangState.currLang].includes(`(${this.seasons.currentSeason[this.$store.state.LangState.currLang]})`)
        ) {
          this.currentChartLabel[this.$store.state.LangState.currLang] +=
            this.seasons.currentSeason.en === "Annual"
              ? ``
              : ` (${this.seasons.currentSeason[this.$store.state.LangState.currLang]})`;
        }
        eventEmitter.$emit("generate-default-simple-chart", {
          label,
          data: {
            defaultData,
            anomaliesData,
            movingData,
            anomaliesMovingData,
          },
          labels,
          clickedOverlay: gauge.overlay,
          mode,
          chartTitle: this.currentOptOverlayLayer.chartTitle,
          fromDate: gauge.fromDate,
          toDate: gauge.toDate,
        });
      });
      return true;
    },
    updateCurrentOverlayLayer() {
      const checkedOverlaysSelectedOption =
        this.overlayMethods.checkOverlaysSelectedOption(
          this.$store.getters.getCurrentSelectedOption,
          this.dynamicOverlayLayers
        );
      checkedOverlaysSelectedOption.forEach((overlay) => {
        let overlayInAll = this.dynamicOverlayLayers.find(
          (over) => over.name === overlay.parentName
        );
        if (overlayInAll) {
          overlayInAll.overlayNames.find(
            (over) => over.name === overlay.name.en
          ).show = overlay.show;
          overlayInAll = JSON.parse(
            JSON.stringify(
              overlayInAll.overlayNames.find(
                (over) => over.name === overlay.name.en
              )
            )
          );
          overlayInAll.parentName = overlay.parentName;
        }
      });
    },
    gaugeClick(params) {
      const { properties, clickedOverlay } = params;
      if (this.isSelectedGauge(properties, clickedOverlay)) {
        this.unselectGauge(properties, clickedOverlay);
        return false;
      }
      this.selectGauge(properties, clickedOverlay);
      eventEmitter.$emit("close-chart");
      this.$nextTick(() => {
        if (this.selectedGauges.length < 2) {
          this.loadChart(
            this.selectedGauges[this.selectedGauges.length - 1],
            "generate"
          );
        }
      });
      return true;
    },
    acceptOverlays(childOverlays) {
      const overlays = JSON.parse(JSON.stringify(childOverlays));
      overlays.forEach((overlay) => {
        this.currentLayerType = overlay.realLabel;
        overlay.overlayNames.forEach((childOverlay) => {
          let anotherShow;
          if (this.currentOptOverlayLayer) {
            if (
              childOverlay.name.en === this.currentOptOverlayLayer.name &&
              overlay.name.en === this.currentOptOverlayLayer.parentName &&
              overlay.type === this.currentOptOverlayLayer.type &&
              childOverlay.show !== this.currentOptOverlayLayer.show
            ) {
              anotherShow = this.currentOptOverlayLayer;
            }
            if (anotherShow) {
              childOverlay.show = anotherShow.show;
            }
          }
        });
      });
      this.dynamicOverlayLayers = overlays;
    },
    removeOverlay(overlay) {
      this.dynamicOverlayLayers = this.dynamicOverlayLayers.filter((over) => {
        if (over.name === overlay.name.en) {
          return over.parentName !== overlay.parentName;
        }
        return true;
      });
      if (this.currentOptOverlayLayer) {
        if (
          this.currentOptOverlayLayer.parentName === overlay.name.en &&
          overlay.overlayNames.some(
            (over) => over.name === this.currentOptOverlayLayer.name
          )
        ) {
          this.currentOptOverlayLayer = null;
        }
      }
    },
    replaceOverlayStrParams(strParams) {
      // Здесь мы делаем замену типа слоёв с "Air temperature" на "Precipitation" и наоборот
      this.dynamicOverlayLayers.forEach((mainOverlay) => {
        mainOverlay.realLabel = strParams.realLabel;
        mainOverlay.defaultOverlayNames.forEach((overlay) => {
          overlay.realLabel = strParams.realLabel;
          overlay.chartTitle = strParams.chartTitle;
        });
        mainOverlay.overlayNames.forEach((overlay) => {
          overlay.realLabel = strParams.realLabel;
          overlay.chartTitle = strParams.chartTitle;
        });
      });
      if (this.currentOptOverlayLayer) {
        this.currentOptOverlayLayer.realLabel = strParams.realLabel;
        this.currentOptOverlayLayer.chartTitle = strParams.chartTitle;
      }
    },
  },
  watch: {
    currentOptOverlayLayer(newVal, oldVal) {
      if (this.clickedOverlayLayer) {
        if (!this.currentOptOverlayLayer) {
          this.clickedOverlayLayer = null;
        } else if (
          this.currentOptOverlayLayer.name !== this.clickedOverlayLayer.name ||
          this.currentOptOverlayLayer.parentName !==
          this.clickedOverlayLayer.parentName ||
          this.currentOptOverlayLayer.type !== this.clickedOverlayLayer.type
        ) {
          this.clickedOverlayLayer = null;
        }
      }
      if (this.currentOptOverlayLayer) {
        this.overlayLayerIsLoading = true;
        if (!this.currentOptOverlayLayer.show) {
          this.currentOptOverlayLayer = null;
        } else if (
          this.currentOptOverlayLayer.parentName ===
          "Historical observations" &&
          this.currentOptOverlayLayer.name.includes("(1946-2020)")
        ) {
          this.currentTimelineValue = "1951-1960";
        }
      }
      if (
        oldVal?.parentName === "Historical observations" &&
        oldVal?.name.includes("(1946-2020)") &&
        newVal.parentName !== "Historical observations" &&
        !newVal?.name.includes("(1946-2020)")
      ) {
        this.currentTimelineValue = "2011-2020";
      }
    },
    "currentOptOverlayLayer.realLabel": function (newVal, oldVal) {
      if (
        oldVal &&
        newVal &&
        this.selectedGauges[0] &&
        this.currentOptOverlayLayer
      ) {
        if (
          this.selectedGauges[0].overlay.parentName ===
          this.currentOptOverlayLayer.parentName
        ) {
          if (newVal !== oldVal) {
            eventEmitter.$emit("close-chart");
            this.selectedGauges.forEach((gauge) => {
              this.loadChart(gauge, "re-render");
            });
          }
        }
      }
    },
    clickedOverlayLayer(newVal, oldVal) {
      if (newVal === null && oldVal !== null) {
        this.closeChart();
        eventEmitter.$emit("close-chart");
      }
    },
    "seasons.currentSeason": function () {
      this.currentChartLabel = this.currentGauge.getGaugeName;
      eventEmitter.$emit("close-chart");
      this.selectedGauges.forEach((gauge) => {
        this.loadChart(gauge, "re-render");
      });
    },
    dynamicOverlayLayers() {
      this.updateCurrentOverlayLayer();
    },
    selectedGauges() {
      if (this.selectedGauges.length > 1) {
        this.selectedGauges = [
          this.selectedGauges[this.selectedGauges.length - 1],
        ];
      }
      if (this.selectedGauges.length < 1) {
        this.showDefaultChart = false;
        this.currentGauge = "Select gauge on a map";
        eventEmitter.$emit("close-chart");
      } else {
        this.currentGauge = this.selectedGauges[this.selectedGauges.length - 1];
      }
    },
    currentChartLabel() {
      if (!this.currentChartLabel && this.showDefaultChart) {
        this.showDefaultChart = false;
      }
    },
    currentGauge() {
      if (!this.currentGauge) {
        this.currentGauge = "Select gauge on a map";
      }
      this.currentChartLabel = this.currentGauge.getGaugeName;
    }
  },
  created() {
    this.maxAndMinValues = maxAndMinValues;
    this.maxAndMinValuesRCP45 = maxAndMinValuesRCP45;
    this.maxAndMinValuesRCP85 = maxAndMinValuesRCP85;
    this.dependentOverlayLayers = dependentOverlayLayers.data;
  },
  mounted() {
    this.mapParams.center = latLng(
      this.currentMapLayer.center[0],
      this.currentMapLayer.center[1]
    );
    this.mapParams.currentZoom = this.currentMapLayer.zoom;
    this.mapParams.currentCenter = this.currentMapLayer.center;
    this.mapLoaded = true;
    localStorage.setItem("current-hidden-legend-items", JSON.stringify([]));
    this.$store.dispatch("CHANGE_CURRENT_CLICKED_OVERLAY_LAYERS", []);
    this.$store.dispatch("RESET_CURRENT_CHILD_OVERLAYS");
    eventEmitter.$on("remove-overlay", this.removeOverlay);
    eventEmitter.$on("accept-overlay", this.acceptOverlays);
    eventEmitter.$on("replace-realLabel", this.replaceOverlayStrParams);
    const svgArrowRcpSwitcher =
      this.$refs.rcpSwitcher.$refs.actions.querySelector(".vs__open-indicator");
    const svgArrowSeason =
      this.$refs.seasonListComp.$refs.actions.querySelector(
        ".vs__open-indicator"
      );
    svgArrowSeason.setAttribute(
      "height",
      0.7142857142857143 * this.currentRootFontSize
    );
    svgArrowRcpSwitcher.setAttribute(
      "height",
      0.7142857142857143 * this.currentRootFontSize
    );
    svgArrowSeason.setAttribute("width", 1 * this.currentRootFontSize);
    svgArrowRcpSwitcher.setAttribute("width", 1 * this.currentRootFontSize);
    svgArrowSeason.currentScale = this.currentRootFontSize / 14;
    svgArrowRcpSwitcher.currentScale = this.currentRootFontSize / 14;
  },
  beforeDestroy() {
    this.closeChart();
  },
  components: {
    LMap,
    LTileLayer,
    CustomChartSimple,
    AllOverlaysSimple,
    RangeSlider,
    CustomScale,
    LControlAttribution,
    CloseIcon,
    ArrowIcon,
  },
};
</script>

<style lang="scss" scoped>
.map-wrapper {
  max-height: 100vh;
  pointer-events: auto;
}

.mapToExport,
.blocker-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
}

.header {
  position: absolute;
  width: 100%;
  height: 60px;
  z-index: 1000;
  padding: 0 36px;
  display: flex;
  flex-direction: row;
  background-color: rgba(173, 173, 173, 0.4);
  backdrop-filter: blur(150px);
  color: #404040;
  font-family: Roboto;

  .logo {
    display: flex;
    flex-direction: row;
    align-items: center;

    &--big {
      max-width: 220px;
      gap: 16px;
      font-size: 10px;
      font-weight: 700;
    }

    &--small {
      width: 160px;
      margin-left: 80px;
    }

    &__divider {
      position: relative;
      height: 17px;
      width: 1px;
      background-color: #690021;
      margin-left: 10px;
      margin-right: 5px;
    }
  }

  .name {
    width: 470px;
    display: flex;
    flex-direction: row;
    gap: 0 12px;
    margin: auto;
    height: 36px;
    justify-content: center;
    align-items: center;

    &__logo {
      height: 36px;
    }

    &__name {
      color: #855515;
      font-weight: 500;
      font-size: 24px;
    }
  }
}

.spinner-wrapper {
  position: absolute;
  z-index: 1000;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
}

.spinner {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: calc(50px / 9) solid $main-darkbrown;
  animation: spin 0.5s ease-in-out infinite;
}

.spinner-dot {
  width: calc(50px / 9);
  height: calc(50px / 7);
  background-color: $main-brown;
  position: relative;
  top: 3%;
  transform: rotate(227deg);
}

@keyframes spin {
  0% {
    transform: rotate(0deg) scale(1);
  }

  100% {
    transform: rotate(360deg) scale(1.1);
  }
}

.blocker-wrapper {
  position: absolute;
  z-index: 10000;
  cursor: progress !important;
}

.chart {
  position: absolute;
  top: calc(100% - #{$map-simple-chart-height});
  left: calc(100% - #{$map-simple-chart-width});
  max-width: $map-simple-chart-width;
  width: $map-simple-chart-width;
  height: $map-simple-chart-height;
  min-height: fit-content;
  background-color: $main-white;
  border: $map-chart-border;
  padding: $map-simple-chart-padding;
  border-radius: $control-panel-border-radius;
  z-index: 500;
}

@keyframes chart-slideup {
  0% {
    transform: translateY($map-simple-chart-height);
  }

  100% {
    transform: translateY(0px);
  }
}

@keyframes chart-slidedown {
  100% {
    transform: translateY($map-simple-chart-height);
  }
}

.chart-slide-enter-active {
  animation: chart-slideup 0.5s ease-in-out;
  animation-fill-mode: forwards;
}

.chart-slide-leave-active {
  animation: chart-slidedown 0.5s ease-in-out;
  animation-fill-mode: forwards;
}

.chart-close-btn {
  cursor: pointer;
  position: absolute;
  left: calc(#{$map-simple-chart-width} - #{$map-chart-close-btn-width} - #{$map-chart-close-btn-margin-left});
  top: 0.2857142857142857rem; //
}

.scale {
  width: fit-content;
  height: fit-content;
  border: 1px solid $main-darkbrown-opacity;
  position: absolute;
  bottom: 1.071428571428571rem; //  15px / 14
  left: 1.071428571428571rem; //  15px / 14
  z-index: 500;
  border-radius: $control-panel-border-radius-small;
}

.map-action-buttons {
  position: absolute;
  z-index: 500;
  top: $viz-control-position-top;
  right: $map-icons-margin-left;
  display: flex;
  flex-direction: column;
  width: fit-content;
}

.layers-group-button-wrapper,
.map-icon-button-wrapper {
  background-color: $main-white-opacity2;
  border: $layers-group-icon-border-width solid $main-darkbrown-opacity;
  border-radius: $layers-group-icon-border-radius;
  height: $control-panel-height;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $main-darkbrown-opacity;
  cursor: pointer;
  padding: $layers-group-icon-padding;
}

.map-icon-button-wrapper {
  margin-top: 10px;
}

.layers-group-button-wrapper:hover,
.map-icon-button-wrapper:hover {
  color: $main-darkbrown;
  background-color: $main-white;
  border: $layers-group-icon-border-width solid $main-darkbrown;
}

.layers-group-button-wrapper:hover>.layers-group-icon,
.map-icon-button-wrapper:hover>.layers-group-icon {
  transform: $control-panel-icon-hover-transform;
}

.layers-group-icon {
  font-size: $layers-group-icon-size;
  color: inherit;
  transition: $layers-group-icon-transition;
}

.layers-group-button-wrapper-open {
  color: $main-darkbrown;
  background-color: $main-white;
  border: $layers-group-icon-border-width solid $main-darkbrown;
}

.layers-group-icon-open {
  transform: $control-panel-icon-hover-transform;
}

.layers-panel {
  position: absolute;
  z-index: 500;
  right: calc(#{$layers-group-icon-size} + #{$layers-group-icon-padding} + #{$map-lists-margin-left} + 0.8571428571428571rem); //  12px / 14
  top: calc(#{$viz-control-position-top} + #{$layers-group-icon-size} + #{$layers-group-icon-padding} + calc(#{$layers-group-icon-border-width} * 2) + 8px);
  border: $layers-group-icon-border-width solid $main-darkbrown;
  border-radius: $layers-group-icon-border-radius;
  min-height: fit-content;
  max-width: fit-content;
  padding: 3px 0 5px 0;
  background-color: $main-white-opacity2;
  font-family: $child-text-font;
  color: $main-darkbrown;
}

.layers-panel__li {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  flex-wrap: nowrap;
  font-size: $control-panel-font-size-small;
  padding: $layers-group-padding-top-bottom $layers-group-padding-left-right;
}

.layers-panel__li:hover {
  background-color: $main-darkbrown-opacity;
  color: $main-white;
  border: $layers-group-icon-border-width solid $main-darkbrown;
  border-width: $layers-group-icon-border-width 0;
  margin: -$layers-group-icon-border-width 0;
}

.layers-panel__li-open {
  background-color: $main-darkbrown-opacity;
  color: $main-white;
}

.layers-panel__li>label {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.layers-panel__li>input {
  margin-right: $layers-group-elements-margin-right;
  cursor: pointer;
}

.layers-panel__checkbox+label::before {
  margin-right: $layers-group-elements-margin-right;
}

.layers-panel__radio+label::before {
  margin-right: $layers-group-elements-margin-right;
}

.layers-panel__arrow {
  position: absolute;
  left: calc(100% - #{$layers-group-padding-left-right} - #{$layers-group-input-size});
}

.layers-panel__arrow-open {
  fill: $main-darkbrown;
}

.layers-panel__title {
  font-size: $control-panel-font-size;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 calc(#{$layers-group-padding-left-right} + #{$layers-group-input-size}) 0 $layers-group-padding-left-right;
  margin: 2px 0;
  transition: all 0.3s ease-in-out 0s;
}

.layers-panel__title>p {
  margin-right: 2px;
}

.layers-panel__title-select:hover {
  cursor: pointer;
}

.layers-panel-zoom-in-down-enter-active,
.layers-panel-zoom-in-down-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
    opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: center top;
}

.layers-panel-zoom-in-down-enter,
.layers-panel-zoom-in-down-enter-from,
.layers-panel-zoom-in-down-leave-to {
  opacity: 0;
  transform: scaleY(0);
}

@keyframes controlPanel-slidedown {
  0% {
    transform: translateY(calc(-1.5 * (#{$viz-control-position-top} + #{$control-panel-height})));
  }

  100% {
    transform: translateY(0px);
  }
}

@keyframes controlPanel-slideup {
  0% {
    transform: translateY(0px);
  }

  100% {
    transform: translateY(calc(-1.5 * (#{$viz-control-position-top} + #{$control-panel-height})));
  }
}

.controlPanel-slide-enter-active {
  animation: controlPanel-slidedown 0.5s ease-in-out;
  animation-fill-mode: forwards;
}

.controlPanel-slide-leave-active {
  animation: controlPanel-slideup 0.5s ease-in-out;
  animation-fill-mode: forwards;
}

.select-list {
  position: absolute;
  z-index: 600;
  background-color: $main-white;
  border-radius: $control-panel-border-radius;
  height: $control-panel-height;
  max-height: $control-panel-height;
  color: $main-darkbrown;
}

// .vs--open,
.vs__open-indicator {
  transform: scale(2) !important;
}

.gauges-list {
  top: $viz-control-position-top;
  left: calc(#{$map-gauges-list-width} + #{$map-lists-margin-left});
  width: $map-gauges-list-width;
}

.chart-modes-list {
  top: $viz-control-position-top;
  left: calc(#{$timeline-width} + #{$map-gauges-list-width} + #{$map-lists-margin-left} + #{$accordion-width} + #{$map-lists-margin-left} + #{$map-lists-margin-left});
  max-width: $map-chart-lists-width;
  width: $map-chart-lists-width;
}

.chart-options-list {
  top: $viz-control-position-top;
  left: calc(#{$timeline-width} + #{$map-gauges-list-width} + #{$map-lists-margin-left} + #{$accordion-width} + #{$map-lists-margin-left} + #{$map-lists-margin-left} + #{$map-chart-lists-width} + #{$map-lists-margin-left});
  width: $map-chart-lists-width;
  max-width: $map-chart-lists-width;
}

.discret-slider {
  position: absolute;
  z-index: 550;
  width: $timeline-width;
  height: $map-discret-slider-height;
  top: calc(#{$viz-control-position-top} + #{$control-panel-height} - 1.285714285714286rem);
  font-family: $child-text-font;
  color: $main-darkbrown;
  left: calc(50% - (#{$timeline-width} / 2));
}

.rcp-switcher-wrapper {
  position: absolute;
  z-index: 500;
  top: $viz-control-position-top;
  // right: 215px;
  right: calc(50% - (15.76923076923077rem / 2) + 60px);
  // right: 315px;
  width: 15.76923076923077rem; // 205px / 13
}

.d-none {
  display: none !important;
}

// Media querys
@media (max-width: 1279px) {
  .rcp-switcher-wrapper {
    // right: 82px;
    right: calc(15% - (15.76923076923077rem / 2) + 30px);
  }

  .discret-slider {
    left: calc(53.7% - (#{$timeline-width} / 2));
  }
}

@media (max-width: 1024px) {
  .rcp-switcher-wrapper {
    // right: 5.857142857142857rem; //  82px / 14
    right: 50px;
  }

  .discret-slider {
    left: calc(55% - (#{$timeline-width} / 2));
  }
}

@media (max-width: 800px) {
  .rcp-switcher-wrapper {
    // right: 5rem; //  70px / 14
    right: 35px;
  }

  .discret-slider {
    left: calc(55.75% - (#{$timeline-width} / 2));
  }
}

@media (min-width: 1280px) {
  .rcp-switcher-wrapper {
    right: 80px;
    // calc(54% - ((15.76923076923077rem / 2) + #{$timeline-width}) - 60px)
  }

  .discret-slider {
    left: calc(55.5% - (#{$timeline-width} / 2));
  }
}

@media (min-width: 1360px) {
  .discret-slider {
    left: calc(54.8% - (#{$timeline-width} / 2));
  }
}

@media (min-width: 1440px) {
  .rcp-switcher-wrapper {
    right: 205px; // 30px расстояние
    // right: calc(54% - ((15.76923076923077rem / 2) + #{$timeline-width}) - 60px);
  }

  .discret-slider {
    left: calc(54% - (#{$timeline-width} / 2));
  }
}
</style>
