import { defineStore } from "pinia";
import Swal from "sweetalert2";
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
    async signIn({ email, password }: { email: string; password: string }) {
      const loading = useLoading();

      loading.hint = "Signing...";
      loading.open();

      try {
        const result = await api.post("/auth/sign-in", {
          email,
          password,
        });

        this.token = result.data.token;
        this.user = result.data.user;
        this.expires_at = result.data.expires_at;

        loading.close();
        window.location.href = "/dashboard";
      } catch (error) {
        useAxiosError(error, () => {
          loading.close();
          window.location.reload();
        });
      }
    },
    async signUp({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) {
      const loading = useLoading();

      loading.hint = "Creating account...";
      loading.open();

      try {
        const result = await api.post("/auth/sign-up", {
          email,
          password,
          name,
        });

        this.token = result.data.token;
        this.user = result.data.user;
        this.expires_at = result.data.expires_at;

        loading.close();
        window.location.href = "/dashboard";
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

      window.location.href = "/auth/sign-in";
    },
    async forgotPassword({ email }: { email: string }) {
      const loading = useLoading();

      loading.hint = "Sending a reset email...";
      loading.open();

      try {
        const result = await api.post("/auth/forgot-password", {
          email,
        });

        Swal.fire({
          icon: "success",
          title: result.data.message,
          showCancelButton: true,
          cancelButtonText: "OK",
        });

        loading.close();
        window.location.href = "/auth/next-step-forgot-password";
      } catch (error) {
        useAxiosError(error, () => {
          loading.close();
          window.location.reload();
        });
      }
    },
    async resetPassword({
      resetPasswordToken,
      password,
    }: {
      resetPasswordToken: string;
      password: string;
    }) {
      const loading = useLoading();

      loading.hint = "Reseting password...";
      loading.open();

      try {
        const result = await api.post("/auth/reset-password", {
          token: resetPasswordToken,
          password,
        });

        Swal.fire({
          icon: "success",
          title: result.data.message,
          showCancelButton: true,
          cancelButtonText: "OK",
        });

        loading.close();
        window.location.href = "/auth/sign-in";
      } catch (error) {
        useAxiosError(error, () => {
          loading.close();
          window.location.reload();
        });
      }
    },
  },
  persist: true,
});
