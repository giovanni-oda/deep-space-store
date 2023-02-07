<template>
  <div class="home">
    <h1 class="text-h2 font-weight-bold text-center">Deep Space Store</h1>
    <section class="pt-8">
      <v-container class="fill-height">
        <v-row>
          <v-col class="d-flex flex-wrap">
            <productCard
              v-for="(product, index) in products"
              :key="index"
              :id="product.id"
              :title="product.title"
              :price="product.price"
              :description="product.description"
              :image="product.image"
            />
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup>
// imports
import { onMounted, computed } from "vue";
import { useProductStore } from "@/store/product";
import productCard from "@/components/productCard.vue";

// constants
const productStore = useProductStore();

// computed
const products = computed(() => productStore.getProducts);

// hooks
onMounted(async () => {
  // console.log("mounted");
  productStore.fetchProducts();
});
</script>
