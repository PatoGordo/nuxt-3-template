<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
  pageTransition: {
    name: "slide-fade",
    mode: "out-in",
  },
});
</script>

<template>
  <h2>Dashboard</h2>
</template>
