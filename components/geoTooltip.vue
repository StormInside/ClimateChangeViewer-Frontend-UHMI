<template>
  <tbody v-if="tooltipItem" class="table">
    <tr v-for="header in headers" :key="header.value">
      <td class="table__header">
        {{ header.text }}
      </td>
      <td colspan="10" class="table__info">
        {{ tooltipItem[header.value] }}
      </td>
    </tr>
    <tr>
      <td class="table__header"></td>
      <td v-for="layer in 5" :key="layer" class="table__info font-weight-bold">
        {{ 'Layer ' + layer }}
      </td>
    </tr>
    <tr v-for="header in headersMultiple" :key="header.value">
      <td class="table__header">
        {{ header.text }}
      </td>
      <td v-for="number in 5" :key="number" class="table__info">
        {{ tooltipItem[header.value + number] }}
      </td>
    </tr>
  </tbody>
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
      headersMultiple: [
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
.table__header {
  background-color: #393d3f;
  color: white;
}

.table__info {
  border-left: 1px solid rgb(222, 221, 215);
  background-color: #ffffff;
  color: #000000;
}

.table__info,
.table__header {
  border-top: 1px solid rgb(222, 221, 215);
  padding-left: 2px;
  padding-right: 2px;
  font-size: 0.8em;
  line-height: 1.8em;
}
</style>
