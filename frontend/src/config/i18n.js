import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from 'resources/Languages/en.json'
import fr from 'resources/Languages/fr.json'
import ar from 'resources/Languages/ar.json'

i18n
  .use(HttpBackend) // Load translations using http
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      ar: { translation: ar },
    },
    fallbackLng: 'en', // Default language
    supportedLngs: ['en', 'fr', 'ar'], // Supported languages
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
