<script lang="ts">
import type { IMovie } from "@/interfaces";
import { getMoviesByTitle } from "@/services/imdb";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "MovieDetailsView",
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
      self,
      fetchMovies,
    };
  },
});
</script>

<template>
  <div>
    <input type="text" v-model="search" @keydown.enter="fetchMovies" />

    <div class="container">
      <div v-for="movie in self.movies" :key="movie.id">
        <MovieCard :movie="movie" />
      </div>
    </div>
  </div>
</template>
