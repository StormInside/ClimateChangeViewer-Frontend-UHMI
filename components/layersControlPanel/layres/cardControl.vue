<template>
  <v-card class="transparent" flat>
    <v-radio-group v-model="cardChoice" class="mt-0" @change="changeLayer">
      <v-subheader class="font-weight-bold">Soils</v-subheader>
      <v-radio
        label="Merged soil map (1:1250000)`"
        class="pl-2"
        value="soils"
      ></v-radio>
      <v-subheader class="font-weight-bold"
        >Historical observations
      </v-subheader>
      <v-radio label="Ukraine" value="ukraine" class="pl-2"></v-radio>
    </v-radio-group>
  </v-card>
</template>

<script>
export default {
  name: 'CardControl',
  data() {
    return {
      cardChoice: null,
    }
  },
  methods: {
    changeLayer() {
      switch (this.cardChoice) {
        case 'soils':
          this.$store.commit(
            'map/changeGeoComponent',
            'lazy-layers-soils-geo-layer'
          )
          this.$store.commit(
            'map/changeGeoComponentInfo',
            'lazy-layers-soils-geo-info'
          )
          break
        case 'ukraine':
          this.$store.commit(
            'map/changeGeoComponent',
            'lazy-layers-ukraine-geo-layer'
          )
          break
      }
    },
  },
}
</script>
