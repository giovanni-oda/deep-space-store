<template>
  <v-card class="mx-auto mx-4 my-8 elevation-4" width="344">
    <v-img class="ma-4" :src="props.image" height="200px"></v-img>

    <v-card-title> {{ props.title }} </v-card-title>

    <v-card-subtitle> U$ {{ props.price }} </v-card-subtitle>

    <v-card-actions>
      <v-btn color="primary" variant="text"> See Details </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ props.description }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script setup>
// imports
import { ref } from "vue";

// constants
const props = defineProps(["id", "title", "price", "description", "image"]);

// state
const show = ref(false);

// computed

// hooks
</script>

<style>
/* // */
</style>
