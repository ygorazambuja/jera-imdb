<script lang="ts">
import { onMounted, computed, ref } from "vue";
import { useRoute } from "vue-router";
import { getMovieById } from "@/services/imdb";
import type { IMovie } from "@/interfaces";
import MovieCard from "../components/MovieCard.vue";
import NavigationBar from "../components/NavigationBar.vue";
export default {
  name: "MovieDetailsView",
  components: { MovieCard, NavigationBar },
  setup() {
    const router = useRoute();
    const movieId = computed(() => String(router.params.id));
    const movie = ref({} as IMovie);
    async function asyncFetchMovieById() {
      const data = await getMovieById(movieId.value);
      movie.value = data;
    }
    onMounted(() => {
      asyncFetchMovieById();
    });
    return { movie };
  },
};
</script>

<template>
  <div>
    <NavigationBar />
    <MovieCard :movie="movie" />
  </div>
</template>
