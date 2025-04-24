// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'MyDota 2 Heroes',
    },
  },
  compatibilityDate: '2024-11-01',
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  devtools: { enabled: true },
  icon: {
    mode: 'css',
    cssLayer: 'base',
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    'motion-v/nuxt',
  ],
  runtimeConfig: {
    public: {
      apiHost: process.env.NUXT_PUBLIC_API_HOST,
      heroAssetHost: process.env.NUXT_PUBLIC_HERO_ASSET_HOST,
    },
  },
  srcDir: 'src/',
  typescript: { typeCheck: true },
})
