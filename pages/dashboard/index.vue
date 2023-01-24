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
  <div class="page-content">
    <h2>{{ $t("dashboard.dashboard") }}</h2>

    <p>
      {{ $t("dashboard.you_must_to_be_admin_or_editor_to_access_page_below") }}
    </p>
    <p>
      {{ $t("dashboard.change_in_your_database_your_user_role_to_1_or_2") }}
    </p>
    <nuxt-link to="/dashboard/protected-route" class="btn btn-primary btn-sm">
      {{ $t("dashboard.go_to_dashboard_protected_route") }}
    </nuxt-link>
  </div>
</template>
