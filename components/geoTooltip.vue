<template>
  <v-simple-table dense class="pa-0 ma-0">
    <template #default>
      <tbody v-if="tooltipItem" class="pa-0 ma-0">
        <tr v-for="header in headers" :key="header.value" class="pa-0 ma-0">
          <td class="td-header pa-1">
            {{ header.text }}
          </td>
          <template v-if="header.multiple">
            <td
              v-for="number in 5"
              v-show="tooltipItem[header.value + number] !== '0'"
              :key="number"
              class="td-info pa-1"
            >
              {{ tooltipItem[header.value + number] }}
            </td>
          </template>

          <td v-else colspan="10" class="pa-1 td-info">
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
        {
          text: 'Depth of layer bottom, mm',
          value: 'SOL_Z',
          multiple: true,
        },
        {
          text: 'Bulk density, kg/dm3',
          value: 'SOL_BD',
          multiple: true,
        },
        {
          text: 'Available water capacity, mm H2O/mm soil',
          value: 'SOL_AWC',
          multiple: true,
        },
        {
          text: 'Saturated hydraulic conductivity, mm/hr',
          value: 'SOL_K',
          multiple: true,
        },
        {
          text: 'Organic carbon content, % soil weight',
          value: 'SOL_CBN',
          multiple: true,
        },
        {
          text: 'Clay content (< 0.002 mm),  % soil weight',
          value: 'CLAY',
          multiple: true,
        },
        {
          text: 'Silt content (0.002-0.05 mm),  % soil weight',
          value: 'SILT',
          multiple: true,
        },
        {
          text: 'Sand content (0.05-2 mm),  % soil weight',
          value: 'SAND',
          multiple: true,
        },
        {
          text: 'Rock content (> 2 mm),  % soil weight',
          value: 'ROCK',
          multiple: true,
        },
        {
          text: 'Moist soil albedo',
          value: 'SOL_ALB',
          multiple: true,
        },
        {
          text: 'USLE equation soil erodibility (K) factor',
          value: 'USLE_K',
          multiple: true,
        },
      ],
    }
  },
  computed: {
    ...mapGetters('geoJson', ['tooltipItem']),
  },
}
</script>
<style lang="scss" scoped>
.td-header {
  padding: 0;
  margin: 0;
  background-color: #393d3f;
  color: white;
  border-bottom: 1px solid white;
  border-top: 1px solid white;
}

.td-info {
  border-left: 1px solid rgb(222, 221, 215);
  border-bottom: 1px solid rgb(222, 221, 215);
  border-top: 1px solid rgb(222, 221, 215);
}
v-simple-table th {
  font-size: 2px !important;
}
</style>
