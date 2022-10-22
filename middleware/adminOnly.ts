import moment from "moment";
import { useAuthStore } from "~~/store/auth";

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  const router = useRouter();

  if (!authStore.token || moment(authStore.expires_at).isBefore(moment())) {
    authStore.signOut();
    return router.push("/auth/sign-in");
  }

  // 3 -> admin
  if (![3].includes(authStore.user.role)) {
    return router.push("/dashboard");
  }
});
