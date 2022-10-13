import { defineStore } from "pinia";
import { useAxiosError } from "~~/composables/useAxiosError";
import { api } from "~~/service/api";
import { useLoading } from "./loading";

type AuthStoreProps = {
  token?: string;
  expires_at?: null | Date;
  user?: null;
};

export const useAuthStore = defineStore("auth", {
  state(): AuthStoreProps {
    return {
      token: null,
      expires_at: null,
      user: null,
    };
  },
  actions: {
    async signIn({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) {
      const loading = useLoading();

      loading.hint = "Signing...";
      loading.open();

      try {
        const result = await api.post("/auth/login", {
          username,
          password,
        });

        this.token = result.data.result.id;
        this.username = result.data.result.username;

        loading.close();
        window.location.reload();
      } catch (error) {
        useAxiosError(error, () => {
          loading.close();
          window.location.reload();
        });
      }
    },
    async signOut() {
      this.token = null;
      this.username = null;
    },
  },
  persist: true,
});
