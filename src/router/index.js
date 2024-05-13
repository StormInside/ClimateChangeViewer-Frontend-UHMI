import Vue from "vue";
import Router from "vue-router";

// Visualization
const vizItem = () => import("../components/MainMenuItems/viz-item.vue");

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      name: "home",
      path: "/",
      component: vizItem,
    },
    {
      path: "*",
      redirect: "/",
    },
  ],
});
