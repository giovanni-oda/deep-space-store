<template>
  <div class="checkout">
    <section class="pt-8">
      <v-container v-if="!order">
        <v-row>
          <div class="d-flex flex-column align-center w-100 py-16">
            <h3 class="text-h5 text-primary mb-2">Opppss, order not found!</h3>
            <p class="mb-8">Please check the address and try again.</p>
            <router-link to="/">
              <v-btn color="primary text-secondary">Or back to Home</v-btn>
            </router-link>
          </div>
        </v-row>
      </v-container>
      <v-container class="mb-8" v-else>
        <div class="text-center mt-4 mb-12">
          <h1
            class="text-uppercase text-h4 font-weight-medium text-secondary mb-2"
          >
            Purchase made successfully!
          </h1>
          <h3 class="text-primary">Thank you for your preference.</h3>
          <p class="text-caption text-grey mt-4">
            Please write down and keep your order number:
          </p>
          <span class="text-primary">{{ order.orderId }}</span>
        </div>
        <div class="d-flex w-100">
          <h3 class="text-primary text-uppercase">Summary</h3>
          <v-spacer></v-spacer>
          <router-link
            :to="{ name: 'Products' }"
            class="text-secondary text-decoration-none"
          >
            Continue Shopping
            <v-icon size="small">mdi-chevron-right</v-icon>
          </router-link>
        </div>
        <v-row>
          <v-col class="d-flex flex-wrap align-left">
            <v-card
              title="Order information"
              :subtitle="`# ${order.orderId}`"
              class="w-100 pa-4 elevation-3 mt-4"
            >
              <v-card-text>
                <v-row class="text-caption text-grey d-none d-sm-flex">
                  <v-col cols="12" sm="4" class="pb-0">
                    <div class="text-left">
                      <span>Name</span>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="4" class="pb-0">
                    <div class="text-left">
                      <span>Email</span>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="4" class="pb-0">
                    <div class="text-right">
                      <span>Phone</span>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4" class="pt-0">
                    <span class="mr-2 font-weight-medium d-sm-none">
                      Nome:
                    </span>
                    <span class="text-primary">
                      {{ order.contactData.name }}
                    </span>
                  </v-col>
                  <v-col cols="12" sm="4" class="pt-0">
                    <span class="mr-2 font-weight-medium d-sm-none">
                      Email:
                    </span>
                    <span class="text-primary">
                      {{ order.contactData.email }}
                    </span>
                  </v-col>
                  <v-col cols="12" sm="4" class="pt-0">
                    <div class="text-sm-right">
                      <span class="mr-2 font-weight-medium d-sm-none">
                        Phone:
                      </span>
                      <span class="text-primary">
                        {{ order.contactData.phone }}
                      </span>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-text class="pt-0">
                <v-row class="text-caption text-grey d-none d-sm-flex">
                  <v-col cols="12" sm="4" class="pb-0">
                    <div class="text-left">
                      <span>Payment Document</span>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="4" class="pb-0">
                    <div class="text-left">
                      <span>Payment Type</span>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="4" class="pb-0">
                    <div class="text-right">
                      <span>Payment Status</span>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4" class="pt-0">
                    <span class="mr-2 font-weight-medium d-sm-none">
                      Payment Document:
                    </span>
                    <span class="text-primary">
                      {{ order.paymentData.cpf }}
                    </span>
                  </v-col>
                  <v-col cols="12" sm="4" class="pt-0">
                    <span class="mr-2 font-weight-medium d-sm-none">
                      Payment Type:
                    </span>
                    <span class="text-primary">
                      {{
                        order.paymentData.type === "creditCard"
                          ? "Credit Card"
                          : "Pix"
                      }}
                    </span>
                  </v-col>
                  <v-col cols="12" sm="4" class="pt-0">
                    <div class="text-sm-right">
                      <span class="mr-2 font-weight-medium d-sm-none">
                        Payment Status:
                      </span>
                      <span class="text-primary">
                        {{ order.paymentData.status }}
                      </span>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex flex-wrap align-left">
            <v-card
              title="Product information"
              :subtitle="`Offer Code ${order.item.id}`"
              class="w-100 pa-4 elevation-3"
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
                  <div class="text-left">
                    <span>Amount</span>
                  </div>
                </v-col>
                <v-col cols="12" sm="2" class="pb-0">
                  <div class="text-right">
                    <span>Total</span>
                  </div>
                </v-col>
              </v-row>
              <v-row class="pr-4">
                <v-col cols="12" sm="6">
                  <span class="ml-4 mr-2 font-weight-medium d-sm-none">
                    Description:
                  </span>
                  <div class="d-flex pl-4 mt-2 mt-sm-0">
                    <img
                      :src="order.item.image.split('.')[0] + '_thumb.jpg'"
                      :alt="order.item.title"
                      height="30"
                    />
                    <span class="text-primary ml-4">{{
                      order.item.title
                    }}</span>
                  </div>
                </v-col>
                <v-col cols="12" sm="2">
                  <span class="ml-4 mr-2 font-weight-medium d-sm-none">
                    Price:
                  </span>
                  <span class="text-primary">U$ {{ order.item.price }}</span>
                </v-col>
                <v-col cols="12" sm="2" class="pl-6 pl-sm-3">
                  <span class="mr-2 font-weight-medium d-sm-none">
                    Amount:
                  </span>
                  <span class="text-primary">{{ order.amount }}</span>
                </v-col>
                <v-col cols="12" sm="2">
                  <div class="text-right">
                    <span class="ml-4 mr-2 font-weight-medium d-sm-none">
                      Subtotal:
                    </span>
                    <span class="text-primary"> U$ {{ order.subtotal }} </span>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex flex-wrap align-left">
            <v-card
              title="Shipping information"
              :subtitle="`${order.shippingData.address.localidade} / ${order.shippingData.address.uf}`"
              class="w-100 pa-4 elevation-3"
            >
              <v-card-text>
                <v-row class="text-caption text-grey d-none d-sm-flex">
                  <v-col cols="12" sm="4" class="pb-0">
                    <div class="text-left">
                      <span>Postal Code</span>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="4" class="pb-0">
                    <div class="text-left">
                      <span>Street</span>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="4" class="pb-0">
                    <div class="text-right">
                      <span>Complement</span>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4" class="pt-0">
                    <span class="mr-2 font-weight-medium d-sm-none">
                      Postal Code:
                    </span>
                    <span class="text-primary">
                      {{ order.shippingData.zip }}
                    </span>
                  </v-col>
                  <v-col cols="12" sm="4" class="pt-0">
                    <span class="mr-2 font-weight-medium d-sm-none">
                      Street:
                    </span>
                    <span class="text-primary">
                      {{ order.shippingData.address.logradouro }}
                    </span>
                  </v-col>
                  <v-col cols="12" sm="4" class="pt-0">
                    <div class="text-sm-right">
                      <span class="mr-2 font-weight-medium d-sm-none">
                        Complement:
                      </span>
                      <span class="text-primary">
                        {{ order.shippingData.address.complemento }}
                      </span>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-text class="pt-0">
                <v-row class="text-caption text-grey d-none d-sm-flex">
                  <v-col cols="12" sm="4" class="pb-0">
                    <div class="text-left">
                      <span>Neighborhood</span>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="4" class="pb-0">
                    <div class="text-left">
                      <span>City</span>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="4" class="pb-0">
                    <div class="text-right">
                      <span>State</span>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="4" class="pt-0">
                    <span class="mr-2 font-weight-medium d-sm-none">
                      Neighborhood:
                    </span>
                    <span class="text-primary">
                      {{ order.shippingData.address.bairro }}
                    </span>
                  </v-col>
                  <v-col cols="12" sm="4" class="pt-0">
                    <span class="mr-2 font-weight-medium d-sm-none">
                      City:
                    </span>
                    <span class="text-primary">
                      {{ order.shippingData.address.localidade }}
                    </span>
                  </v-col>
                  <v-col cols="12" sm="4" class="pt-0">
                    <div class="text-sm-right">
                      <span class="mr-2 font-weight-medium d-sm-none">
                        State:
                      </span>
                      <span class="text-primary">
                        {{ order.shippingData.address.uf }}
                      </span>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <!-- To help devs and stakeholders to see server response -->
            <p
              v-if="!showJson"
              class="text-secondary mt-2"
              style="cursor: pointer"
              @click="showJson = true"
            >
              See Json Response
            </p>
            <v-expansion-panels v-if="showJson" class="mt-6 elevation-3">
              <v-expansion-panel title="See JSON Response">
                <v-expansion-panel-text>
                  <pre> {{ order }} </pre>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup>
// imports
import { computed, ref } from "vue";
import { useCheckoutStore } from "@/store/checkout";

// constants
const checkoutStore = useCheckoutStore();

// computed
const order = computed(() => checkoutStore.getOrder);

// state
const showJson = ref(false);
</script>
