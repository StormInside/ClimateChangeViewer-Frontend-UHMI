<template>
  <l-geo-json :weight="1" :geojson="uaLayer" :options-style="style" />
  <!--  <l-polygon-->
  <!--    :lat-lngs="uaLayer.features[0].geometry.coordinates"-->
  <!--    color="green"-->
  <!--  ></l-polygon>-->
</template>

<script>
import uaLayer from 'static/layers/UA_country.geojson'

export default {
  name: 'GeoLayer',
  data() {
    return {
      uaLayer,
      style: {
        color: '#000000',
        radius: 5,
        weight: 2,
        fillOpacity: 0,
      },
    }
  },
}
</script>
