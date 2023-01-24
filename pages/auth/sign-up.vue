<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useAuthStore } from "~~/store/auth";

const name = ref("");
const email = ref("");
const password = ref("");

const { APP_NAME } = useRuntimeConfig().public;
const authStore = useAuthStore();

const i18n = useI18n();

async function handleSubmit() {
  await authStore.signUp(i18n, {
    name: name.value,
    email: email.value,
    password: password.value,
  });
}

function handleSignInWithGoogle() {
  alert("Not implemented");
}

function handleSignInWithGitHub() {
  alert("Not implemented");
}

definePageMeta({
  layout: "auth",
  middleware: "already-auth",
  pageTransition: {
    name: "slide-fade",
    mode: "out-in",
  },
});
</script>

<template>
  <div class="page-content-auth">
    <section
      class="bg-base-200 w-full h-full gap-4 sm:p-8 p-4 rounded-md flex flex-col items-start justify-center"
    >
      <h2 class="page-title pb-0 lg:mt-10">Sign up to {{ APP_NAME }}</h2>

      <form
        class="mt-2 w-full flex flex-col items-start justify-start gap-2"
        @submit.prevent="handleSubmit"
      >
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">
              {{ $t("auth.sign-up.what_is_your_email") }}
            </span>
          </label>
          <input
            v-model="email"
            type="email"
            :placeholder="$t('auth.sign-up.your_email')"
            class="input input-bordered w-full"
            required
          />
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">
              {{ $t("auth.sign-up.what_is_your_name") }}
            </span>
          </label>
          <input
            v-model="name"
            type="text"
            :placeholder="$t('auth.sign-up.your_name')"
            class="input input-bordered w-full"
            required
          />
        </div>

        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">
              {{ $t("auth.sign-up.what_is_your_name") }}
            </span>
          </label>
          <input
            v-model="password"
            type="password"
            :placeholder="$t('auth.sign-up.your_password')"
            class="input input-bordered w-full"
            required
          />
        </div>

        <nuxt-link to="/auth/sign-in" class="link">
          {{ $t("auth.sign-up.already_have_an_account_access_it") }}
        </nuxt-link>

        <button class="btn btn-primary self-end w-1/3" type="submit">
          {{ $t("auth.sign_up") }}
        </button>
      </form>

      <div class="grid sm:grid-cols-2 lg:grid-rows-2 gap-4 w-full mt-2">
        <button
          class="btn btn-outline btn-info gap-4"
          @click="handleSignInWithGoogle"
        >
          <iconify-icon
            icon="flat-color-icons:google"
            width="28"
          ></iconify-icon>
          Sign up with Google
        </button>
        <button
          class="btn btn-outline btn-neutral gap-4"
          @click="handleSignInWithGitHub"
        >
          <iconify-icon
            icon="ant-design:github-filled"
            width="28"
          ></iconify-icon>
          Sign up with GitHub
        </button>
      </div>
    </section>
  </div>
</template>
