// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBaseUrl: '',
    },
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],
  css: ['~/assets/css/main.css'],
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },
  i18n: {
    // debug: true,
    vueI18n: './i18n.config.ts',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'fr', name: 'Français', file: 'fr.json' },
      { code: 'de', name: 'Deutsch', file: 'de.json' },
    ],

    defaultLocale: 'en',
    strategy: 'no_prefix',
    lazy: false,
    langDir: 'locales',
  },
  future: {
    compatibilityVersion: 4,
  },
  imports: {
    dirs: ['./utils'],
  },
  // experimental: {
  //   asyncContext: true,
  // },
  compatibilityDate: '2024-11-27',
});
