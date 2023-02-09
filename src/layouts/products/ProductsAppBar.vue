<template>
  <v-app-bar flat>
    <app-bar-title />
    <template v-slot:append>
      <v-btn variant="plain" color="primary" @click="router.go(-1)">
        GO BACK
      </v-btn>
      <v-btn icon="mdi-cart" color="primary"></v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
// imports
import appBarTitle from "@/components/appBarTitle.vue";
import { useRouter } from "vue-router";

// constants
const router = useRouter();
</script>
