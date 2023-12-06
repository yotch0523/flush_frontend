import en from '~/locales/en.json'
import ja from '~/locales/ja.json'

export const LOCALE_JAPANESE = 'ja'
export const LOCALE_ENGLISH = 'en'

export const LOCALE_RESOURCES = {
  [LOCALE_JAPANESE]: { translation: ja },
  [LOCALE_ENGLISH]: { translation: en },
}

type localeKeysType = keyof typeof LOCALE_RESOURCES
export const LOCALE_KEYS = Object.keys(LOCALE_RESOURCES) as localeKeysType[]
