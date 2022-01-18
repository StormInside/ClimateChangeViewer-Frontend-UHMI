<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-speed-dial
            v-model="fab"
            absolute
            :top="top"
            :bottom="bottom"
            :right="right"
            :left="left"
            :direction="direction"
            :open-on-hover="hover"
            :transition="transition"
          >
            <template #activator>
              <v-btn
                v-model="fab"
                absolute
                color="blue darken-2"
                dark
                fab
              >
                <v-icon v-if="fab">
                  mdi-close
                </v-icon>
                <v-icon v-else>
                  mdi-account-circle
                </v-icon>
              </v-btn>
            </template>
            <v-btn
              fab
              dark
              small
              color="green"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              small
              color="indigo"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              small
              color="red"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-speed-dial>
        </v-col>
      </v-row>
    </v-container>

<!--    <l-map-->
<!--      v-for="tile in mapsData.mapOfUkraine"-->
<!--      :key="tile.name"-->
<!--      class="map-wrapper"-->
<!--      :zoom="tile.zoom"-->
<!--      :center="tile.center"-->
<!--      :options="tile"-->
<!--    >-->
<!--      <l-tile-layer-->
<!--        :url="tile.url"-->
<!--        :name="tile.name"-->
<!--        :attribution="tile.attribution"-->
<!--        :subdomains="tile.subdomains"-->
<!--        :tms="tile.tms"-->
<!--        :visible="tile.visible"-->
<!--        layer-type="base"-->
<!--      />-->
<!--    </l-map>-->
  </v-main>
</template>

<script>
import mapsData from "assets/maps-data.json";

export default {
  name: "DefaultLayout",
  data() {
    return {
      mapsData: {},
      direction: 'top',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition',
    };
  },
  computed: {
    getMapOptions() {
      return Object.assign(this.mapsData.mapOfUkraine.mapOptions);
    }
  },
  created() {
    this.mapsData = mapsData;
  },
};
</script>
<style scoped lang="scss">
.map-wrapper {
  width: 100%;
  height: 100%;
}
</style>
