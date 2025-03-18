import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Venia',
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/global.css'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ], 
  modules: ['@nuxt/icon', '@pinia/nuxt'], 
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})