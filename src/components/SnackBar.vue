<template>
  <v-snackbar
    v-model="showAlert"
    :timeout="timeOut"
    :color="themeData[theme].bg"
    :location="isMobile ? 'top' : 'bottom'"
    @update:model-value="handleOpenClose"
  >
    <v-icon
      v-if="icon || themeData[theme].icon"
      large
      :color="themeData[theme].textColor"
      class="mr-2"
    >
      {{ icon ? icon : themeData[theme].icon }}
    </v-icon>
    <span :class="'text-' + themeData[theme].textColor">
      {{ text }}
    </span>

    <template v-slot:actions>
      <v-btn
        icon="mdi-close"
        :color="themeData[theme].btnColor"
        variant="text"
        @click="resetFeedBack"
      >
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref } from "vue";
import { useDisplay } from "vuetify";

// constants
const { smAndDown: isMobile } = useDisplay();

// emits
const emit = defineEmits(["resetFeedBack"]);

// props
const props = defineProps(["data"]);

// state
const showAlert = ref(true);
const timeOut = props.data && props.data.timeOut ? props.data.timeOut : -1;
const icon = props.data && props.data.icon ? props.data.icon : null;
const text = props.data && props.data.text ? props.data.text : "Text";
const theme = props.data && props.data.theme ? props.data.theme : "default";

const themeData = {
  default: {
    icon: null,
    bg: "secondary",
    textColor: "primary",
    btnColor: "primary",
  },
  primary: {
    icon: null,
    bg: "primary",
    textColor: "secondary",
    btnColor: "white",
  },
  success: {
    icon: "mdi-check-bold",
    bg: "secondary",
    textColor: "primary",
    btnColor: "white",
  },
  error: {
    icon: "mdi-alert-circle",
    bg: "red-lighten-2",
    textColor: "white",
    btnColor: "white",
  },
};

// Methods
function handleOpenClose() {
  if (!showAlert.value) {
    resetFeedBack();
  }
}

function resetFeedBack() {
  // console.log('close');
  emit("resetFeedBack");
  showAlert.value = false;
}
</script>
