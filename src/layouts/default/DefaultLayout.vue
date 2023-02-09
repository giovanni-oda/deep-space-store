<template>
  <v-app>
    <default-bar />

    <default-view class="bg-grey-lighten-5" />

    <app-footer />
  </v-app>
</template>

<script setup>
import DefaultBar from "./DefaultAppBar.vue";
import DefaultView from "./DefaultView.vue";
import appFooter from "@/components/appFooter.vue";
</script>
