<template>
  <v-simple-table>
    <template #default>
      <tbody v-if="tooltipItem">
        <tr v-for="header in headers" :key="header.value">
          <td>
            {{ header.text }}
          </td>
          <td>
            {{ tooltipItem[header.value] }}
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
    ...mapGetters('geoJson', ['tooltipItem']),
  },
}
</script>
