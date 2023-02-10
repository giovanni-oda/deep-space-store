<template>
  <div class="home mb-8">
    <section>
      <div
        class="hero py-12 d-flex align-center justify-center position-relative hero-image"
      >
        <v-container class="hero-text my-12">
          <h1 class="text-h2 font-weight-bold text-white">
            Blast off to Savings with
            <br />
            <span class="text-secondary">Deep Space Store</span>
          </h1>
          <h2 class="text-uppercase text-primary mt-4">
            Your One-Stop Shop for Out of This World Deals
          </h2>
          <v-btn
            color="primary"
            class="text-white mt-4"
            @click="router.push({ name: 'Products' })"
          >
            See our amazing products
          </v-btn>
        </v-container>
        <v-img
          class="w-100 h-100 position-absolute"
          gradient="to top right, rgba(159, 239, 20,.8), rgba(23, 51, 89,.9)"
        ></v-img>
      </div>
    </section>
    <section id="latest" class="pt-8">
      <v-container class="fill-height">
        <div class="d-flex w-100">
          <h3 class="text-primary text-uppercase ml-6">Latest Products</h3>
          <v-spacer></v-spacer>
          <router-link
            :to="{ name: 'Products' }"
            class="text-secondary text-decoration-none mr-4"
          >
            See More <v-icon size="small">mdi-chevron-right</v-icon>
          </router-link>
        </div>
        <v-row>
          <v-col class="d-flex flex-wrap align-left" v-if="products.length > 0">
            <product-card
              v-for="(product, index) in latestProducts"
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
    <section id="best" class="pt-8 bg-grey-lighten-4">
      <v-container class="fill-height">
        <div class="d-flex w-100">
          <h3 class="text-primary text-uppercase ml-6">Best Sellers</h3>
          <v-spacer></v-spacer>
          <router-link
            :to="{ name: 'Products' }"
            class="text-secondary text-decoration-none mr-4"
          >
            See More <v-icon size="small">mdi-chevron-right</v-icon>
          </router-link>
        </div>
        <v-row>
          <v-col class="d-flex flex-wrap align-left" v-if="products.length > 0">
            <product-card
              v-for="(product, index) in bestSellers"
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
const latestProducts = computed(() =>
  products.value.filter((obj) => obj.id < 7)
);
const bestSellers = computed(() =>
  products.value.filter((obj) => obj.id > 6 && obj.id < 10)
);

// Methods
function goTo(product) {
  productStore.updateProduct(product);
  router.push({ name: "ProductDetails", params: { id: product.id } });
}

// hooks
onMounted(async () => {
  if (products.value.length <= 0) productStore.fetchProducts();
});
</script>

<style scoped>
.hero-image {
  /* background-image: url("https://picsum.photos/1920/1080?random"); */
  /* background-color: rgba(255, 255, 255, 1); */
  /* background-blend-mode: luminosity; */
  background-image: url("@/assets/imgs/rocket-boy-hero.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.hero-text {
  z-index: 10;
}
</style>
