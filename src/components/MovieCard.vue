<script lang="ts">
import type { IMovie } from "@/interfaces";
import { useMovieStore } from "@/stores/movies";
import { defineComponent } from "vue";

import { getImageFullURL } from "@/services/imdb";
import { WatchIcon, BookmarkIcon } from "@vue-icons/feather";
import { useToast } from "@/composables/useToast";
import { useRouter } from "vue-router";

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
      addOnWatchList,
      removeFromWatchList,
      removeFromWatchedList,
      addOnWatchedList,
      isOnWatchList,
      isOnWatchedList,
    } = useMovieStore();

    const { toast } = useToast();
    const { push } = useRouter();

    function handleFavouriteClick() {
      if (isOnWatchList(props.movie)) {
        removeFromWatchList(props.movie);
        return toast("Removed from watchlist");
      }
      addOnWatchList(props.movie);
      return toast("Added to watch list");
    }

    function handleWatchedClick() {
      if (isOnWatchedList(props.movie)) {
        removeFromWatchedList(props.movie);
        return toast("Removed from watched list");
      }
      addOnWatchedList(props.movie);
      return toast("Added to watched list");
    }

    function handleRedirectToDetails() {
      push({ name: "MovieDetailsView", params: { id: props.movie.id } });
    }

    return {
      isOnWatchList,
      isOnWatchedList,
      handleFavouriteClick,
      handleWatchedClick,
      handleRedirectToDetails,
      props,
      getImageFullURL,
    };
  },
});
</script>

<template>
  <div>
    <div class="card">
      <div class="card__header">
        <div class="card__title">{{ props.movie.title }}</div>
        <div>
          <BookmarkIcon
            size="24"
            :color="isOnWatchList(props.movie) ? '#ff0000' : 'white'"
            @click="handleFavouriteClick"
          />
          <WatchIcon
            size="24"
            :color="isOnWatchedList(props.movie) ? '#ff0000' : 'white'"
            @click="handleWatchedClick"
          />
        </div>
      </div>
      <div class="card__body" @click="handleRedirectToDetails">
        <img
          :src="getImageFullURL(props.movie.poster_path)"
          :alt="props.movie.title"
        />
      </div>
      <div class="card__footer">
        {{ props.movie.title }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.card {
  display: flex;
  flex-direction: column;
  padding: 12px;
  max-width: 300px;

  &__header {
    padding: 12px 0;
    display: flex;
    justify-content: space-between;

    &--active {
      svg {
        color: #ff0000;
      }
    }

    svg {
      cursor: pointer;

      transition: all 0.2s;

      &:hover {
        color: #ff0000;
      }

      &:active {
        color: #6f0202;
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

  &__footer {
    font-size: 12px;
    color: #eee;
  }
}
</style>
