<script lang="ts">
import { storeToRefs } from "pinia";
import { ref, onMounted, computed, watch, defineComponent } from "vue";
import type { IMovie } from "@/interfaces";
import { getMovieById } from "@/services/imdb";

import MovieCard from "@/components/MovieCard.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import { useUserStore } from "@/stores/user";
import MovieListGrid from "../components/MovieListGrid.vue";
export default defineComponent({
  components: {
    NavigationBar,
    MovieListGrid,
  },

  setup() {
    const { loggedProfile } = storeToRefs(useUserStore());
    const movies = ref([] as IMovie[]);

    async function asyncFetchMoviesById() {
      movies.value = [];
      await new Promise((resolve) => {
        loggedProfile.value.watchedList.forEach(async (movie) => {
          const data = (await getMovieById(String(movie.id))) as IMovie;
          movies.value.push(data);
        });
        resolve(true);
      });
    }

    watch(loggedProfile.value.watchedList, () => {
      asyncFetchMoviesById();
    });

    onMounted(async () => {
      await asyncFetchMoviesById();
    });

    return {
      movies,
    };
  },
});
</script>

<template>
  <div>
    <NavigationBar />
    <MovieListGrid :movies="movies" :label="'Assistidos'" />
  </div>
</template>

<style lang="scss">
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
}
</style>
