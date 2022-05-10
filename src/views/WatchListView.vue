<script lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useMovieStore } from "@/stores/movies";
import { storeToRefs } from "pinia";
import { getMovieById } from "@/services/imdb";
import MovieCard from "@/components/MovieCard.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import type { IMovie } from "@/interfaces";

export default {
  name: "WatchListView",
  components: {
    MovieCard,
    NavigationBar,
  },
  setup() {
    const { watchList } = storeToRefs(useMovieStore());

    const movies = ref([] as IMovie[]);

    async function asyncFetchMoviesById() {
      await new Promise((resolve) => {
        watchList.value.forEach(async (movie) => {
          const data = (await getMovieById(String(movie.id))) as IMovie;
          movies.value.push(data);
        });
        resolve(true);
      });
    }

    watch(watchList, () => {
      asyncFetchMoviesById();
    });

    onMounted(async () => {
      await asyncFetchMoviesById();
    });

    const hasMovieOnWatchList = computed(() => watchList.value.length > 0);

    return {
      hasMovieOnWatchList,
      movies,
    };
  },
};
</script>

<template>
  <div>
    <NavigationBar />
    <div class="container" v-if="hasMovieOnWatchList">
      <div v-for="movie in movies" :key="movie.id">
        <MovieCard :movie="movie" />
      </div>
    </div>
    <div v-if="!hasMovieOnWatchList">
      <h1>No movies in watchlist</h1>
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
