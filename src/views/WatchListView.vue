<script lang="ts">
import { onMounted, ref, watch } from "vue";
import { getMovieById } from "@/services/imdb";
import NavigationBar from "@/components/NavigationBar.vue";
import type { IMovie } from "@/interfaces";
import { useUserStore } from "@/stores/user";
import MovieListGrid from "@/components/MovieListGrid.vue";

export default {
  name: "WatchListView",
  components: {
    NavigationBar,
    MovieListGrid,
  },
  setup() {
    // const { getWatchListFromLoggedProfile } = storeToRefs(useMovieStore());

    const { getWatchListFromLoggedProfile } = useUserStore();

    const movies = ref([] as IMovie[]);

    async function asyncFetchMoviesById() {
      await new Promise((resolve) => {
        getWatchListFromLoggedProfile.forEach(async (movie) => {
          const data = (await getMovieById(String(movie.id))) as IMovie;
          movies.value.push(data);
        });
        resolve(true);
      });
    }

    watch(getWatchListFromLoggedProfile, () => {
      asyncFetchMoviesById();
    });

    onMounted(async () => {
      await asyncFetchMoviesById();
    });

    return {
      movies,
    };
  },
};
</script>

<template>
  <div>
    <NavigationBar />
    <MovieListGrid :movies="movies" :label="'Para assistir'" />
  </div>
</template>

<style lang="scss" scoped></style>
