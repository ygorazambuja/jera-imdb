import HomeView from "@/views/HomeView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "HomeView",
      component: HomeView,
    },
    {
      path: "/recomendados",
      name: "RecommendedView",
      component: () => import("@/views/RecommendedView.vue"),
    },
    {
      path: "/favoritos",
      name: "WatchListView",
      component: () => import("@/views/WatchListView.vue"),
    },
    {
      path: "/assistidos",
      name: "WatchedListView",
      component: () => import("@/views/WatchedListView.vue"),
    },
    {
      path: "/filme/:id",
      name: "MovieDetailsView",
      component: () => import("@/views/MovieDetailsView.vue"),
    },
  ],
});

export default router;
