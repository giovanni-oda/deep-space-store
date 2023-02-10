import { defineStore } from "pinia";
import { useFetch } from "@/composables/fetch";
import { usePostFetch } from "@/composables/postFetch";

// msw mock service
import { worker } from "../mocks/browser";
worker.start({ onUnhandledRequest: "bypass" });

export const useCheckoutStore = defineStore({
  id: "checkoutStore",

  state: () => ({
    offer: null,
    offers: [],
    zip: null,
  }),

  getters: {
    getOffer: (state) => state.offer,
    getOffers: (state) => state.offers,
    getZip: (state) => state.zip,
  },

  actions: {
    async fetchOffer(id) {
      const { data, error } = await useFetch(
        `https://api.deepspacestore.com/offers/${id}`
      );
      // console.log("data", data.value);
      if (!error.value) this.offer = data.value;
      else {
        // TODO: handle error - send feedback to user.
      }
    },
    async fetchZip(code) {
      const { data, error } = await useFetch(
        `https://viacep.com.br/ws/${code}/json/`
      );
      // console.log("data", data.value);
      if (!error.value) this.zip = data.value;
      else {
        // TODO: handle error - send feedback to user.
      }
    },
    async createOrder(code, oderData) {
      const { data, error } = await usePostFetch(
        `https://api.deepspacestore.com/offers/${code}/create_order`,
        oderData
      );
      // console.log("data", data.value);
      if (!error.value) this.zip = data.value;
      else {
        // TODO: handle error - send feedback to user.
      }
    },
  },
});
