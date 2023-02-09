<template>
  <v-app-bar flat>
    <app-bar-title />
    <template v-slot:append>
      <a
        v-for="item in menuItems"
        :key="item.id"
        :href="item.link"
        class="text-uppercase text-primary text-decoration-none mr-3"
      >
        {{ item.title }}
      </a>
      <v-btn icon="mdi-cart"></v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
// imports
import appBarTitle from "@/components/appBarTitle.vue";

// state
const menuItems = [
  { id: 1, title: "Home", link: "#" },
  { id: 2, title: "Latest", link: "#latest" },
];
</script>
