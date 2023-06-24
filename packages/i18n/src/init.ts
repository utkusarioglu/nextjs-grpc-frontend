import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
// import Backend from "i18next-fs-backend";
// import Backend from "i18next-http-backend";
import en from "./locales/en/translation.json";
import tr from "./locales/tr/translation.json";

i18n
  // .use(Backend)
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    resources: {
      en: {
        translation: en,
      },
      tr: {
        translation: tr,
      },
    },
    debug: true,
    fallbackLng: "en",
  });

export default i18n;
