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
      path: "/para-assistir",
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
    {
      path: "/perfis",
      name: "ProfilesView",
      component: () => import("@/views/ProfilesView.vue"),
    },
    {
      path: "/login",
      name: "LoginView",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/pesquisa",
      name: "SearchMovieView",
      component: () => import("@/views/SearchMovieView.vue"),
    },
    {
      path: "/genero/:id",
      name: "GenreIdView",
      component: () => import("@/views/GenreIdView.vue"),
    },
  ],
});

export default router;
