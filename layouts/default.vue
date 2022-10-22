<script lang="ts" setup>
import { useAuthStore } from "~~/store/auth";

const authStore = useAuthStore();

const isDrawerOpened = ref(false);
</script>

<template>
  <div class="flex flex-col items items-start justify-start w-full h-full">
    <div class="navbar bg-base-200 z-30">
      <div class="flex-1">
        <nuxt-link to="/" class="btn btn-ghost normal-case text-xl"
          >MyAPP</nuxt-link
        >
      </div>
      <div class="flex-none sm:hidden">
        <label for="my-drawer" class="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-5 h-5 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </label>
      </div>

      <div class="sm:flex hidden flex-row items-center justify-end gap-4 mr-4">
        <nuxt-link to="/" class="link">Home</nuxt-link>
        <nuxt-link
          v-if="!authStore.token"
          to="/auth/sign-in"
          class="btn btn-outline btn-primary btn-sm"
          >Sign In</nuxt-link
        >
        <nuxt-link
          v-if="!authStore.token"
          to="/auth/sign-up"
          class="btn btn-secondary btn-sm"
          >Sign Up</nuxt-link
        >
        <nuxt-link
          v-if="authStore.token"
          to="/dashboard"
          class="btn btn-outline btn-primary btn-sm"
        >
          Dashboard
        </nuxt-link>
        <button
          v-if="authStore.token"
          class="btn btn-outline btn-error btn-sm"
          @click="authStore.signOut"
        >
          Sign Out
        </button>
      </div>
    </div>

    <div class="drawer fixed" :class="isDrawerOpened ? 'z-20' : 'z-0'">
      <input
        id="my-drawer"
        v-model="isDrawerOpened"
        type="checkbox"
        class="drawer-toggle"
      />
      <div class="drawer-side remove-user-interaction">
        <label for="my-drawer" class="drawer-overlay"></label>
        <ul
          class="menu p-4 overflow-y-auto w-80 bg-base-200 text-base-content gap-4"
        >
          <!-- Sidebar content here -->
          <nuxt-link to="/" class="link text-center w-full">Home</nuxt-link>
          <nuxt-link
            v-if="!authStore.token"
            to="/auth/sign-in"
            class="btn btn-outline btn-primary btn-sm"
            >Sign In</nuxt-link
          >
          <nuxt-link
            v-if="!authStore.token"
            to="/auth/sign-up"
            class="btn btn-secondary btn-sm"
            >Sign Up</nuxt-link
          >
          <nuxt-link
            v-if="authStore.token"
            to="/dashboard"
            class="btn btn-outline btn-primary btn-sm"
          >
            Dashboard
          </nuxt-link>
          <button
            v-if="authStore.token"
            class="btn btn-outline btn-error btn-sm"
            @click="authStore.signOut()"
          >
            Sign Out
          </button>
        </ul>
      </div>
    </div>

    <slot />
    <loading />
  </div>
</template>

<style lang="scss">
.page-content {
  @apply w-full flex flex-col items-start justify-start gap-4 p-4 relative z-10;
  > h2,
  .page-title {
    @apply text-2xl font-bold;
  }
  > h3,
  .page-subtitle {
    @apply text-xl font-bold;
  }
}
</style>
