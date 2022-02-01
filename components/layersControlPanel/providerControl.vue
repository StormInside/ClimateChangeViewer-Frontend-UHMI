<template>
  <div>
    <v-subheader class="font-weight-bold">Base layers</v-subheader>
    <v-select
      v-model="currentMapLayer"
      return-object
      hide-details
      filled
      dense
      class="select"
      :menu-props="{ offsetY: true }"
      :items="mapsData.mapsProviders"
      item-text="name"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LayersPanel',
  computed: {
    ...mapGetters('map', ['mapsData']),
    currentMapLayer: {
      get() {
        return (
          this.mapsData.mapsProviders.find((layer) => layer.visible === true) ||
          this.mapsData.mapsProviders[0]
        )
      },
      set(layer) {
        this.$store.commit('map/changeProvider', layer)
      },
    },
  },
}
</script>
<style scoped lang="scss">
.select {
  z-index: 1000;
}
</style>
