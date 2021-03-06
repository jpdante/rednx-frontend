import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { getLanguage } from './language';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: getLanguage(),
    fallbackLng: 'en',
    backend: {
      loadPath: '/lang/{{lng}}.json'
    },
    debug: false,
    load: 'languageOnly',
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    },
    react: {
      wait: true
    }
  })

export default i18n