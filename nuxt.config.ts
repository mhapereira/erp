// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/supabase", "@nuxt/ui"]
  ,
  plugins: [
    '~/plugins/vue-the-mask.js'
  ]
})

// "@nuxtjs/tailwindcss",