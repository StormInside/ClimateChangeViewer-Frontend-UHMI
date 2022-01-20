<template>
  <l-geo-json
    :geojson="soilLayer"
    :options="$store.getters['geoJson/style'].passive"
    @mouseover="$store.dispatch('geoJson/mouseOver', $event.layer)"
    @mouseout="$store.dispatch('geoJson/mouseOut', $event.layer)"
  ></l-geo-json>
</template>

<script>
import soilLayer from 'static/Soils_UA_RU_MD_BY.geojson'
export default {
  name: 'GeoSoilLayer',
  data() {
    return {
      soilLayer,
    }
  },
}
</script>
