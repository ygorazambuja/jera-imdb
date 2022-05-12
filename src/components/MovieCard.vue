<script lang="ts">
import type { IMovie } from "@/interfaces";
import { defineComponent } from "vue";

import { getImageFullURL } from "@/services/imdb";
import { WatchIcon, BookmarkIcon } from "@vue-icons/feather";
import { useToast } from "@/composables/useToast";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

export default defineComponent({
  props: {
    movie: {
      type: Object as () => IMovie,
      required: true,
    },
  },
  components: {
    WatchIcon,
    BookmarkIcon,
  },
  setup(props) {
    const {
      addNewMovieToWatchList,
      addNewMovieToWatchedList,
      removeMovieFromWatchList,
      removeMovieFromWatchedList,
      isMovieOnLoggedProfileWatchList,
      isMovieOnLoggedProfileWatchedList,
    } = useUserStore();

    const { toast } = useToast();
    const { push } = useRouter();

    function handleFavouriteClick() {
      if (isMovieOnLoggedProfileWatchList(props.movie)) {
        removeMovieFromWatchList(props.movie.id);
        return toast("Removed from watchlist");
      }
      addNewMovieToWatchList(props.movie);
      return toast("Added to watch list");
    }

    function handleWatchedClick() {
      if (isMovieOnLoggedProfileWatchedList(props.movie)) {
        removeMovieFromWatchedList(props.movie.id);
        return toast("Removed from watched list");
      }
      addNewMovieToWatchedList(props.movie);
      return toast("Added to watched list");
    }

    function handleRedirectToDetails() {
      push({ name: "MovieDetailsView", params: { id: props.movie.id } });
    }

    return {
      handleFavouriteClick,
      handleWatchedClick,
      handleRedirectToDetails,
      props,
      getImageFullURL,
      isMovieOnLoggedProfileWatchList,
      isMovieOnLoggedProfileWatchedList,
    };
  },
});
</script>

<template>
  <div v-if="!!props.movie.poster_path">
    <div class="card">
      <div class="card__header">
        <div>
          <BookmarkIcon size="24" :style="{
            color: isMovieOnLoggedProfileWatchList(props.movie)
              ? 'var(--jera-green)'
              : 'white',
          }" @click="handleFavouriteClick" />
          <WatchIcon size="24" :style="{
            color: isMovieOnLoggedProfileWatchedList(props.movie)
              ? 'var(--jera-green)'
              : 'white',
          }" @click="handleWatchedClick" />
        </div>
      </div>
      <div class="card__body" @click="handleRedirectToDetails">
        <img :src="getImageFullURL(props.movie.poster_path)" :alt="props.movie.title" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  padding: 12px;
  width: 200px;

  &__header {
    padding: 12px 0;
    display: flex;
    justify-content: space-between;

    &--active {
      svg {
        color: var(--jera-green);
      }
    }

    svg {
      cursor: pointer;

      transition: all 0.2s;

      &:hover {
        color: var(--jera-green);
      }

      &:active {
        color: var(--jera-green);
        opacity: 0.5;
      }
    }
  }

  &__body {
    img {
      width: 100%;
      transition: all 0.4s;

      &:hover {
        cursor: pointer;
        filter: brightness(1.4);
      }
    }
  }
}
</style>
