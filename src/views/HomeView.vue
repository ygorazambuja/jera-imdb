<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, reactive } from "vue";
import NavigationBar from "../components/NavigationBar.vue";
import HorizontalMovieList from "../components/HorizontalMovieList.vue";
import { useUserStore } from "@/stores/user";
import { asyncFetchGetAllMoviesByGenres } from "@/services/imdb";
import { GENRES } from "@/utils/constants";
import type { IMovie } from "@/interfaces";
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "HomeView",
  components: {
    NavigationBar,
    HorizontalMovieList,
  },
  setup() {
    const {
      getWatchListFromLoggedProfile,
      getWatchedListFromLoggedProfile,
    } = useUserStore();

    const moviesByGenres = reactive({} as { [key: string]: IMovie[] });

    const { isLogged, logout } = useAuth();

    onBeforeMount(async () => {
      if (!isLogged) {
        return logout();
      }

      await new Promise((resolve) => {
        GENRES.forEach(async (genre) => {
          const { results } = await asyncFetchGetAllMoviesByGenres(genre.id);
          moviesByGenres[genre.id] = results;
        });
        resolve(true);
      });
    });

    function getGenreName(genreId: string | number) {
      const genre = GENRES.find((genre) => String(genre.id) === genreId);
      return genre?.name;
    }

    return {
      getWatchListFromLoggedProfile,
      getWatchedListFromLoggedProfile,
      moviesByGenres,
      GENRES,
      getGenreName,
    };
  },
});
</script>

<template>
  <div>
    <NavigationBar />

    <HorizontalMovieList title="Assistidos" :movies="getWatchListFromLoggedProfile" />
    <HorizontalMovieList
      title="Para assistir"
      :movies="getWatchedListFromLoggedProfile"
    />

    <template v-for="(movies, key) in moviesByGenres" :key="key">
      <HorizontalMovieList :title="getGenreName(key) || ''" :movies="movies" />
    </template>
  </div>
</template>
