import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import { rnConfig } from "./config";

export const rnInstance = i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init(rnConfig);
