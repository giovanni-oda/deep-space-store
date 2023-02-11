import { defineStore } from "pinia";
import { useFetch } from "@/composables/Fetch";

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
      // console.log("fetched data from API", data.value);
      if (!error.value) this.products = data.value;
      else {
        // TODO: handle error - send feedback to user.
        console.error("Fakestoreapi", error.value);
      }
    },
    async fetchProduct(id) {
      const { data, error } = await useFetch(
        `https://fakestoreapi.com/products/${id}`
      );
      // console.log("data.value", data.value);
      if (!error.value) this.product = data.value;
      else {
        // TODO: handle error - send feedback to user.
        console.error("Fakestoreapi", error.value);
      }
    },
    updateProduct(prod) {
      this.product = { ...prod };
    },
  },
});
