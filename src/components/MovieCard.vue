<script lang="ts" setup>
import type { IMovie } from "@/interfaces";
import { useMovieStore } from "@/stores/movies";
import { storeToRefs } from "pinia";
import { computed, watch } from "vue";

const props = defineProps<{
  movie: IMovie;
}>();

const { watchList } = storeToRefs(useMovieStore());
const { addOnWatchList, removeFromWatchList } = useMovieStore();

function handleFavouriteClick() {
  if (isOnWatchList.value) {
    return removeFromWatchList(props.movie);
  }
  return addOnWatchList(props.movie);
}

const isOnWatchList = computed(() => watchList.value.includes(props.movie));

watch(watchList, () => {
  console.log(watchList.value.map((pos) => pos.title));
});
</script>

<template>
  <div>
    <div>
      <span> {{ props.movie.title }}</span>
      <button
        @click="handleFavouriteClick"
        :style="[isOnWatchList ? 'background-color: green;' : 'background-color: red;']"
      >
        {{ isOnWatchList ? "Remove from WatchList" : "Add to WatchList" }}
      </button>
    </div>
  </div>
</template>
