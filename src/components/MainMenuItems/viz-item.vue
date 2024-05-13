<template>
  <div
    class="viz-wrapper"
    :style="{ width: '100vw', minWidth: screenWidth + 'px' }"
  >
    <PopupInfo
      :style="{ minWidth: screenWidth + 'px' }"
      :popupShow="popupShow"
      v-show="this.popupShow"
      @update-popup-show="
        (popupShow) => {
          this.popupShow = popupShow;
        }
      "
    ></PopupInfo>
    <custom-map-simple
      @update-popup-show="updatePopupShow"
      :mapData="mapsData.mapOfUkraine"
      :mapHeight="'100%'"
      :mapWidth="'100%'"
      @set-current-gauge-date="setDate($event)"
      class="viz-map"
    >
    </custom-map-simple>

    <two-lvl-accordion
      class="viz-accordion"
      :data="accordionData"
    ></two-lvl-accordion>

    <!-- <timeline-calendar class="viz-timeline"></timeline-calendar> -->
  </div>
</template>

<script>
/* Accordion */
import TwoLvlAccordion from "../Accordions/TwoLvlAccordion.vue";
import accordionDataJSON from "../Accordions/accordion-data-site.json";
/* Map */
import CustomMapSimple from "../Map/CustomMapSimple.vue";
const PopupInfo = () => import("../Map/Tooltips/PopupInfo.vue");
import mapsData from "../Map/maps-data.json";

export default {
  name: "viz-item",
  data() {
    return {
      maxScreenWidth: null,
      accordionData: [],
      mapsData: {},
      popupShow: false,
    };
  },
  components: {
    TwoLvlAccordion,
    CustomMapSimple,
    PopupInfo,
  },
  methods: {
    updatePopupShow(popupShowVal) {
      this.popupShow = popupShowVal;
    },
  },
  created() {
    this.screenWidth = window.screen.width; // Для сайта
    this.accordionData = accordionDataJSON.vizItem.twoLvlAccordionData;
    this.mapsData = mapsData.vizItem;
  },
};
</script>

<style lang="scss">
.viz-wrapper {
  height: calc(100vh - 10px);
  min-height: $main-content-min-height; // Для сайта
  min-width: 100vw; // Для сайта
  position: relative;
}
.viz-map {
  position: relative;
  top: 0;
  left: 0px;
  z-index: 0;
  overflow: hidden;
  min-height: $main-content-min-height;
}
.viz-accordion {
  position: absolute;
  top: calc($viz-control-position-top + 60px);
  left: 1px;
  z-index: 1;
  max-height: calc(100vh - 165px);
}
.viz-timeline {
  position: absolute;
  top: $viz-control-position-top;
  left: 500px;
  z-index: 1;
}
.viz-accordion::-webkit-scrollbar {
  width: 10px;
}
.viz-accordion::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(189, 176, 176, 0.3);
  background-color: $main-white;
}
.viz-accordion::-webkit-scrollbar-thumb {
  background-color: $main-brown;
  outline: 1px solid $main-darkbrown;
}
</style>
