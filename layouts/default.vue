<script lang="ts" setup>
import { useAuthStore } from "~~/store/auth";

const { APP_NAME } = useRuntimeConfig().public;

const authStore = useAuthStore();

function closeModal() {
  document.querySelector<HTMLInputElement>("#my-drawer")?.click();
}
</script>

<template>
  <div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <div class="flex flex-col items items-start justify-start w-full h-full">
        <div class="navbar bg-base-200 z-30">
          <div class="flex-1">
            <nuxt-link to="/" class="btn btn-ghost normal-case text-xl">
              {{ APP_NAME }}
            </nuxt-link>
          </div>
          <div class="flex-none sm:hidden">
            <label class="btn btn-square btn-ghost" for="my-drawer">
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

          <div
            class="sm:flex hidden flex-row items-center justify-end gap-4 mr-4"
          >
            <nuxt-link to="/" class="link">
              {{ $t("navbar.home") }}
            </nuxt-link>

            <nuxt-link to="/settings" class="link">
              {{ $t("navbar.settings") }}
            </nuxt-link>

            <nuxt-link
              v-if="!authStore.token"
              to="/auth/sign-in"
              class="btn btn-outline btn-primary btn-sm"
            >
              {{ $t("navbar.sign_in") }}
            </nuxt-link>

            <nuxt-link
              v-if="!authStore.token"
              to="/auth/sign-up"
              class="btn btn-secondary btn-sm"
            >
              {{ $t("navbar.sign_up") }}
            </nuxt-link>

            <nuxt-link
              v-if="authStore.token"
              to="/dashboard"
              class="btn btn-outline btn-primary btn-sm"
            >
              {{ $t("navbar.dashboard") }}
            </nuxt-link>

            <button
              v-if="authStore.token"
              class="btn btn-outline btn-error btn-sm"
              @click="authStore.signOut"
            >
              {{ $t("navbar.sign_out") }}
            </button>
          </div>
        </div>

        <slot />
        <loading />
      </div>
    </div>

    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay"></label>
      <ul
        class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content gap-4"
      >
        <nuxt-link
          to="/"
          class="font-bold mb-4 normal-case text-xl text-center whitespace-pre-wrap"
        >
          {{ APP_NAME }}
        </nuxt-link>

        <li @click="closeModal">
          <nuxt-link
            to="/"
            class="link w-full flex items-center justify-center"
          >
            {{ $t("navbar.home") }}
          </nuxt-link>
        </li>

        <li @click="closeModal">
          <nuxt-link
            to="/settings"
            class="link w-full flex items-center justify-center"
          >
            {{ $t("navbar.settings") }}
          </nuxt-link>
        </li>

        <li v-if="!authStore.token" @click="closeModal">
          <nuxt-link to="/auth/sign-in" class="btn btn-outline btn-primary">
            {{ $t("navbar.sign_in") }}
          </nuxt-link>
        </li>

        <li v-if="!authStore.token" @click="closeModal">
          <nuxt-link to="/auth/sign-up" class="btn btn-secondary">
            {{ $t("navbar.sign_up") }}
          </nuxt-link>
        </li>

        <li v-if="authStore.token" @click="closeModal">
          <nuxt-link to="/dashboard" class="btn btn-outline btn-primary">
            {{ $t("navbar.dashboard") }}
          </nuxt-link>
        </li>

        <li v-if="authStore.token" @click="closeModal">
          <button class="btn btn-outline btn-error" @click="authStore.signOut">
            {{ $t("navbar.sign_out") }}
          </button>
        </li>
      </ul>
    </div>
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
