// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

import env from './config/env.config'

export default defineNuxtConfig({

  modules: [
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@pinia/nuxt',
    'nuxt-nodemailer',
  ],
  devtools: { enabled: false },
  css: ['@/assets/css/main.css'],
  colorMode: {
    classSuffix: '',
  },
  runtimeConfig: {
    public: {
      auth: {
        redirectUserTo: '/',
        redirectGuestTo: '/login',
      },
    },
  },
  devServer: {
    host: '127.0.0.1',
    port: 3000,
  },
  compatibilityDate: '2026-07-19',
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  eslint: {
    config: {
      standalone: false,
      stylistic: true,
    },
  },
  i18n: {
    vueI18n: '@/i18n/i18n.config.ts',
    baseUrl: env.NUXT_PUBLIC_APP_URL,
    locales: [
      { code: 'en', language: 'en-US', name: 'English' },
    ],
    defaultLocale: 'en',
  },
  nodemailer: {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: env.NUXT_TEST_EMAIL_AUTH_USER,
      pass: env.NUXT_TEST_EMAIL_AUTH_PASSWORD,
    },
  },
  shadcn: {
    prefix: '',
    componentDir: '@/components/ui',
  },

})
