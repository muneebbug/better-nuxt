import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin } from 'better-auth/plugins'

import env from '../../config/env.config'
import { useDrizzle } from '../database/drizzle'
import * as schema from '../database/schema'
import { sendResetPasswordEmail, sendUserVerificationEmail } from '../email'

export const auth = betterAuth({
  baseURL: env.NUXT_BETTER_AUTH_URL!,
  secret: env.NUXT_BETTER_AUTH_SECRET!,
  database: drizzleAdapter(useDrizzle(), {
    provider: 'sqlite',
    schema: {
      ...schema,
    },
  }),
  user: {
    additionalFields: {
      firstName: {
        type: 'string',
        fieldName: 'firstName',
        returned: true,
        input: true,
        required: true,
      },
      lastName: {
        type: 'string',
        fieldName: 'lastName',
        returned: true,
        input: true,
        required: true,
      },
    },
    deleteUser: {
      enabled: true,
    },
  },
  emailVerification: {
    async sendVerificationEmail({ user, url }) {
      await sendUserVerificationEmail(user, url)
    },
    sendOnSignUp: true,
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    revokeSessionsOnPasswordReset: true,
    async sendResetPassword({ url, user }) {
      await sendResetPasswordEmail(user, url)
    },
  },
  plugins: [
    admin({
      defaultRole: 'user',
      defaultBanExpiresIn: 7 * 24 * 60 * 60,
      defaultBanReason: 'Spamming',
      impersonationSessionDuration: 1 * 24 * 60 * 60,
    }),
  ],
})
