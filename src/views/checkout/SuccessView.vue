<template>
  <div>
    <h1>This is Success Page</h1>
    <pre>
      {{ order }}
    </pre>
  </div>
</template>

<script setup>
// imports
import { computed } from "vue";
import { useCheckoutStore } from "@/store/checkout";

// constants
const checkoutStore = useCheckoutStore();

// computed
const order = computed(() => checkoutStore.getOrder);
</script>
