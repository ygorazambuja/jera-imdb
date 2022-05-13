<script lang="ts">
import { onMounted, ref, defineComponent, computed } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import {
  getMovieById,
  getImageFullURL,
  asyncFetchAllRecommendations,
} from "@/services/imdb";

import type { IMovie } from "@/interfaces";
import NavigationBar from "../components/NavigationBar.vue";
import MovieListGrid from "../components/MovieListGrid.vue";
import { FacebookIcon, TwitterIcon } from "@vue-icons/feather";
import { useAuth } from "@/composables/useAuth";

export default defineComponent({
  name: "MovieDetailsView",
  components: { NavigationBar, MovieListGrid, FacebookIcon, TwitterIcon },
  setup() {
    const router = useRoute();
    const movieId = ref<string>(String(router.params.id));
    const movie = ref({} as IMovie);
    const recommendedMovies = ref([] as IMovie[]);

    const { isLogged } = useAuth();
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
        scrollToTop();
      }
    });

    function scrollToTop() {
      window.scrollTo(0, 0);
    }

    async function initView() {
      asyncFetchMovieById();
      fetchRecommendedMovies();
    }

    onMounted(() => {
      initView();
    });

    const getMovieShareOptions = computed(() => {
      return {
        url: `https://jera-imdb.vercel.app/filme/${movieId.value}`,
        title: movie.value.title,
      };
    });

    return {
      movie,
      getImageFullURL,
      recommendedMovies,
      getMovieShareOptions,
      isLogged,
    };
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
        <div class="movie-rating">
          <span>{{ movie.vote_average }}</span>
          <span>/10</span>
        </div>
        <div class="movie-sharing">
          <ShareNetwork
            :url="getMovieShareOptions.url"
            network="whatsapp"
            :title="getMovieShareOptions.title"
            :style="{ backgroundColor: '#25D366' }"
          >
            <span>W</span>
          </ShareNetwork>
          <ShareNetwork
            :url="getMovieShareOptions.url"
            network="facebook"
            :title="getMovieShareOptions.title"
            :style="{ backgroundColor: '#1877f2' }"
          >
            <FacebookIcon size="20" />
          </ShareNetwork>
          <ShareNetwork
            :url="getMovieShareOptions.url"
            :title="getMovieShareOptions.title"
            network="twitter"
            :style="{ backgroundColor: '#1da1f2' }"
          >
            <TwitterIcon size="20" />
          </ShareNetwork>
        </div>
        <div class="movie-description">
          <span>{{ movie.overview }}</span>
        </div>
      </div>
    </div>

    <MovieListGrid v-if="isLogged" label="Recomendados" :movies="recommendedMovies" />
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
      text-align: center;

      & span {
        font-size: 3rem;
      }
    }

    .movie-sharing {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      margin: 8px;
      padding: 0 12px;

      & a {
        border-radius: 50%;
        width: 35px;
        height: 35px;
        text-decoration: none;
        color: white;
      }

      & span {
        font-size: 1.5rem;
      }

      & svg {
        margin: 8px;
      }

      & .fa-lg {
        font-size: 2rem;
      }
    }

    .movie-description {
      max-width: 600px;
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
