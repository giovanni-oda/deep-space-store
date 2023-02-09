<template>
  <div class="products-index">
    <section id="all" class="pt-8">
      <v-container class="fill-height">
        <v-row class="">
          <v-col cols="12" sm="6" class="pl-8">
            <h3 class="text-primary text-uppercase">All Products</h3>
          </v-col>
          <v-col cols="12" sm="6" class="pl-8">
            <div
              class="text-secondary text-uppercase text-sm-right mr-4 d-flex flex-wrap justify-sm-right"
            >
              <div v-for="category in categories" :key="category.id">
                <span
                  :class="{ 'text-primary': category.selected }"
                  style="cursor: pointer"
                  @click="toggleSelect(category)"
                >
                  {{ category.name }}
                </span>
                <span v-if="category.id < 3" class="mx-2 text-primary">|</span>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex flex-wrap align-left" v-if="products.length > 0">
            <product-card
              v-for="(product, index) in filteredProds"
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
import { onMounted, computed, ref } from "vue";
import { useProductStore } from "@/store/product";
import { useRouter } from "vue-router";
import productCard from "@/components/productCard.vue";

// constants
const productStore = useProductStore();
const router = useRouter();

// state
const categories = ref([
  { id: 0, name: "electronics", selected: false },
  { id: 1, name: "jewelery", selected: false },
  { id: 2, name: "men's clothing", selected: false },
  { id: 3, name: "women's clothing", selected: false },
]);

// computed
const products = computed(() => productStore.getProducts);
const selectedCategory = computed(
  () => categories.value.find((obj) => obj.selected)?.name
);
const filteredProds = computed(() => {
  if (!selectedCategory.value) return products.value;
  else
    return products.value.filter(
      (obj) => obj.category === selectedCategory.value
    );
});

// Methods
function goTo(product) {
  productStore.updateProduct(product);
  router.push({ name: "ProductDetails", params: { id: product.id } });
}

function toggleSelect(cat) {
  if (cat.selected) cat.selected = false;
  else categories.value.forEach((obj) => (obj.selected = obj.id === cat.id));
}

// hooks
onMounted(async () => {
  if (products.value.length <= 0) productStore.fetchProducts();
});
</script>
