<template>
  <v-card width="250" class="info-card">
    <div class="d-flex align-center justify-center">
      <v-card-title class="pa-1 info__title"
        >Soil hydrological group</v-card-title
      >
      <v-btn icon @click="showColors = !showColors">
        <v-icon
          >{{ showColors ? 'mdi-chevron-down' : 'mdi-chevron-up' }}
        </v-icon>
      </v-btn>
    </div>
    <v-expand-transition>
      <v-card v-show="showColors" class="transparent">
        <v-list class="transparent pa-0">
          <v-list-item v-for="(item, i) in info" :key="i" class="pl-2">
            <v-list-item-icon class="mr-2">
              <v-card :color="item.color" width="15" height="15" />
            </v-list-item-icon>
            <v-list-item-title class="info__text"
              >{{ item.text }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: 'GeoInfo',
  data: () => ({
    showColors: true,
    info: [
      {
        text: 'A – high infiltration rates',
        color: 'rgba(158,211,155,0.65)',
      },
      {
        text: 'B – moderate infiltration rates',
        color: 'rgba(239,241,139,0.65)',
      },
      {
        text: 'C – slow infiltration rates',
        color: 'rgba(255,195,134,0.65)',
      },
      {
        text: 'D – very slow infiltration rates',
        color: 'rgba(236,174,175,0.65)',
      },
    ],
  }),
}
</script>
<style lang="scss" scoped>
.info-card {
  position: absolute;
  z-index: 998;
  bottom: 3vh;
  left: 0.5vw;
  background-color: rgba(255, 255, 255, 0.85) !important;
}
.info__title {
  font-size: 1.3em;
}
.info__text {
  font-size: 1.2em;
}
</style>
