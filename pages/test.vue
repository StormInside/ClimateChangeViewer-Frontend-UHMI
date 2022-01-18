<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row>
      <v-col
        class="pa-0 ma-0"
        cols="12"
      >
        <v-card class="card-wrapper">
          <v-card-text>
            <v-speed-dial
              v-model="fab"
              direction="left"
              class="mt-5"
              top
              absolute
              right
            >
              <template #activator>
                <v-btn
                  v-model="fab"
                  icon
                  fab
                >
                  <v-icon v-if="fab">
                    mdi-close
                  </v-icon>
                  <v-icon v-else>
                    mdi-layers-triple
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
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "TestTest",
  data: () => ({
    fab: null
  })
};
</script>
<style scoped lang="scss">
.card-wrapper {
  width: 100vw;
  height: 100vh;
}
</style>
