<template>
  <div class="checkout">
    <section class="pt-8">
      <v-container class="fill-height">
        <div class="d-flex w-100">
          <h3 class="text-primary text-uppercase">Checkout</h3>
          <v-spacer></v-spacer>
          <router-link
            :to="{ name: 'Products' }"
            class="text-secondary text-decoration-none"
          >
            Browse Products
            <v-icon size="small">mdi-chevron-right</v-icon>
          </router-link>
        </div>
        <v-row>
          <v-col class="d-flex flex-wrap align-left" v-if="offer">
            <v-card
              title="Product information"
              :subtitle="`Offer Code ${offer.id}`"
              class="w-100 pa-4 elevation-3 mt-4"
            >
              <v-row class="pr-4 text-caption text-grey d-none d-sm-flex">
                <v-col cols="12" sm="6" class="pb-0">
                  <div class="ml-4">
                    <span>Description</span>
                  </div>
                </v-col>
                <v-col cols="12" sm="2" class="pb-0">
                  <div class="text-left">
                    <span>Price</span>
                  </div>
                </v-col>
                <v-col cols="12" sm="2" class="pb-0">
                  <div class="text-center">
                    <span>Amount</span>
                  </div>
                </v-col>
                <v-col cols="12" sm="2" class="pb-0">
                  <div class="text-right">
                    <span>Subtotal</span>
                  </div>
                </v-col>
              </v-row>
              <v-row class="pr-4">
                <v-col cols="12" sm="6">
                  <span class="ml-4 mr-2 font-weight-medium d-sm-none">
                    Description:
                  </span>
                  <div class="d-flex pl-4 mt-2 mt-sm-0">
                    <img :src="offer.image" :alt="offer.title" height="30" />
                    <span class="text-primary ml-4">{{ offer.title }}</span>
                  </div>
                </v-col>
                <v-col cols="12" sm="2">
                  <span class="ml-4 mr-2 font-weight-medium d-sm-none">
                    Price:
                  </span>
                  <span class="text-primary">U$ {{ offer.price }}</span>
                </v-col>
                <v-col cols="12" sm="2" class="pl-6 pl-sm-3">
                  <span class="mr-2 font-weight-medium d-sm-none">
                    Amount:
                  </span>
                  <div class="amount-btn-container d-flex pa-1 mt-2 mt-sm-0">
                    <v-btn
                      size="x-small"
                      icon="mdi-minus"
                      color="primary"
                      variant="outlined"
                      :disabled="cart.amount <= 1"
                      @click="handleAmount('rem')"
                    ></v-btn>
                    <span class="mx-1 text-primary">{{ cart.amount }}</span>
                    <v-btn
                      size="x-small"
                      icon="mdi-plus"
                      color="primary"
                      variant="outlined"
                      :disabled="cart.amount >= 99"
                      @click="handleAmount('add')"
                    ></v-btn>
                  </div>
                </v-col>
                <v-col cols="12" sm="2">
                  <div class="text-right">
                    <span class="ml-4 mr-2 font-weight-medium d-sm-none">
                      Subtotal:
                    </span>
                    <span class="text-primary">
                      U$ {{ offer.price * cart.amount }}
                    </span>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col v-else>
            <div class="d-flex flex-column align-center">
              <span class="mb-6">Please wait! Loading offer...</span>
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
import { useRoute } from "vue-router";
import { useCheckoutStore } from "@/store/checkout";
import { useDisplay } from "vuetify";

// constants
const checkoutStore = useCheckoutStore();
const route = useRoute();

// state
const { offer: code } = route.params;

// computed
const offer = computed(() => checkoutStore.getOffer);

// state
const { smAndDown: isMobile } = useDisplay();
console.log("isMobile", isMobile.value);
const cart = ref({
  amount: 1,
  subtotal: 0,
  items: [offer.value],
});

// Methods
function handleAmount(type) {
  if (type === "rem" && cart.value.amount > 1) cart.value.amount--;
  if (type === "add" && cart.value.amount < 99) cart.value.amount++;
}

// hooks
onMounted(() => {
  // if (!offer.value) checkoutStore.fetchOffer(code);
  checkoutStore.fetchOffer(code);
});
</script>

<style scoped>
.amount-btn-container {
  border: 1px lightgrey solid;
  border-radius: 20px;
  align-items: center;
  justify-content: space-between;
}
</style>
