import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '@/store'
import en from '@/locales/en';
import ar from '@/locales/ar';

Vue.use(VueI18n)

const messages = {
  en:{
    ...en
  },
  ar: {
    ...ar
  }
}

export default new VueI18n({
  locale: getBrowserLocale(),
  fallbackLocale: 'en',
  messages,
})

function getBrowserLocale() {
  // const navigatorLocale =
  //   navigator.languages !== undefined ?
  //   navigator.languages[0] :
  //   navigator.language

  // if (!navigatorLocale) {
  //   return undefined
  // }

  // return navigatorLocale.trim().split(/-|_/)[0]
  return store.getters.getLanguage;
}
