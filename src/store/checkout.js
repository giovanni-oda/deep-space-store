import { defineStore } from "pinia";
import { useFetch } from "@/composables/Fetch";
import { usePostFetch } from "@/composables/PostFetch";
import { useAppStore } from "@/store/app";

export const useCheckoutStore = defineStore({
  id: "checkoutStore",

  state: () => ({
    offer: null,
    offers: [],
    order: null,
    orders: [],
    zip: null,
  }),

  getters: {
    getOffer: (state) => state.offer,
    getOffers: (state) => state.offers,
    getOrder: (state) => state.order,
    getOrders: (state) => state.orders,
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
    async createOrder(code, orderData) {
      const { data, error } = await usePostFetch(
        `https://api.deepspacestore.com/offers/${code}/create_order`,
        orderData
      );
      // console.log('resp', error.value, data.value);
      if (!error.value) {
        this.order = orderData;
        this.order.orderId = createHash(`OFFER_${code}`);
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
            timeOut: 7000,
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

// internal static function
function createHash(codeStr) {
  var hash = 0,
    i,
    chr;
  if (codeStr.length === 0) return hash;
  for (i = 0; i < codeStr.length; i++) {
    chr = codeStr.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}
