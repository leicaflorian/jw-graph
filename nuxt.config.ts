// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  // @ts-ignore
  modules: [
    // https://composition-api.nuxtjs.org
    '@nuxt/content',
    '@nuxtjs/i18n',
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-US.json'
      },
      /*{
        code: 'it',
        file: 'it-IT.ts'
      }*/
    ],
    lazy: true,
    langDir: 'lang',
    defaultLocale: 'en'
  }
})
