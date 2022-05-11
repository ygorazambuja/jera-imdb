<script lang="ts">
import { useMovieStore } from "@/stores/movies";
import { onMounted, reactive, toRefs, computed, defineComponent } from "vue";
import { getRecommendedMovies } from "@/services/imdb";
import MovieCardVue from "@/components/MovieCard.vue";
import { storeToRefs } from "pinia";
import NavigationBar from "../components/NavigationBar.vue";
import type { IMovie } from "@/interfaces";

export default defineComponent({
  name: "RecommendedView",
  components: {
    MovieCardVue,
    NavigationBar,
  },
  setup() {
    const { watchList } = storeToRefs(useMovieStore());

    const self = reactive({
      movies: [] as IMovie[],
    });

    onMounted(async () => {
      await asyncFetchRecommendedMovies();
    });

    async function asyncFetchRecommendedMovies() {
      const ids = watchList.value.map(({ id }) => id);
      if (ids.length === 0) return;

      const { results } = await getRecommendedMovies(ids);

      self.movies = results;
    }
    const hasNoMovies = computed(() => self.movies.length === 0);

    return {
      ...toRefs(self),
      hasNoMovies,
    };
  },
});
</script>

<template>
  <div>
    <NavigationBar />

    <div class="card-grid">
      <div v-for="movie in movies" :key="movie.id">
        <MovieCardVue :movie="movie" />
      </div>
    </div>

    <div v-if="hasNoMovies">
      <h1>Sem Filmes Cadastradoss</h1>
    </div>
  </div>
</template>

<style lang="scss">
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
}
</style>
