<script lang="ts">
import type { IMovie } from "@/interfaces";
import { computed, defineComponent } from "vue";
import MovieCard from "./MovieCard.vue";
export default defineComponent({
  name: "MovieListGrid",
  components: {
    MovieCard,
  },
  props: {
    movies: {
      type: Object as () => IMovie[],
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const hasNoMovies = computed(() => props.movies.length === 0);

    return {
      props,
      hasNoMovies,
    };
  },
});
</script>

<template>
  <span class="title">{{ label }}</span>
  <div class="movie-list-grid">
    <template v-for="movie in props.movies" :key="movie.id">
      <MovieCard :movie="movie" />
    </template>
    <template v-if="hasNoMovies">
      <span class="no-movies">Nenhum filme encontrado</span>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.movie-list-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
  margin-top: 1rem;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 2rem;
  font-weight: bold;
  margin: 1rem;
}

.no-movies {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1rem;
}
</style>
