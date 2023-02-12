import { defineStore } from "pinia";
import { useFetch } from "@/composables/Fetch";
import { usePostFetch } from "@/composables/PostFetch";
import { useAppStore } from "@/store/app";

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
        console.error(error);
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
        console.error(error);
      }
    },
    async createOrder(code, oderData) {
      const { data, error } = await usePostFetch(
        `https://api.deepspacestore.com/offers/${code}/create_order`,
        oderData
      );
      // console.log('resp', error.value, data.value);
      if (!error.value) {
        const appStore = useAppStore();
        if (data.value.status === 200) {
          appStore.feedBack = {
            text: "Successful Payment!",
            theme: "success",
            timeOut: 5000,
          };
        } else {
          appStore.feedBack = {
            text: `Error! Server Message: ${data.value.json.errorMessage}`,
            theme: "error",
            timeOut: 5000,
          };
        }
        return data.value.json;
      } else {
        // TODO: handle error - send feedback to user.
        console.error(error);
      }
    },
  },
});
