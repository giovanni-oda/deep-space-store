<template>
  <div class="product">
    <v-container>
      <v-row>
        <v-col>
          <v-card v-if="product" class="pa-4 elevation-3 my-4">
            <v-row>
              <v-col cols="12" sm="6">
                <v-img
                  class="ma-4"
                  :src="product.image"
                  max-height="500px"
                ></v-img>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="details mt-12 mb-sm-8 mr-sm-4">
                  <h3 class="mb-8">{{ product.title }}</h3>
                  <div class="d-flex">
                    <p class="mb-4">Price - U$ {{ product.price }}</p>
                    <v-spacer></v-spacer>
                    <p class="mr-2">Rating:</p>
                    <v-rating
                      v-model="product.rating.rate"
                      bg-color="orange-lighten-1"
                      color="orange"
                      density="compact"
                      size="small"
                      half-increments
                      readonly
                    ></v-rating>
                  </div>
                  <p class="font-weight-medium">Product Description</p>
                  <v-divider></v-divider>
                  <p class="mt-2 mb-8">{{ product.description }}</p>
                  <v-btn color="primary" :block="isMobile">Buy Now</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card>
          <div v-else class="d-flex flex-column align-center my-8">
            <span class="mb-6">Please wait! Loading product...</span>
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
// imports
import { onMounted, computed } from "vue";
import { useProductStore } from "@/store/product";
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify";

// constants
const productStore = useProductStore();
const route = useRoute();

// computed
const product = computed(() => productStore.getProduct);

// state
const { smAndDown: isMobile } = useDisplay();
const prodId = route.params.id;

// hooks
onMounted(async () => {
  if (!product.value) productStore.fetchProduct(prodId);
});

// Methods
</script>
