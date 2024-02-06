// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },
  modules: ['@element-plus/nuxt'],
  buildModules: [
      '@nuxtjs/pwa',
  ],
  paw: {
    meta: {
      mobileApp: true,
      favicon: true,
      name: 'NACL',
      theme_color: '#409eff'
    }
  }
});
