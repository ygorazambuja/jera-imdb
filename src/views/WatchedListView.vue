<script lang="ts">
import { storeToRefs } from "pinia";
import { ref, onMounted, computed, watch } from "vue";
import { useMovieStore } from "@/stores/movies";
import type { IMovie } from "@/interfaces";
import { getMovieById } from "@/services/imdb";

import MovieCard from "@/components/MovieCard.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import { useUserStore } from "@/stores/user";
import MovieListGrid from "../components/MovieListGrid.vue";
export default {
  components: {
    MovieCard,
    NavigationBar,
    MovieListGrid,
  },

  setup() {
    const { getWatchedListFromLoggedProfile } = useUserStore();
    const movies = ref([] as IMovie[]);

    async function asyncFetchMoviesById() {
      await new Promise((resolve) => {
        getWatchedListFromLoggedProfile.forEach(async (movie) => {
          const data = (await getMovieById(String(movie.id))) as IMovie;
          movies.value.push(data);
        });
        resolve(true);
      });
    }

    onMounted(async () => {
      await asyncFetchMoviesById();
    });

    watch(getWatchedListFromLoggedProfile, () => {
      asyncFetchMoviesById();
    });

    const hasMovieOnWatchedList = computed(
      () => getWatchedListFromLoggedProfile.length > 0
    );

    return {
      movies,
      getWatchedListFromLoggedProfile,
      hasMovieOnWatchedList,
    };
  },
};
</script>

<template>
  <div>
    <NavigationBar />
    <MovieListGrid :movies="movies" :label="'Assistidos'" />
  </div>
</template>

<style lang="scss">
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
}
</style>
