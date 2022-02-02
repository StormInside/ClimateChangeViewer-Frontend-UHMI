<template>
  <v-main>
    <v-container fluid class="pa-0">
      <div style="height: 100vh; width: 100vw">
        <l-map
          ref="map"
          style="width: 100%; height: 100%"
          :center="mapsData.mapConfig.center"
          :zoom="mapsData.mapConfig.zoom"
          :options="mapsData.mapOptions"
          @mousemove="mousemove($event)"
        >
          <l-control>
            <lazy-layers-control-panel-main-control
              @screenshot="saveMapImage"
            />
          </l-control>
          <l-control-attribution position="bottomleft" :prefix="false" />
          <component :is="geoComponentInfo" />
          <l-tile-layer
            v-for="tile in mapsData.mapsProviders"
            :key="tile.name"
            :url="tile.url"
            :name="tile.name"
            :subdomains="tile.subdomains"
            :tms="tile.tms"
            :visible="tile.visible"
            layer-type="base"
          />
          <component :is="geoComponent" />
        </l-map>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex'
import { SimpleMapScreenshoter } from 'leaflet-simple-map-screenshoter'
import { saveAs } from 'file-saver'

export default {
  name: 'IndexPage',
  data() {
    return {
      output: null,
      map: {},
    }
  },
  computed: {
    ...mapGetters('map', ['mapsData', 'geoComponent', 'geoComponentInfo']),
  },
  mounted() {
    this.$nextTick(() => {
      this.map = this.$refs.map.mapObject
    })
  },
  methods: {
    mousemove(event) {
      this.$store.commit('geoJson/setTooltipPositionCoordinates', {
        x: event.originalEvent.clientX,
        y: event.originalEvent.clientY,
      })
    },
    saveMapImage() {
      const pluginOptions = {
        ropImageByInnerWH: true,
        hidden: true,
        domtoimageOptions: {
          height: 1080,
          width: 1920,
        },
        mimeType: 'image/png',
        caption: null,
      }
      this.simpleMapScreenshoter = new SimpleMapScreenshoter(
        pluginOptions
      ).addTo(this.map)
      const format = 'image'
      this.simpleMapScreenshoter
        .takeScreen(format, pluginOptions)
        .then((image) => {
          saveAs(image, 'image.jpg')
        })
    },
  },
}
</script>
