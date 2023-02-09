<template>
  <v-app-bar flat>
    <app-bar-title />
    <template v-slot:append>
      <div class="d-none d-sm-block">
        <a
          v-for="item in menuItems"
          :key="item.id"
          :href="item.link"
          class="text-uppercase text-primary text-decoration-none mr-3"
        >
          {{ item.title }}
        </a>
      </div>
      <div class="d-sm-none">
        <v-btn icon="menu" color="primary">
          <v-menu activator="parent">
            <v-list>
              <v-list-item
                v-for="(item, index) in menuItems"
                :key="index"
                :value="index"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </div>
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
  { id: 2, title: "New Arrivals", link: "#latest" },
  { id: 3, title: "Best Sellers", link: "#best" },
];
</script>
