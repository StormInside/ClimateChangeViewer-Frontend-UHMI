<template>
  <v-container fluid class="layers-control">
    <v-row>
      <v-col cols="12" class="d-flex justify-end">
        <v-btn @click="showControl = !showControl">
          <v-icon>mdi-layers-triple</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col cols="12" class="d-flex justify-end">
        <v-btn tile @click="$emit('screenshot')">
          <v-icon>mdi-file-image</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <transition name="layers-control__card">
      <v-row v-show="showControl" class="layers-control__card">
        <v-col cols="12">
          <v-card width="20vw" color="rgba(255, 255, 255, 0.85)">
            <lazy-layers-control-panel-provider-control />
            <lazy-layers-control-panel-layres-card-control />
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
      showControl: true,
    }
  },
}
</script>

<style scoped lang="scss">
.layers-control__card {
  position: absolute;
  top: 27px;
  right: 83px;
}

.layers-control__card-enter-active,
.layers-control__card-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
    opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: center top;
}

.layers-control__card-enter,
.layers-control__card-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style>
