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
        const appStore = useAppStore();
        if (data.value.status === 200) {
          this.order = {
            orderId: createUniqueId(),
            ...orderData,
          };
          this.order.paymentData.status = data.value.json.paymentStatus;
          console.log("this.order", this.order);
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

// generates random id
function createUniqueId() {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
}
