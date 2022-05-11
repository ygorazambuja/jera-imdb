<script lang="ts">
import { defineComponent } from "vue";
import type { IMovie } from "@/interfaces";
import MovieCard from "./MovieCard.vue";

export default defineComponent({
  name: "HorizontalMovieList",
  components: {
    MovieCard,
  },
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
    return {
      props,
    };
  },
});
</script>

<template>
  <div class="container">
    <div>
      <span>{{ props.title }}</span>
    </div>
    <div class="container__list">
      <div v-for="movie in props.movies" :key="movie.id">
        <MovieCard :movie="movie" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;

  span {
    color: var(--jera-green);
    font-weight: bold;
    font-size: 1.2rem;
    padding: 0 12px;
  }

  &__list {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
  }
}
</style>
