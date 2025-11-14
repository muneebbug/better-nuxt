import type { NitroRuntimeConfig } from 'nitropack/types'

import { config } from 'dotenv'

let runtimeConfigInstance: NitroRuntimeConfig

export const generateRuntimeConfig = () => ({
  preset: process.env.NUXT_NITRO_PRESET,
  betterAuthSecret: process.env.NUXT_BETTER_AUTH_SECRET,
  public: {
    baseURL: process.env.NUXT_APP_URL,
    appName: process.env.NUXT_APP_NAME,
    appEnv: process.env.NODE_ENV,
    auth: {
      redirectUserTo: '/',
      redirectGuestTo: '/login'
    },
  }
})

if (typeof useRuntimeConfig !== 'undefined') {
  runtimeConfigInstance = useRuntimeConfig()
} else {
  // for cli: npm run auth:schema
  config()
  runtimeConfigInstance = generateRuntimeConfig() as NitroRuntimeConfig
}

export const runtimeConfig = runtimeConfigInstance
