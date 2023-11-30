import i18next from "i18next";
import Backend from "i18next-node-fs-backend";
import i18nextMiddleware, { LanguageDetector } from "i18next-http-middleware";

const defaultLanguage = "en";

i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
    lng: defaultLanguage, // Set the default language
    fallbackLng: defaultLanguage, // Set the fallback language
    // debug: true
    supportedLngs: ["en", "pt"],
    // preload: ["en"], // Load the en translation file by default
    detection: {
      order: ["header"],
      lookupHeader: "accept-language",
      caches: ["header"]
    },
    backend: {
      loadPath: `${__dirname}/locales/{{lng}}.json` // Set the path to your translation files
    }
  });

export default i18nextMiddleware.handle(i18next);
