import type { IMovie } from "@/interfaces";
import { defineStore } from "pinia";

export type User = {
  id: string;
  username: string;
  name: string;
  password: string;
  profiles: Profile[];
};

export type Profile = {
  id: string;
  name: string;
  description: string;
  watchedList: IMovie[];
  watchList: IMovie[];
};

export const useUserStore = defineStore("user", {
  persist: true,
  state: () => ({
    user: {} as User,
    loggedProfile: {} as Profile,
  }),
  actions: {
    setUser(user: User) {
      this.user = user;
    },
    addNewProfile(profile: Profile) {
      this.user.profiles.push(profile);
    },
    addNewMovieToWatchedList(movie: IMovie) {
      this.loggedProfile.watchedList.push(movie);

      this.user.profiles.forEach((profile) => {
        if (profile.id !== this.loggedProfile.id) {
          profile.watchList.push(movie);
        }
      });
    },
    addNewMovieToWatchList(movie: IMovie) {
      this.loggedProfile.watchList.push(movie);

      this.user.profiles.forEach((profile) => {
        if (profile.id !== this.loggedProfile.id) {
          profile.watchedList.push(movie);
        }
      });
    },
    removeMovieFromWatchedList(movieId: number) {
      const movieIndex = this.loggedProfile.watchedList.findIndex(
        (movie) => movie.id === movieId
      );

      if (movieIndex !== -1) {
        this.loggedProfile.watchedList.splice(movieIndex, 1);
      }

      this.user.profiles.forEach((profile) => {
        if (profile.id !== this.loggedProfile.id) {
          const profileMovieIndex = profile.watchedList.findIndex(
            (movie) => movie.id === movieId
          );

          if (profileMovieIndex !== -1) {
            profile.watchedList.splice(profileMovieIndex, 1);
          }
        }
      });
    },
    removeMovieFromWatchList(movieId: number) {
      const movieIndex = this.loggedProfile.watchList.findIndex(
        (movie) => movie.id === movieId
      );

      if (movieIndex !== -1) {
        this.loggedProfile.watchList.splice(movieIndex, 1);
      }

      this.user.profiles.forEach((profile) => {
        if (profile.id !== this.loggedProfile.id) {
          const profileMovieIndex = profile.watchList.findIndex(
            (movie) => movie.id === movieId
          );

          if (profileMovieIndex !== -1) {
            profile.watchList.splice(profileMovieIndex, 1);
          }
        }
      });
    },
    removeProfile(profileId: string) {
      const profile = this.user.profiles.find(
        (profile) => profile.id === profileId
      );
      if (profile) {
        this.user.profiles.splice(this.user.profiles.indexOf(profile), 1);
      }
    },
    setLoggedProfile(profile: Profile) {
      this.loggedProfile = profile;
    },
  },
  getters: {
    getUser: (state) => {
      return state.user;
    },
    getProfiles: (state) => {
      return state.user.profiles;
    },
    getWatchListFromLoggedProfile: (state) => {
      return state.loggedProfile.watchList;
    },
    getWatchedListFromLoggedProfile: (state) => {
      return state.loggedProfile.watchedList;
    },
    isMovieOnLoggedProfileWatchList:
      (state) =>
      ({ id }: IMovie) => {
        const movie = state.loggedProfile.watchList.find((m) => m.id === id);
        return !!movie;
      },
    isMovieOnLoggedProfileWatchedList:
      (state) =>
      ({ id }: IMovie) => {
        const movie = state.loggedProfile.watchedList.find((m) => m.id === id);
        return !!movie;
      },
  },
});
