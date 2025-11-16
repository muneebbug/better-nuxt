import type { User } from '@@/server/database/schema'
import type {
  ClientOptions,
  InferSessionFromClient,
} from 'better-auth/client'
import type { RouteLocationRaw } from 'vue-router'

import { adminClient, inferAdditionalFields } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/vue'

export function useAuth() {
  const headers = import.meta.server ? useRequestHeaders() : undefined
  const client = createAuthClient({
    /* eslint-disable node/no-process-env */
    baseURL: process.env.NUXT_PUBLIC_APP_URL,
    fetchOptions: {
      headers,
    },
    plugins: [
      inferAdditionalFields({
        user: {
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
      }),
      adminClient(),
    ],
  })

  const session = useState<InferSessionFromClient<ClientOptions> | null>('auth:session', () => null)
  const user = useState<User | null>('auth:user', () => null)

  const sessionFetching = import.meta.server ? ref(false) : useState('auth:sessionFetching', () => false)

  const fetchSession = async () => {
    if (sessionFetching.value) {
      return
    }
    sessionFetching.value = true
    const { data } = await client.getSession()
    session.value = data?.session || null

    const u = data?.user
    user.value = u
      ? {
          id: u.id,
          createdAt: u.createdAt,
          updatedAt: u.updatedAt,
          name: u.name ?? '',
          firstName: u.firstName ?? null,
          lastName: u.lastName ?? null,
          email: u.email,
          emailVerified: !!u.emailVerified,
          image: u.image ?? null,
          role: (u.role ?? 'user') as User['role'],
          banned: u.banned ?? false,
          banReason: u.banReason ?? null,
          banExpires: u.banExpires ?? null,
        }
      : null

    sessionFetching.value = false
    return data
  }

  if (import.meta.client) {
    client.$store.listen('$sessionSignal', async (signal) => {
      if (!signal)
        return
      await fetchSession()
    })
  }

  return {
    session,
    user,

    loggedIn: computed(() => !!session.value),
    signIn: client.signIn,
    signUp: client.signUp,
    useSession: client.useSession,
    forgetPassword: client.forgetPassword,
    resetPassword: client.resetPassword,
    sendVerificationEmail: client.sendVerificationEmail,
    errorCodes: client.$ERROR_CODES,
    async signOut({ redirectTo }: { redirectTo?: RouteLocationRaw } = {}) {
      await client.signOut({
        fetchOptions: {
          onSuccess: async () => {
            session.value = null
            user.value = null
            if (redirectTo) {
              await reloadNuxtApp({
                path: redirectTo.toString(),
              })
            }
          },
        },
      })
    },
    fetchSession,
    client,
  }
}
