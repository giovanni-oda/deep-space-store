<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <div class="text-body-2 font-weight-light mb-n1">This is</div>

      <h1 class="text-h2 font-weight-bold">Home Page</h1>

      <div class="py-14" />
      <pre>{{ products }}</pre>
    </v-responsive>
  </v-container>
</template>

<script setup>
// imports
import { onMounted, computed } from "vue";
import { useProductStore } from "@/store/product";

// constants
const productStore = useProductStore();

// computed
const products = computed(() => productStore.getProducts);

// hooks
onMounted(async () => {
  console.log("mounted");

  productStore.fetchProducts();

  // const { data, error } = useFetch("https://fakestoreapi.com/products");
  // productStore.$state.products = data;
});
</script>
