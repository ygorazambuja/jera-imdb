<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { getMovieById } from "@/services/imdb";
import NavigationBar from "@/components/NavigationBar.vue";
import type { IMovie } from "@/interfaces";
import { useUserStore } from "@/stores/user";
import MovieListGrid from "@/components/MovieListGrid.vue";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "WatchListView",
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
        loggedProfile.value.watchList.forEach(async (movie) => {
          const data = (await getMovieById(String(movie.id))) as IMovie;
          movies.value.push(data);
        });
        resolve(true);
      });
    }

    watch(loggedProfile.value.watchList, () => {
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
    <MovieListGrid :movies="movies" :label="'Para assistir'" />
  </div>
</template>

<style lang="scss" scoped></style>
