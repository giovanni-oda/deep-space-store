<template>
  <v-app-bar flat>
    <Router-link
      class="d-flex text-decoration-none text-primary"
      :to="{ name: 'Home' }"
    >
      <img class="ml-4" width="32" src="@/assets/imgs/YS_Icon.png" />
      <v-app-bar-title class="ml-3"> Deep Space Store </v-app-bar-title>
    </Router-link>
    <template v-slot:append>
      <div v-if="route.name === 'Home'" class="d-none d-sm-block">
        <a
          v-for="item in menuItems"
          :key="item.id"
          :href="item.link"
          class="text-uppercase text-primary text-decoration-none"
        >
          <v-btn variant="plain" color="primary">
            {{ item.title }}
          </v-btn>
        </a>
      </div>
      <v-btn v-else variant="plain" color="primary" @click="router.go(-1)">
        GO BACK
      </v-btn>
      <v-btn icon="mdi-cart" color="primary"></v-btn>
      <div v-if="route.name === 'Home'" class="d-sm-none">
        <v-btn icon="mdi-menu" color="primary">
          <v-icon>mdi-menu</v-icon>
          <v-menu activator="parent">
            <v-list>
              <v-list-item
                v-for="(item, index) in menuItems"
                :key="index"
                :value="index"
              >
                <a :href="item.link" class="text-primary text-decoration-none">
                  <v-list-item-title>
                    {{ item.title }}
                  </v-list-item-title>
                </a>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </div>
    </template>
  </v-app-bar>
</template>

<script setup>
// imports
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

// constants
const route = useRoute();
const router = useRouter();

// state
const menuItems = [
  { id: 1, title: "Home", link: "#" },
  { id: 2, title: "New Arrivals", link: "#latest" },
  { id: 3, title: "Best Sellers", link: "#best" },
];
</script>
