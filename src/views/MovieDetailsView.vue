<script lang="ts">
import { onMounted, computed, ref, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { getMovieById, getImageFullURL } from "@/services/imdb";
import type { IMovie } from "@/interfaces";
import NavigationBar from "../components/NavigationBar.vue";

export default defineComponent({
  name: "MovieDetailsView",
  components: { NavigationBar },
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
    return { movie, getImageFullURL };
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
        font-size: 2rem;
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
