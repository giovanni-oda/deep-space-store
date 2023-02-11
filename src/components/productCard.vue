<template>
  <v-card class="mx-auto mx-4 my-4 my-sm-8 elevation-3" width="344">
    <v-img class="ma-4" :src="props.image" height="200px"></v-img>

    <v-card-title> {{ props.title }} </v-card-title>

    <v-card-subtitle> U$ {{ props.price }} </v-card-subtitle>

    <v-card-actions>
      <v-btn color="primary" variant="text" @click="viewDetails()">
        See Details
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        <v-tooltip activator="parent" location="top"> Description </v-tooltip>
      </v-btn>
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

// constants (Macros)
const props = defineProps(["title", "price", "description", "image"]);
const emit = defineEmits(["goto-product"]);

// state
const show = ref(false);

// methods
function viewDetails() {
  emit("goto-product");
}
</script>
