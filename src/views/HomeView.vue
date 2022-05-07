<script setup lang="ts">
import { getMoviesByTitle } from "@/services/imdb";
import { onMounted, reactive, ref } from "vue";
import type { IMovie } from "@/interfaces";
import MovieCard from "../components/MovieCard.vue";
import { useMovieStore } from "@/stores/movies";
import { storeToRefs } from "pinia";
getMoviesByTitle("batman");

const self = reactive({
  movies: [] as IMovie[],
});

const search = ref("");

const { watchList } = storeToRefs(useMovieStore());

const fetchMovies = async () => {
  const data = await getMoviesByTitle(search.value);
  self.movies = data.results;
};

onMounted(async () => {
  const data = await getMoviesByTitle("batman");
  self.movies = data.results;
});
</script>

<template>
  <div>
    <h1>Home</h1>

    <input type="text" v-model="search" @keydown.enter="fetchMovies" />

    {{ String(watchList.map((pos) => pos.title)) }}

    <div v-for="movie in self.movies" :key="movie.id">
      <MovieCard :movie="movie" />
    </div>
  </div>
</template>
