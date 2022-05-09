import type { IMovie } from "@/interfaces";
import { defineStore } from "pinia";

export type User = {
  id: number;
  username: string;
  name: string;
  password: string;
  profiles: Profile[];
};

type Profile = {
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
  }),
  actions: {
    setUser(user: User) {
      this.user = user;
    },
  },
});
