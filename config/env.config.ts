import { z } from 'zod'

import tryParseEnv from '../lib/try-parse-env'

const EnvSchema = z.object({
  NODE_ENV: z.string(),
  NUXT_PUBLIC_APP_URL: z.string(),
  NUXT_PUBLIC_APP_NAME: z.string(),

  NUXT_SESSION_PASSWORD: z.string(),
  NUXT_TURSO_DATABASE_URL: z.string(),
  NUXT_TURSO_AUTH_TOKEN: z.string(),

  NUXT_BETTER_AUTH_SECRET: z.string(),
  NUXT_BETTER_AUTH_URL: z.string(),

  NUXT_MAILGUN_API_KEY: z.string(),
  NUXT_MAILGUN_DOMAIN: z.string(),
  NUXT_MAIL_FROM_EMAIL: z.string(),

  // Test email
  NUXT_TEST_EMAIL_AUTH_USER: z.string().optional(),
  NUXT_TEST_EMAIL_AUTH_PASSWORD: z.string().optional(),
})

export type TEnvSchema = z.infer<typeof EnvSchema>

tryParseEnv(EnvSchema)
/* eslint-disable-next-line node/no-process-env */
export default EnvSchema.parse(process.env)
