<template>
  <div class="product mb-8">
    <v-container>
      <v-row>
        <v-col v-if="product">
          <div class="text-uppercase text-caption">
            <router-link
              class="text-decoration-none text-primary"
              :to="{ name: 'Home' }"
            >
              <span> Home </span>
            </router-link>
            <v-icon class="mx-1">mdi-chevron-right</v-icon>
            <router-link
              class="text-decoration-none text-primary"
              :to="{ name: 'Products' }"
            >
              <span>Products</span>
            </router-link>
            <v-icon class="mx-1">mdi-chevron-right</v-icon>
            <span class="text-grey">{{ product.category }}</span>
          </div>
          <v-card class="pa-4 elevation-3 my-4">
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
                  <h3 class="mb-8 text-primary">{{ product.title }}</h3>
                  <div class="d-flex">
                    <p class="mb-4">Price - U$ {{ product.price }}</p>
                    <v-spacer></v-spacer>
                    <p class="mr-2">Rating:</p>
                    <v-rating
                      v-model="product.rating.rate"
                      color="secondary"
                      density="compact"
                      size="small"
                      half-increments
                      readonly
                    ></v-rating>
                  </div>
                  <p class="font-weight-medium">Product Description</p>
                  <v-divider></v-divider>
                  <p class="mt-2 mb-8 text-grey">{{ product.description }}</p>
                  <v-btn
                    color="primary"
                    class="text-secondary"
                    :block="isMobile"
                    @click="
                      $router.push({
                        name: 'Checkout',
                        params: { offer: prodId },
                      })
                    "
                  >
                    Buy Now
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col v-else>
          <div class="d-flex flex-column align-center my-8">
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
const route = useRoute();
const productStore = useProductStore();

// computed
const product = computed(() => productStore.getProduct);

// state
const { smAndDown: isMobile } = useDisplay();
const prodId = route.params.id;

// hooks
onMounted(() => {
  if (!product.value) productStore.fetchProduct(prodId);
});
</script>
