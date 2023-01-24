<script lang="ts" setup>
import "sweetalert2/src/sweetalert2.scss";
import { useI18n } from "vue-i18n";
import { api } from "./service/api";
import { useAuthStore } from "./store/auth";

const { locale } = useI18n();
const authStore = useAuthStore();

watch(locale, (value) => {
  api.defaults.params = {
    ...api.defaults.params,
    lang: value,
  };

  localStorage.setItem("app-language", value);
});

onMounted(() => {
  const savedLanguage = localStorage.getItem("app-language");
  const userLang = navigator.language.split("-")[0];

  if (!savedLanguage) {
    locale.value = userLang;
    localStorage.setItem("app-language", userLang);
  } else {
    locale.value = savedLanguage;
  }

  api.defaults.params = {
    ...api.defaults.params,
    lang: locale.value,
  };
});

onBeforeMount(() => {
  if (authStore.token) {
    api.defaults.headers.common["authorization"] = useToken();
  }
});

useHead({
  script: [
    {
      src: "https://code.iconify.design/iconify-icon/1.0.0-beta.3/iconify-icon.min.js",
    },
  ],
});
</script>

<template>
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
</template>

<style lang="scss">
@import "~~/styles/style.scss";
</style>
