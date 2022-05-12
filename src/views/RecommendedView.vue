<script lang="ts">
import { onMounted, reactive, toRefs, defineComponent } from "vue";
import { getRecommendedMovies } from "@/services/imdb";
import NavigationBar from "../components/NavigationBar.vue";
import type { IMovie } from "@/interfaces";
import { useUserStore } from "@/stores/user";
import MovieListGrid from "../components/MovieListGrid.vue";

export default defineComponent({
  name: "RecommendedView",
  components: {
    NavigationBar,
    MovieListGrid,
  },
  setup() {
    const { getWatchListFromLoggedProfile } = useUserStore();

    const self = reactive({
      movies: [] as IMovie[],
    });

    onMounted(async () => {
      await asyncFetchRecommendedMovies();
    });

    async function asyncFetchRecommendedMovies() {
      const ids = getWatchListFromLoggedProfile.map(({ id }) => id);
      if (ids.length === 0) return;

      const { results } = await getRecommendedMovies(ids);

      self.movies = results;
    }

    return {
      ...toRefs(self),
    };
  },
});
</script>

<template>
  <div>
    <NavigationBar />

    <MovieListGrid :movies="movies" :label="'Recomendados para você'" />
  </div>
</template>
