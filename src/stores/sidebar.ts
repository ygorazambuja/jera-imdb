import { defineStore } from "pinia";

export const useSideBarStore = defineStore("sidebar", {
  actions: {
    toggleSideBar() {
      this.isOpen = !this.isOpen;
    },
  },
  state: () => {
    return {
      isOpen: false,
    };
  },
});
