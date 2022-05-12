<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import NavigationBar from "@/components/NavigationBar.vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { asyncFetchGetAllMoviesByGenres } from "@/services/imdb";
import MovieListGrid from "../components/MovieListGrid.vue";
import { GENRES } from "@/utils/constants";
export default defineComponent({
  name: "GenreIdView",
  components: {
    NavigationBar,
    MovieListGrid,
  },
  setup() {
    const movies = ref([]);
    const { params } = useRoute();
    const genreId = ref<string>(String(params.id));

    async function fetchMovies() {
      if (genreId.value) {
        const { results } = await asyncFetchGetAllMoviesByGenres(genreId.value);
        movies.value = results;
      }
    }

    onBeforeRouteUpdate(async (to, from) => {
      if (to.params.id !== from.params.id) {
        genreId.value = String(to.params.id);
        await fetchMovies();
      }
    });

    onMounted(async () => {
      await fetchMovies();
    });

    const genreName = computed(() => {
      const genre = GENRES.find((item) => item.id === parseInt(genreId.value));
      return genre ? genre.name : "";
    });

    return { movies, genreName, genreId };
  },
});
</script>

<template>
  <div>
    <div>
      <NavigationBar />
      <MovieListGrid :movies="movies" :label="genreName" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 2rem;
  font-weight: bold;
  margin: 1rem;
}
</style>
