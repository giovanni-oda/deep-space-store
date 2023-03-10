<template>
  <div class="checkout">
    <section class="pt-8">
      <v-container>
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
        <v-row v-if="!offer">
          <div class="d-flex flex-column align-center w-100 py-16">
            <span class="mb-6">Please wait! Loading offer...</span>
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
        </v-row>
        <v-row v-else>
          <v-col class="d-flex flex-wrap align-left">
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
                    <img
                      :src="offer.image.split('.')[0] + '_thumb.jpg'"
                      :alt="offer.title"
                      height="30"
                    />
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
        </v-row>
        <v-row class="mb-8">
          <v-col cols="12" md="8">
            <v-card
              title="Contact information"
              subtitle="* Required field"
              class="w-100 pa-2 elevation-3 mt-4"
            >
              <v-card-text>
                <v-form ref="contactForm">
                  <v-text-field
                    v-model="contactData.name"
                    :rules="[(v) => !!v || 'The Name field is required']"
                    color="primary"
                    label="Name *"
                    required
                  ></v-text-field>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="contactData.email"
                        :rules="[(v) => checkEmailFormat(v) || 'Invalid email']"
                        color="primary"
                        label="Email"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="contactData.phone"
                        type="number"
                        :counter="11"
                        :rules="[
                          (v) => !!v || 'The Phone field is required',
                          (v) => (v && v.length == 11) || 'Invalid Format',
                          (v) => validateCelPhone(v) || 'Invalid mobile number',
                        ]"
                        color="primary"
                        label="Mobile Phone *"
                        hint="Area code + 9 numbers"
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-card-title class="pb-0">Shipping Information</v-card-title>
              <v-card-subtitle>* Required field</v-card-subtitle>
              <v-card-text>
                <v-form ref="shippingForm">
                  <v-row>
                    <v-col :cols="isMobile ? 8 : 10">
                      <v-text-field
                        v-model="shippingData.zip"
                        color="primary"
                        type="number"
                        :counter="8"
                        hint="Enter exactly 8 numbers"
                        :rules="[
                          (v) => !!v || 'Required field',
                          (v) => (v && v.length == 8) || 'Invalid Format',
                        ]"
                        label="Postal Code *"
                        required
                        persistent-hint
                        @blur="handleZip()"
                        @keypress.enter="handleZip()"
                      ></v-text-field>
                    </v-col>
                    <v-col :cols="isMobile ? 4 : 2">
                      <v-btn
                        color="grey-lighten-4"
                        class="pt-5 pb-9 text-primary"
                        :loading="intLoading"
                        :disabled="intLoading"
                        @click="handleZip()"
                      >
                        Search
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-expand-transition>
                    <div v-if="showAddress">
                      <v-text-field
                        v-model="shippingData.address.logradouro"
                        color="primary"
                        :rules="[(v) => !!v || 'Required field']"
                        :disabled="intLoading"
                        label="Street *"
                        required
                      ></v-text-field>
                      <v-row>
                        <v-col cols="12" sm="6" class="pb-0">
                          <v-text-field
                            v-model="shippingData.address.complemento"
                            :disabled="intLoading"
                            color="primary"
                            label="Complement"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" class="pb-0">
                          <v-text-field
                            v-model="shippingData.address.bairro"
                            color="primary"
                            :rules="[(v) => !!v || 'Required field']"
                            :disabled="intLoading"
                            label="Neighborhood *"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="mt-0">
                        <v-col cols="8" class="pb-0">
                          <v-text-field
                            v-model="shippingData.address.localidade"
                            color="primary"
                            :rules="[(v) => !!v || 'Required field']"
                            :disabled="intLoading"
                            label="City *"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="4" class="pb-0">
                          <v-text-field
                            v-model="shippingData.address.uf"
                            color="primary"
                            :rules="[(v) => !!v || 'Required field']"
                            :disabled="intLoading"
                            label="State *"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </div>
                  </v-expand-transition>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card
              title="Payment information"
              subtitle="Card Holder Data"
              class="w-100 pa-2 elevation-3 mt-4"
              style="min-height: 435px"
            >
              <v-form ref="paymentForm">
                <v-card-text>
                  <v-text-field
                    v-model="paymentData.cpf"
                    color="primary"
                    type="number"
                    :disabled="paymentLoading || pixLoading"
                    :counter="11"
                    :rules="[
                      (v) => !!v || 'Required field',
                      (v) => (v && v.length == 11) || 'Invalid Format',
                      (v) =>
                        validateCPF(v) ||
                        v === '00000000000' ||
                        'Invalid CPF number',
                    ]"
                    hint="Enter exactly 11 numbers"
                    label="CPF *"
                    required
                    persistent-hint
                  ></v-text-field>
                </v-card-text>
                <v-card-title class="pb-0">Available methods</v-card-title>
                <v-card-subtitle>* Required field</v-card-subtitle>
                <v-card-text class="pt-2">
                  <v-radio-group
                    v-model="paymentData.type"
                    :disabled="paymentLoading || pixLoading"
                    class="ml-0"
                    color="primary"
                    inline
                    mandatory
                  >
                    <v-radio
                      label="Credit Card"
                      value="creditCard"
                      class="mr-2"
                    ></v-radio>
                    <v-radio label="PIX" value="pix" class="ml-2"></v-radio>
                  </v-radio-group>
                  <v-expand-transition>
                    <div
                      v-if="paymentData.type === 'creditCard'"
                      class="rounded"
                      style="position: relative"
                    >
                      <v-overlay
                        v-model="paymentLoading"
                        contained
                        persistent
                        class="align-center justify-center"
                      >
                        <div
                          class="d-flex flex-column align-center justify-center text-primary"
                        >
                          <v-progress-circular
                            color="primary"
                            indeterminate
                            class="mb-4"
                          ></v-progress-circular>
                          <span>Processing Payment</span>
                          <span>Please wait</span>
                        </div>
                      </v-overlay>
                      <v-text-field
                        v-model="paymentData.cardData.number"
                        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                        maxlength="16"
                        color="primary"
                        type="number"
                        :rules="[(v) => !!v || 'Required field']"
                        :disabled="paymentLoading"
                        label="Card Number *"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="paymentData.cardData.holder"
                        color="primary"
                        :rules="[(v) => !!v || 'Required field']"
                        :disabled="paymentLoading"
                        label="Holder Name *"
                        required
                      ></v-text-field>
                      <v-row>
                        <v-col cols="8">
                          <v-text-field
                            v-model="paymentData.cardData.validity"
                            color="primary"
                            :rules="[(v) => !!v || 'Required']"
                            :disabled="paymentLoading"
                            maxlength="5"
                            hint="mm/yy"
                            label="Expiration Date *"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="4"
                          ><v-text-field
                            v-model="paymentData.cardData.cvv"
                            color="primary"
                            :rules="[(v) => !!v || 'Required']"
                            :disabled="paymentLoading"
                            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                            maxlength="3"
                            label="CVV *"
                            required
                          ></v-text-field
                        ></v-col>
                      </v-row>
                    </div>
                  </v-expand-transition>
                  <v-expand-transition>
                    <div
                      v-if="paymentData.type === 'pix'"
                      class="rounded"
                      style="position: relative"
                    >
                      <div class="text-center">
                        <v-overlay
                          v-model="pixLoading"
                          contained
                          persistent
                          class="align-center justify-center"
                        >
                          <div
                            class="d-flex flex-column align-center justify-center text-primary"
                          >
                            <v-progress-circular
                              color="primary"
                              indeterminate
                              class="mb-4"
                            ></v-progress-circular>
                            <span>Processing</span>
                            <span>Simulated Payment</span>
                          </div>
                        </v-overlay>
                        <!-- <span class="mb-1">Pix QR Code</span> -->
                        <span class="text-caption text-green">
                          Click to Simulate Payment
                        </span>
                        <v-img
                          width="150"
                          src="@/assets/imgs/Qr_Code_Temp.png"
                          class="mx-auto mb-2"
                          @click="simulatePix()"
                          style="cursor: pointer"
                        ></v-img>
                        <span class="pt-4 text-grey">
                          Point your camera at the QR Code or use the key below:
                        </span>
                        <p class="text-primary">payment@deepspacestore.com</p>
                      </div>
                    </div>
                  </v-expand-transition>
                  <div class="mt-9">
                    <v-btn
                      :color="isDisabled() ? 'grey-lighten-1' : 'secondary'"
                      :class="{
                        'text-primary': !isDisabled(),
                        'text-white': isDisabled(),
                      }"
                      block
                      :disabled="isDisabled()"
                      @click="doCheckout()"
                    >
                      PAY & Finalize
                    </v-btn>
                  </div>
                </v-card-text>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
        <!-- <v-row class="mb-8">
          <v-col cols="12">
            <v-card
              title="Summary information"
              subtitle="Subtitle"
              class="w-100 pa-2 elevation-3 mt-4"
            >
              <v-card-text>3</v-card-text>
            </v-card>
          </v-col>
        </v-row> -->
      </v-container>
    </section>
  </div>
