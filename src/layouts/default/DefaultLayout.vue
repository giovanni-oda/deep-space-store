<template>
  <v-app>
    <default-bar />

    <snack-bar
      v-if="feedBack"
      :data="appStore.getFeedBack"
      @reset-feed-back="appStore.feedBack = null"
    ></snack-bar>

    <default-view class="bg-grey-lighten-5" />

    <app-footer />
  </v-app>
</template>

<script setup>
// imports
import DefaultBar from "./DefaultAppBar.vue";
import DefaultView from "./DefaultView.vue";
import appFooter from "@/components/appFooter.vue";
import SnackBar from "@/components/SnackBar.vue";

import { computed } from "vue";
import { useAppStore } from "@/store/app";

// constants
const appStore = useAppStore();

// computed
const feedBack = computed(() => appStore.getFeedBack);
console.log("feedBack", feedBack.value);
</script>
