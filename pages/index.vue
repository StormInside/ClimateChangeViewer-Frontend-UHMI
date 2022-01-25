<template>
  <v-main>
    <v-container fluid class="pa-0">
      <div style="height: 100vh; width: 100vw">
        <client-only>
          <l-map
            :center="mapsData.mapConfig.center"
            :zoom="mapsData.mapConfig.zoom"
            :options="mapsData.mapOptions"
          >
            <l-control>
              <layers-control-main-control />
            </l-control>
            <l-control-attribution position="bottomleft" :prefix="false" />
            <l-control position="bottomleft">
              <geo-color-info />
            </l-control>
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
            <geo-soil-layer />
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
    ...mapGetters('map', ['mapsData']),
  },
}
</script>