</template>

<script setup>
// imports
import { onMounted, onUnmounted, computed, watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCheckoutStore } from "@/store/checkout";
import { useAppStore } from "@/store/app";
import { useDisplay } from "vuetify";
import useValidationLib from "@/composables/ValidationLib";

// constants
const checkoutStore = useCheckoutStore();
const appStore = useAppStore();
const route = useRoute();
const router = useRouter();
const { validateCelPhone } = useValidationLib();
const { validateCPF } = useValidationLib();

// computed
const offer = computed(() => checkoutStore.getOffer);
const zipAddress = computed(() => checkoutStore.getZip);

// watch address returned from msw
watch(zipAddress, async (val) => {
  if (val) {
    await setAddressData(val);
    showAddress.value = true;
    intLoading.value = false;
  }
});

// state
const { offer: code } = route.params;
const contactForm = ref(null);
const shippingForm = ref(null);
const paymentForm = ref(null);
const { smAndDown: isMobile } = useDisplay();
const cart = ref({
  amount: 1,
  subtotal: 0,
  item: offer.value,
});
const contactData = ref({
  name: "",
  email: "",
  phone: "",
});
const shippingData = ref({
  zip: "",
  address: {
    logradouro: "",
    complemento: "",
    bairro: "",
    localidade: "",
    uf: "",
  },
});
const showAddress = ref(false);
const intLoading = ref(false);
const paymentData = ref({
  cpf: "",
  type: null,
  cardData: {
    number: "",
    holder: "",
    validity: "",
    cvv: "",
  },
});
const paymentLoading = ref(false);
const pixLoading = ref(false);

