<script lang="ts" setup>
const themes = [
  "system_",
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];
</script>

<template>
  <div class="page-content !items-center">
    <div
      class="flex flex-col items-start justify-start gap-4"
      style="width: min(600px, 100%)"
    >
      <h2 class="page-title">{{ $t("settings.settings") }}</h2>

      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">{{ $t("settings.language") }}</span>
        </label>
        <select v-model="$i18n.locale" class="select select-bordered w-full">
          <option disabled selected>{{ $t("settings.language") }}</option>
          <option value="en">English</option>
          <option value="pt">Português</option>
        </select>
      </div>

      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">{{ $t("settings.color_theme") }}</span>
        </label>
        <select
          v-model="$colorMode.preference"
          class="select select-bordered w-full"
        >
          <option disabled selected>{{ $t("settings.color_theme") }}</option>
          <option v-for="theme of themes" :key="theme" :value="theme">
            {{
              (theme.charAt(0).toUpperCase() + theme.slice(1)).replace("_", "")
            }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
