import { defineStore } from "pinia";
import { useFetch } from "@/composables/fetch";

// msw mock service
import { worker } from "../mocks/browser";
worker.start({ onUnhandledRequest: "bypass" });

export const useMockStore = defineStore({
  id: "mockStore",

  state: () => ({
    offer: null,
    offers: [],
  }),

  getters: {
    getOffer: (state) => state.offer,
    getOffers: (state) => state.offers,
  },

  actions: {
    async fetchOffer(id) {
      const { data, error } = await useFetch(`/offers/${id}`);
      // console.log("data", data.value);
      if (!error.value) this.offer = data.value;
      else {
        // TODO: handle error - send feedback to user.
      }
    },
  },
});
