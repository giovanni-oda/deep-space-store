<template>
  <v-app>
    <product-bar />

    <product-view class="bg-grey-lighten-5" />
  </v-app>
</template>

<script setup>
import ProductBar from "./ProductsAppBar.vue";
import ProductView from "./ProductsView.vue";
</script>
