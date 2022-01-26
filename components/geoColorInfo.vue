<template>
  <v-card width="300" color="infoPanel">
    <div class="d-flex align-center justify-center">
      <v-card-title class="ll-0">Soil hydrological group</v-card-title>
      <v-btn icon @click="showColors = !showColors">
        <v-icon
          >{{ showColors ? 'mdi-chevron-down' : 'mdi-chevron-up' }}
        </v-icon>
      </v-btn>
    </div>
    <v-expand-transition>
      <v-card v-show="showColors" class="transparent">
        <v-list class="transparent">
          <v-list-item v-for="(item, i) in info" :key="i">
            <v-list-item-icon>
              <v-card :color="item.color" width="20" height="20" />
            </v-list-item-icon>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: 'GeoColorInfo',
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
.infoPanel {
  position: absolute;
  z-index: 998;
  bottom: 3vh;
  left: 0.5vw;
}
.colorInfo-enter-active,
.colorInfo-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: transform 0.01s cubic-bezier(0.17, 0.67, 0.83, 0.67),
    opacity 0.01s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  transform-origin: center bottom;
}

.colorInfo-enter,
.colorInfo-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style>
