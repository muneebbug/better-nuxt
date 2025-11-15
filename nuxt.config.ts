// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { checkEnv } from "./config/env.config"
import { env } from "node:process";
import { generateRuntimeConfig } from './config/runtime.config'


checkEnv(env);

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['./app/assets/css/main.css'],
  devtools: { enabled: true },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  // devServer: {
  //   host: '127.0.0.1',
  //   port: 3000,
  // },
    i18n: {
    vueI18n: '~/i18n/i18n.config.ts',
    baseUrl: process.env.NUXT_APP_URL,
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
  runtimeConfig: generateRuntimeConfig(),
  modules: [
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    // on dev, use nodemailer
    ...(process.env.NODE_ENV === 'development' ? ['nuxt-nodemailer'] : []),
  ],

  ...(process.env.NODE_ENV === 'development' ? {
    nodemailer: {
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: process.env.NUXT_TEST_EMAIL_AUTH_USER,
          pass: process.env.NUXT_TEST_EMAIL_AUTH_PASSWORD
      }
    }
  }
    : {})
  
})