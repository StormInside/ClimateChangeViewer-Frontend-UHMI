<template>
  <v-main>
    <v-container fluid class="pa-0">
      <div style="height: 100vh; width: 100vw">
        <client-only>
          <l-map
            :center="mapsData.mapConfig.center"
            :zoom="mapsData.mapConfig.zoom"
            :options="mapsData.mapOptions"
            @mousemove="mousemove($event)"
          >
            <l-control>
              <lazy-layers-control-panel-main-control />
            </l-control>
            <l-control-attribution position="bottomleft" :prefix="false" />
            <component :is="geoComponentInfo" />
            <l-tile-layer
              v-for="tile in mapsData.mapsProviders"
              :key="tile.name"
              :url="tile.url"
              :name="tile.name"
              :attribution="tile.attribution"
              :subdomains="tile.subdomains"
              :tms="tile.tms"
              :visible="tile.visible"
              layer-type="base"
            />
            <component :is="geoComponent" class="layers" />
          </l-map>
        </client-only>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'IndexPage',
  computed: {
    ...mapGetters('map', [
      'mapsData',
      'geoComponent',
      'geoComponentInfo',
      'ukraineBordersShow',
    ]),
  },
  methods: {
    mousemove(event) {
      this.$store.commit('geoJson/setTooltipPositionCoordinates', {
        x: event.originalEvent.clientX,
        y: event.originalEvent.clientY,
      })
    },
  },
}
</script>
<style scoped lang="scss">
.uaLayer {
  position: absolute;
  z-index: 1;
}
.layers {
  position: absolute;
  z-index: 111;
}
</style>
