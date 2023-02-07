<template>
  <div class="home">
    <h1 class="text-h2 font-weight-bold text-center">Deep Space Store</h1>
    <section class="pt-8">
      <v-container class="fill-height">
        <v-row>
          <v-col class="d-flex flex-wrap align-left" v-if="products.length > 0">
            <product-card
              v-for="(product, index) in products"
              :key="index"
              :title="product.title"
              :price="product.price"
              :description="product.description"
              :image="product.image"
              @GotoProduct="goTo(product)"
            />
          </v-col>
          <v-col v-else>
            <div class="d-flex flex-column align-center">
              <span class="mb-6">Please wait! Loading products...</span>
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
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
import { useRouter } from "vue-router";
import productCard from "@/components/productCard.vue";

// constants
const productStore = useProductStore();
const router = useRouter();

// computed
const products = computed(() => productStore.getProducts);

// hooks
onMounted(async () => {
  // console.log("mounted");
  productStore.fetchProducts();
});

// Methods
function goTo(product) {
  console.log("prodId", product.id);
  productStore.updateProduct(product);
  router.push({ name: "productDetails", params: { id: product.id } });
}
</script>
