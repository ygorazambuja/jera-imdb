<script lang="ts">
import { computed, onMounted, ref } from "vue";
import { useMovieStore } from "@/stores/movies";
import { storeToRefs } from "pinia";
import { getMovieById } from "@/services/imdb";
import type { IMovie } from "@/interfaces";
import MovieCard from "@/components/MovieCard.vue";
import NavigationBar from "@/components/NavigationBar.vue";
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

    onMounted(async () => {
      await asyncFetchMoviesById();
    });

    const hasMovieOnWatchedList = computed(() => watchList.value.length > 0);

    return {
      hasMovieOnWatchedList,
      movies,
    };
  },
};
</script>

<template>
  <div>
    <NavigationBar />
    <div class="container">
      <div v-for="movie in movies" :key="movie.id">
        <MovieCard :movie="movie" />
      </div>
    </div>
    <div v-if="!hasMovieOnWatchedList">
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
