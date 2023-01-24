import { createI18n } from "vue-i18n";

import en from "~/i18n/locales/en.json";
import pt from "~/i18n/locales/pt.json";

export const messages = {
  en,
  pt,
};

export const an_unexpected_error_occurred = {
  en: "An Unexpected Error Occurred!",
  pt: "Um erro inesperado ocorreu!",
};

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "en",
    messages,
  });

  vueApp.use(i18n);
});
