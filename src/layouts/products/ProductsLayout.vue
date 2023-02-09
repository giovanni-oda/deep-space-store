<template>
  <v-app>
    <product-bar />

    <product-view class="bg-grey-lighten-5" />

    <app-footer />
  </v-app>
</template>

<script setup>
import ProductBar from "./ProductsAppBar.vue";
import ProductView from "./ProductsView.vue";
import appFooter from "@/components/appFooter.vue";
</script>
