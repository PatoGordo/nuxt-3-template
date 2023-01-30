<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { api } from "~~/service/api";
import { useLoading } from "~~/store/loading";

const i18n = useI18n();
const loading = useLoading();
const router = useRouter();

const content = ref("");

async function getProtectedData() {
  loading.open();
  loading.hint = i18n.t("alerts.loading_content");

  try {
    const res = await api.get("/protected", {
      headers: {
        authorization: useToken(),
      },
    });

    content.value = useResult(res).message;
    loading.close();
  } catch (error) {
    router.go(-1);
  }
}

onMounted(async () => {
  await getProtectedData();
});

definePageMeta({
  middleware: "admin-and-editor-only",
  pageTransition: {
    name: "slide-fade",
    mode: "out-in",
  },
});
</script>

<template>
  <div class="page-content">
    <h2>
      {{ $t("protected_route.protected_route") }}
    </h2>

    <p>
      {{ $t("protected_route.the_bold_content_below_come_from_server") }}
    </p>

    <p>
      <strong>{{ content }}</strong>
    </p>
  </div>
</template>
