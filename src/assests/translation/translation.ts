import { initReactI18next } from "react-i18next";
import HttpApi from 'i18next-http-backend';
import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import ar from "../locales/ar/translation.json"
import en from "../locales/en/translation.json"

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'ar'],
    resources: {
      en:{translation:en},
      ar:{translation:ar}
    },
    fallbackLng: "en",
    detection: {
      order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain'],
      caches: ['cookie']
    },

  });
  


export default i18n