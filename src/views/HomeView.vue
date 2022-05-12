<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, reactive } from "vue";
import NavigationBar from "../components/NavigationBar.vue";
import HorizontalMovieList from "../components/HorizontalMovieList.vue";
import { useUserStore } from "@/stores/user";
import { asyncFetchGetAllMoviesByGenres } from "@/services/imdb";
import { GENRES } from "@/utils/constants";
import type { IMovie } from "@/interfaces";

export default defineComponent({
  name: "HomeView",
  components: {
    NavigationBar,
    HorizontalMovieList,
  },
  setup() {
    const { getWatchListFromLoggedProfile, getWatchedListFromLoggedProfile } =
      useUserStore();

    const moviesByGenres = reactive({} as { [key: string]: IMovie[] });

    onBeforeMount(() => {
      GENRES.forEach(async (genre) => {
        const { results } = await asyncFetchGetAllMoviesByGenres(genre.id);
        moviesByGenres[genre.id] = results;
      });
    });

    return {
      getWatchListFromLoggedProfile,
      getWatchedListFromLoggedProfile,
      moviesByGenres,
      GENRES,
    };
  },
});
</script>

<template>
  <div>
    <NavigationBar />

    <HorizontalMovieList title="Assistidos" :movies="getWatchListFromLoggedProfile" />
    <HorizontalMovieList title="Para assistir" :movies="getWatchedListFromLoggedProfile" />

    <template v-for="(movies, key) in moviesByGenres" :key="key">
      <HorizontalMovieList :title="GENRES[key]?.name || ''" :movies="movies" />
    </template>
  </div>
</template>
