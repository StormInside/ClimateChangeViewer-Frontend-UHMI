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
            <l-control-layers position="topright" />
            <l-control-attribution
              class="custom-leaflet-attribution"
              position="bottomleft"
              :prefix="false"
            />
            <l-tile-layer
              v-for="(mapsProviders, i) in mapsData.mapsProviders"
              :key="i"
              :name="mapsProviders.name"
              :visible="mapsProviders.visible"
              :url="mapsProviders.url"
              :attribution="mapsProviders.attribution"
              :subdomains="mapsProviders.subdomains"
              :tms="mapsProviders.tms"
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
import mapsData from 'static/maps/maps-data.json'

export default {
  name: 'IndexPage',
  data() {
    return {
      mapsData,
    }
  },
}
</script>
