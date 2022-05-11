<script lang="ts">
import { defineComponent, onMounted } from "vue";
import type { IMovie } from "@/interfaces";

export default defineComponent({
  name: "HorizontalMovieList",
  props: {
    movies: {
      type: Array as () => IMovie[],
      required: true,
    },
    title: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    onMounted(() => {
      console.log(props.movies);
    });

    return {
      props,
    };
  },
});
</script>

<template>
  <div class="container">
    <h3>{{ props.title }}</h3>
    <div v-for="movie in props.movies" :key="movie.id">
      <MovieCard :movie="movie" />
    </div>
  </div>
</template>
