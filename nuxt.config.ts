// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

import env from './config/env.config'

export default defineNuxtConfig({

  modules: [
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxt/eslint',
    // on dev, use nodemailer
    ...(env.NODE_ENV === 'development' ? ['nuxt-nodemailer'] : []),
  ],
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
  devtools: { enabled: false },
  css: ['./app/assets/css/main.css'],
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
  compatibilityDate: '2025-07-15',

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
    vueI18n: '~/i18n/i18n.config.ts',
    baseUrl: env.NUXT_PUBLIC_APP_URL,
    locales: [
      { code: 'en', language: 'en-US', name: 'English' },
    ],
    defaultLocale: 'en',
  },
  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },

  ...(env.NODE_ENV === 'development'
    ? {
        nodemailer: {
          host: 'smtp.ethereal.email',
          port: 587,
          auth: {
            user: env.NUXT_TEST_EMAIL_AUTH_USER,
            pass: env.NUXT_TEST_EMAIL_AUTH_PASSWORD,
          },
        },
      }
    : {}),

})
