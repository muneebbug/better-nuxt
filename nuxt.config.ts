// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import env from "./config/env.config";


export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['./app/assets/css/main.css'],
  devtools: { enabled: false },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  devServer: {
    host: '127.0.0.1',
    port: 3000,
  },
    i18n: {
    vueI18n: '~/i18n/i18n.config.ts',
    baseUrl: env.NUXT_PUBLIC_APP_URL,
    locales: [
      { code: 'en', language: 'en-US', name: 'English' }
    ],
    defaultLocale: 'en',
  },
  shadcn: {
    prefix: '',
    componentDir: './app/components/ui'
  },
  colorMode: {
    classSuffix: ''
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
  runtimeConfig: {
    public: {
      auth: {
        redirectUserTo: '/',
        redirectGuestTo: '/login'
      },
    }
  },
  modules: [
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    // on dev, use nodemailer
    ...(env.NODE_ENV === 'development' ? ['nuxt-nodemailer'] : []),
  ],

  ...(env.NODE_ENV === 'development' ? {
    nodemailer: {
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: env.NUXT_TEST_EMAIL_AUTH_USER,
          pass: env.NUXT_TEST_EMAIL_AUTH_PASSWORD
      }
    }
  }
    : {})
  
})