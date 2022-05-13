<script lang="ts">
import type { IMovie } from "@/interfaces";
import { defineComponent } from "vue";

import { getImageFullURL } from "@/services/imdb";
import { EyeIcon, BookmarkIcon } from "@vue-icons/feather";
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
    EyeIcon,
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
      <div class="card__body" @click="handleRedirectToDetails">
        <img :src="getImageFullURL(props.movie.poster_path)" :alt="props.movie.title" />
      </div>
      <div class="card__footer">
        <BookmarkIcon
          :class="[
            'card__footer__icon',
            {
              'card__footer__icon--active': isMovieOnLoggedProfileWatchList(props.movie),
            },
          ]"
          size="24"
          @click="handleFavouriteClick"
        />
        <EyeIcon
          :class="[
            'card__footer__icon',
            {
              'card__footer__icon--active': isMovieOnLoggedProfileWatchedList(
                props.movie
              ),
            },
          ]"
          size="24"
          @click="handleWatchedClick"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  padding: 12px;
  width: 250px;
  max-width: max-content;
  margin: 12px auto;

  &__header {
    padding: 12px 0;
    display: flex;
    justify-content: space-between;

    &--active {
      svg {
        color: var(--jera-green);
      }
    }
  }

  &__body {
    img {
      width: 100%;
      transition: all 0.4s;
      border-radius: 8px;

      &:hover {
        cursor: pointer;
      }
    }
  }

  &__footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 220px;

    &__icon {
      cursor: pointer;
      transition: all 0.2s;
      color: white;

      &--active {
        color: var(--jera-green);
      }

      &:hover {
        color: var(--jera-green);
      }

      &:active {
        color: var(--jera-green);
        opacity: 0.5;
      }
    }
  }

  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
}
</style>
