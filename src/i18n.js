import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import zhTW from './locales/zh-TW/common.json'
import zhCN from './locales/zh-CN/common.json'
import en from './locales/en/common.json'

const savedLang = localStorage.getItem('lang') || 'zh-TW'

i18n.use(initReactI18next).init({
  resources: {
    'zh-TW': { translation: zhTW },
    'zh-CN': { translation: zhCN },
    en: { translation: en },
  },
  lng: savedLang,
  fallbackLng: 'zh-TW',
  interpolation: { escapeValue: false },
})

export default i18n
