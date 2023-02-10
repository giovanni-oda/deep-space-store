<template>
  <div>
    <h1>This is checkout page</h1>
    <pre>
      {{ offer }}
    </pre>
  </div>
</template>

<script setup>
// imports
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useCheckoutStore } from "@/store/checkout";

// constants
const checkoutStore = useCheckoutStore();
const route = useRoute();

// state
const { offer: code } = route.params;

// computed
const offer = computed(() => checkoutStore.getOffer);

// hooks
onMounted(() => {
  // if (!offer.value) checkoutStore.fetchOffer(code);
  checkoutStore.fetchOffer(code);
});
</script>