// Methods
function handleAmount(type) {
  if (type === "rem" && cart.value.amount > 1) cart.value.amount--;
  if (type === "add" && cart.value.amount < 99) cart.value.amount++;
}

async function handleZip() {
  const { valid } = await shippingForm.value.validate();
  if (valid) {
    intLoading.value = true;
    checkoutStore.fetchZip(shippingData.value.zip);
  }
}

async function setAddressData(val) {
  shippingData.value.address.logradouro = val.logradouro;
  shippingData.value.address.complemento = val.complemento;
  shippingData.value.address.bairro = val.bairro;
  shippingData.value.address.localidade = val.localidade;
  shippingData.value.address.uf = val.uf;
}

function isDisabled() {
  if (paymentLoading.value) return true;
  if (paymentData.value.type === "pix") return true;
  if (!zipAddress.value) return true;
  if (!paymentData.value.type) return true;
  return false;
}

async function doCheckout() {
  const valid = await isAllFormsValid();
  if (valid) {
    paymentLoading.value = true;
    setCartData();
    const resp = await checkoutStore.createOrder(1, { ...cart.value });
    if (resp.paymentStatus && resp.paymentStatus === "PAID") {
      router.push({ name: "Success" });
    }
    paymentLoading.value = false;
  } else {
    appStore.feedBack = {
      text: "One or more required fields are missing.",
      theme: "error",
      timeOut: 5000,
    };
  }
}

async function simulatePix() {
  const valid = await isAllFormsValid();
  if (valid) {
    pixLoading.value = true;
    setCartData();
    const resp = await checkoutStore.createOrder(1, { ...cart.value });
    if (resp.paymentStatus && resp.paymentStatus === "PAID") {
      router.push({ name: "Success" });
    }
    pixLoading.value = false;
  } else {
    appStore.feedBack = {
      text: "To complete the simulation fill in the required fields.",
      theme: "error",
      timeOut: 5000,
    };
  }
}

async function isAllFormsValid() {
  const { valid: contactValid } = await contactForm.value.validate();
  const { valid: shippingValid } = await shippingForm.value.validate();
  const { valid: paymentValid } = await paymentForm.value.validate();
  return contactValid && shippingValid && paymentValid;
}

function setCartData() {
  cart.value.cpf = paymentData.value.cpf;
  cart.value.offerId = offer.value.id;
  cart.value.subtotal = offer.value.price * cart.value.amount;
  cart.value.item = { ...offer.value };
  cart.value.contactData = { ...contactData.value };
  cart.value.shippingData = { ...shippingData.value };
  cart.value.paymentData = { ...paymentData.value };
}

function checkEmailFormat(val) {
  if (val === "") return true;
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(val);
}

// hooks
onMounted(() => {
  checkoutStore.fetchOffer(code);
});

onUnmounted(() => {
  checkoutStore.$patch({ offer: null });
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
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
