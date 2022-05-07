import type { IMovie } from "./../interfaces/IMovie";
import { defineStore } from "pinia";

export const useMovieStore = defineStore("movies", {
  actions: {
    addOnWatchList(movie: IMovie) {
      this.watchList.push(movie);
    },
    removeFromWatchList(movie: IMovie) {
      this.watchList = this.watchList.filter((m) => m.id !== movie.id);
    },
  },
  getters: {
    isOnWatchList: (state) => {
      return (movie: IMovie) => state.watchList.some((m) => m.id === movie.id);
    },
  },
  state: () => ({
    watchList: [] as IMovie[],
  }),
  persist: true,
});
