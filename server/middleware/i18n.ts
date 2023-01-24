import { setLang } from "../i18n/$st";

export default defineEventHandler((event) => {
  const query = getQuery(event);

  const lang = String(query?.lang) || "en";

  setLang(lang);
});
