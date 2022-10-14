<script lang="ts" setup>
import { useAuthStore } from "~~/store/auth";

const authStore = useAuthStore();

const isDrawerOpened = ref(false);
</script>

<template>
  <div class="navbar bg-base-200">
    <div class="flex-1">
      <router-link to="/" class="btn btn-ghost normal-case text-xl"
        >MyAPP</router-link
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
      <a href="/" class="link">Home</a>
      <a
        href="/auth/sign-in"
        class="btn btn-outline btn-primary btn-sm"
        v-if="!authStore.token"
        >Sign In</a
      >
      <a
        href="/auth/sign-up"
        class="btn btn-secondary btn-sm"
        v-if="!authStore.token"
        >Sign Up</a
      >
      <a
        href="/dashboard"
        class="btn btn-outline btn-primary btn-sm"
        v-if="authStore.token"
      >
        Dashboard
      </a>
      <button
        class="btn btn-outline btn-error btn-sm"
        @click="authStore.signOut"
        v-if="authStore.token"
      >
        Sign Out
      </button>
    </div>
  </div>

  <div class="drawer fixed" :class="isDrawerOpened ? 'z-20' : 'z-0'">
    <input
      id="my-drawer"
      type="checkbox"
      class="drawer-toggle"
      v-model="isDrawerOpened"
    />
    <div class="drawer-side remove-user-interaction">
      <label for="my-drawer" class="drawer-overlay"></label>
      <ul
        class="menu p-4 overflow-y-auto w-80 bg-base-200 text-base-content gap-4"
      >
        <!-- Sidebar content here -->
        <a href="/" class="link text-center w-full">Home</a>
        <a
          href="/auth/sign-in"
          class="btn btn-outline btn-primary btn-sm"
          v-if="!authStore.token"
          >Sign In</a
        >
        <a
          href="/auth/sign-up"
          class="btn btn-secondary btn-sm"
          v-if="!authStore.token"
          >Sign Up</a
        >
        <a
          href="/dashboard"
          class="btn btn-outline btn-primary btn-sm"
          v-if="authStore.token"
        >
          Dashboard
        </a>
        <button
          class="btn btn-outline btn-error btn-sm"
          @click="authStore.signOut()"
          v-if="authStore.token"
        >
          Sign Out
        </button>
      </ul>
    </div>
  </div>

  <div class="page-content">
    <slot />
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
