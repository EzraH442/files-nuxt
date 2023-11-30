// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      hcaptchaSitekey: 'e40ebb8b-22e4-4b6d-9a6a-60be5442a593',
    },
  },
  modules: ['@nuxt/ui', '@pinia/nuxt'],
  nitro: {
    hooks: {
      'dev:reload': () => require('sharp'),
    },
  },
});
