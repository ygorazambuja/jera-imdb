import type { IMovie } from "@/interfaces";
import { defineStore } from "pinia";

export type User = {
  id: number;
  username: string;
  name: string;
  password: string;
  profiles: Profile[];
};

export type Profile = {
  id: number;
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
    addNewMovieToProfile(profileId: number, movie: IMovie) {
      const profile = this.user.profiles.find(
        (profile) => profile.id === profileId
      );
      if (profile) {
        profile.watchedList.push(movie);
      }
    },
    addNewMovieToWatchList(profileId: number, movie: IMovie) {
      const profile = this.user.profiles.find(
        (profile) => profile.id === profileId
      );
      if (profile) {
        profile.watchList.push(movie);
      }
    },
    removeMovieFromProfile(profileId: number, movieId: number) {
      const profile = this.user.profiles.find(
        (profile) => profile.id === profileId
      );
      if (profile) {
        const movie = profile.watchedList.find((movie) => movie.id === movieId);
        if (movie) {
          profile.watchedList.splice(profile.watchedList.indexOf(movie), 1);
        }
      }
    },
    removeMovieFromWatchList(profileId: number, movieId: number) {
      const profile = this.user.profiles.find(
        (profile) => profile.id === profileId
      );
      if (profile) {
        const movie = profile.watchList.find((movie) => movie.id === movieId);
        if (movie) {
          profile.watchList.splice(profile.watchList.indexOf(movie), 1);
        }
      }
    },
    removeProfile(profileId: number) {
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
  },
});
