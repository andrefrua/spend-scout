import i18next from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const defaultLanguage = "pt";

export const initI18Next = () => {
  i18next
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      lng: defaultLanguage, // For now we want to force the language to Portuguese
      fallbackLng: defaultLanguage,
      // debug: true,
      supportedLngs: ["en", "pt"],
      detection: { order: ["navigator"] },
      backend: { loadPath: "/locales/{{ns}}/{{lng}}.json" },
      ns: ["client", "server"],
      defaultNS: "client"
    });
};

// Wrapper function that sets the 'server' namespace
export const tWithCustomNamespace =
  (t: (key: string, options?: object) => string, namespace: string) =>
  (key: string, options?: object) =>
    t(key, { ...options, ns: namespace });

export default i18next;
