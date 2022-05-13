<script lang="ts">
import { onMounted, ref, defineComponent } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import {
  getMovieById,
  getImageFullURL,
  asyncFetchAllRecommendations,
} from "@/services/imdb";

import type { IMovie } from "@/interfaces";
import NavigationBar from "../components/NavigationBar.vue";
import MovieListGrid from "../components/MovieListGrid.vue";

export default defineComponent({
  name: "MovieDetailsView",
  components: { NavigationBar, MovieListGrid },
  setup() {
    const router = useRoute();
    const movieId = ref<string>(String(router.params.id));
    const movie = ref({} as IMovie);
    const recommendedMovies = ref([] as IMovie[]);
    async function asyncFetchMovieById() {
      const data = await getMovieById(movieId.value);
      movie.value = data;
    }
    async function fetchRecommendedMovies() {
      const { results } = await asyncFetchAllRecommendations(movieId.value);
      recommendedMovies.value = results;
    }

    onBeforeRouteUpdate(async (to, from) => {
      if (to.params.id !== from.params.id) {
        movieId.value = String(to.params.id);
        await initView();
      }
    });

    async function initView() {
      asyncFetchMovieById();
      fetchRecommendedMovies();
    }

    onMounted(() => {
      initView();
    });
    return { movie, getImageFullURL, recommendedMovies };
  },
});
</script>

<template>
  <div>
    <NavigationBar />

    <div class="container">
      <div class="movie">
        <div class="movie-image">
          <img :src="getImageFullURL(movie.poster_path)" alt="" />
        </div>
        <div class="movie-title">
          <span>{{ movie.original_title }}</span>
        </div>
        <div class="movie-description">
          <span>{{ movie.overview }}</span>
        </div>
      </div>
    </div>

    <MovieListGrid label="Recomendados" :movies="recommendedMovies" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;

  padding: 0;

  .movie {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;

    padding: 0;

    .movie-image {
      width: 100%;
      display: flex;
      justify-content: center;

      padding: 12px;

      & img {
        width: 80%;
        max-width: 300px;
        height: auto;

        border-radius: 5%;
        border: 1px solid var(--jera-green);
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
        text-align: center;
      }
    }

    .movie-title {
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 12px;

      & span {
        font-size: 3rem;
      }
    }

    .movie-description {
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 12px;

      & span {
        font-size: 1.2rem;
      }
    }
  }
}
</style>
