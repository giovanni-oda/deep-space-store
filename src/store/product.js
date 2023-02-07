import { defineStore } from "pinia";
import { useFetch } from "@/composables/fetch";

export const useProductStore = defineStore({
  id: "productStore",

  state: () => ({
    product: null,
    products: [],
  }),

  getters: {
    getProduct: (state) => state.product,
    getProducts: (state) => state.products,
  },

  actions: {
    async fetchProducts() {
      const { data, error } = await useFetch(
        "https://fakestoreapi.com/products"
      );
      if (!error.value) this.products = data.value;
      else {
        // TODO: handle error - send feedback to user.
      }
    },
  },
});
