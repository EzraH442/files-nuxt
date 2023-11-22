// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      hcaptchaSitekey: 'e40ebb8b-22e4-4b6d-9a6a-60be5442a593',
    },
  },
  modules: ['@nuxt/ui', '@pinia/nuxt'],
  // routeRules: {
  //   '/files': { prerender: false, ssr: false, static: false },
  // },

  // devServer: {
  //   https: {
  //     key: 'key.pem',
  //     cert: 'cert.pem',
  //   },
  //   host: 'files.ezrahuang.com',
  //   url: 'https://files.ezrahuang.com',
  // },
});
