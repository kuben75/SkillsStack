import i18n from 'i18next';
import {initReactI18next} from "react-i18next";

import translationPL from '../core/locales/pl.json';
import translationEN from '../core/locales/en.json';

const resources = {
    pl: translationPL,
    en: translationEN
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'pl',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    }
});

export default i18n;