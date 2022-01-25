<template>
  <v-simple-table class="tooltip">
    <template #default>
      <tbody v-if="tooltip.item">
        <tr v-for="header in headers" :key="header.value">
          <td>
            {{ header.text }}
          </td>
          <td>
            {{ tooltip.item[header.value] }}
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GeoTooltip',
  data() {
    return {
      headers: [
        {
          text: 'Soil name (original name from soil map)',
          value: 'NAME_CLASS',
        },
        { text: 'Country', value: 'Country' },
        {
          text: 'Texture (Original classification from soil map)',
          value: 'Meh_sostav',
        },
        {
          text: 'Texture (USDA classification)',
          value: 'TEXTURE',
        },
        {
          text: 'Number of soil layers (horizons)',
          value: 'NLAYERS',
        },
        {
          text: 'Hydrological Group',
          value: 'HYDGRP',
        },
        {
          text: 'Depth of soil layer',
          value: 'SOL_ZMX',
        },
        {
          text: 'Fraction of porosity (void space) from which anions are excluded',
          value: 'ANION_EXCL',
        },
      ],
    }
  },
  computed: {
    ...mapGetters('geoJson', ['tooltip']),
  },
}
</script>
<style lang="scss" scoped>
.tooltip {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  width: 25vw;
}
</style>
