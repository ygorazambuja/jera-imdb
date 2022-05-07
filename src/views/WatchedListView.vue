<script lang="ts">
import { storeToRefs } from "pinia";
import { ref, onMounted, computed, watch } from "vue";
import { useMovieStore } from "@/stores/movies";
import type { IMovie } from "@/interfaces";
import { getMovieById } from "@/services/imdb";

import MovieCard from "@/components/MovieCard.vue";
import NavigationBar from "@/components/NavigationBar.vue";
export default {
  components: {
    MovieCard,
    NavigationBar,
  },

  setup() {
    const { watchedList } = storeToRefs(useMovieStore());

    const movies = ref([] as IMovie[]);

    async function asyncFetchMoviesById() {
      await new Promise((resolve) => {
        watchedList.value.forEach(async (movie) => {
          const data = (await getMovieById(String(movie.id))) as IMovie;
          movies.value.push(data);
        });
        resolve(true);
      });
    }

    onMounted(async () => {
      await asyncFetchMoviesById();
    });

    watch(watchedList, () => {
      asyncFetchMoviesById();
    });

    const hasMovieOnWatchedList = computed(() => watchedList.value.length > 0);

    return {
      movies,
      watchedList,
      hasMovieOnWatchedList,
    };
  },
};
</script>

<template>
  <div>
    <NavigationBar />

    <div class="container">
      <div v-if="hasMovieOnWatchedList">
        <div v-for="movie in movies" :key="movie.id">
          <MovieCard :movie="movie" />
        </div>
      </div>

      <div v-if="!hasMovieOnWatchedList">
        <h1>No movies in watchlist</h1>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
}
</style>
