// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },
  // modules: ['@nuxtjs/tailwindcss'],
  nitro: {
    storage: {
      redis: {
        driver: 'redis',
        host: 'localhost',
        port: 6379,
      },
    },
  },
});
