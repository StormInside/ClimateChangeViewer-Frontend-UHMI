<template>
  <v-container fluid class="layers-control pa-0">
    <v-row class="ma-0">
      <v-col cols="12" class="ma-0 pa-0">
        <v-btn class="float-right mr-4" @click="showControl = !showControl">
          <v-icon>mdi-layers-triple</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <transition name="controlCard">
      <v-row v-if="showControl" class="ma-0">
        <v-col class="ma-0 pa-0">
          <v-card width="20vw">
            <layers-control-provider-control />
          </v-card>
        </v-col>
      </v-row>
    </transition>
  </v-container>
</template>

<script>
export default {
  name: 'MainControl',
  data() {
    return {
      showControl: false,
    }
  },
}
</script>

<style scoped lang="scss">
.layers-control {
  width: 25vw;
}

.controlCard-enter-active,
.controlCard-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
    opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: center top;
}

.controlCard-enter,
.controlCard-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style>
