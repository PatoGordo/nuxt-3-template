import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { $ot } from "~~/i18n/$ot";
import {
  an_unexpected_error_occurred,
  please_login_and_try_again,
  your_session_has_been_expired,
} from "~~/i18n/locales";
import { useAuthStore } from "~~/store/auth";
import { useLoading } from "~~/store/loading";

export const api = axios.create({
  baseURL: "/api",
});

api.interceptors.response.use(
  (res) => res,
  async (res) => {
    const authStore = useAuthStore();
    const loading = useLoading();

    const { status, data } = res.response as AxiosResponse;

    loading.close();

    if (status === 401) {
      Swal.fire({
        title: $ot(
          your_session_has_been_expired,
          String(api.defaults.params.lang) || "en"
        ),
        text: $ot(
          please_login_and_try_again,
          String(api.defaults.params.lang) || "en"
        ),
        icon: "warning",
      });

      return authStore.signOut();
    }

    await Swal.fire({
      title: $ot(
        an_unexpected_error_occurred,
        String(api.defaults.params.lang) || "en"
      ),
      text: data.message,
      icon: "error",
      showCancelButton: true,
    });

    return res;
  }
);
