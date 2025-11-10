// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from '@nuxt/kit'
import tailwindcss from "@tailwindcss/vite";


const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['./app/assets/css/main.css'],
  devtools: { enabled: true },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  shadcn: {
    prefix: '',
    componentDir: './app/components/ui'
  },
  components: [
    {
      path: './components/ui',
      extensions: ['.vue'],
    },
    {
      path: './components',
      extensions: ['.vue'],
    },
  ],
  modules: ['shadcn-nuxt', '@vueuse/nuxt']
})