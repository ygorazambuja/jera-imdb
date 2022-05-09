import { defineStore } from "pinia";

export const useProfileStore = defineStore("profiles", {
  state: () => {
    return {
      profiles: [],
    };
  },
  persist: true,
});
