<script lang="ts">
import { computed, defineComponent } from "vue";
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
    const hasMovies = computed(() => props.movies?.length > 0);

    return {
      props,
      hasMovies,
    };
  },
});
</script>

<template>
  <div class="container" v-if="hasMovies">
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
    margin: 20px 0;
    font-weight: bold;
    font-size: 1.4rem;
    padding: 0 12px;
  }

  &__list {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;

    &::-webkit-scrollbar {
      width: 20px;
    }

    &::-webkit-scrollbar-track {
      background-color: #e4e4e4;
      border-radius: 100px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 100px;
      background-image: linear-gradient(180deg, #36d05f 0%, #030508 99%);
    }
  }
}
</style>
