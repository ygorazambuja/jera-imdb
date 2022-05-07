<script lang="ts">
import { getMoviesByTitle } from "@/services/imdb";
import { reactive, ref } from "vue";
import type { IMovie } from "@/interfaces";
import MovieCard from "../components/MovieCard.vue";
import NavigationBar from "../components/NavigationBar.vue";

export default {
  name: "HomeView",
  components: {
    MovieCard,
    NavigationBar,
  },
  setup() {
    const self = reactive({
      movies: [] as IMovie[],
    });

    const search = ref("");

    const fetchMovies = async () => {
      const data = await getMoviesByTitle(search.value);
      self.movies = data.results;
    };

    return {
      search,
      fetchMovies,
      self,
    };
  },
};
</script>

<template>
  <div>
    <NavigationBar />

    <input type="text" v-model="search" @keydown.enter="fetchMovies" />

    <div class="container">
      <div v-for="movie in self.movies" :key="movie.id">
        <MovieCard :movie="movie" />
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
