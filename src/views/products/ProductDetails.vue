<template>
  <div>
    <h1>This is Product Details Page</h1>

    <div>
      <pre v-if="product">
      {{ product }}
    </pre
      >
      <span v-else>Loading...</span>
    </div>
  </div>
</template>

<script setup>
// imports
import { onMounted, computed } from "vue";
import { useProductStore } from "@/store/product";
import { useRoute } from "vue-router";

// constants
const productStore = useProductStore();
const route = useRoute();

// computed
const product = computed(() => productStore.getProduct);

// state
const prodId = route.params.id;

// hooks
onMounted(async () => {
  if (!product.value) productStore.fetchProduct(prodId);
});

// Methods
</script>
