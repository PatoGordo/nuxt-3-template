import { createI18n } from "vue-i18n";
import { locales } from "~~/i18n/locales";

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "en",
    messages: locales,
  });

  vueApp.use(i18n);
});
