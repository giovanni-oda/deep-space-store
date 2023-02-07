// Utilities
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  id: "appStore",

  state: () => ({
    loading: false,
    feedBack: null,
  }),

  getters: {
    getLoading: (state) => state.loading,
    getFeedBack: (state) => state.feedBack,
  },

  actions: {
    action1() {
      //
    },
  },
});
