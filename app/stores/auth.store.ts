import type { Session, User } from '@@/server/database/schema/auth'
import type { RouteLocationRaw } from 'vue-router'

import { adminClient, inferAdditionalFields } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/vue'

export const useAuthStore = defineStore('useAuthStore', () => {
  const session = ref<Session | null>(null)
  const user = ref<User | null>(null)
  const sessionFetching = import.meta.server ? ref(false) : ref(true)

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

  const fetchSession = async () => {
    if (sessionFetching.value) {
      return
    }
    sessionFetching.value = true
    const { data } = await client.getSession()
    // ! Using type assertion to ensure correct type
    // !TODO: Find a better way to handle this
    session.value = data?.session as Session || null
    user.value = data?.user as User || null

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

  const init = async () => {
    await fetchSession()
  }
  // !WARN:  exporting better auth methods to avoid JS Memory Leak
  // !TODO: Find a better way to handle this
  const signIn = {
    email: (...args: Parameters<typeof client.signIn.email>) =>
      client.signIn.email(...args),

    social: (...args: Parameters<typeof client.signIn.social>) =>
      client.signIn.social(...args),

  }

  const signUp = {
    email: (...args: Parameters<typeof client.signUp.email>) =>
      client.signUp.email(...args),
  }

  const useSession = (...args: Parameters<typeof client.useSession>) =>
    client.useSession(...args)

  const requestPasswordReset = (...args: Parameters<typeof client.requestPasswordReset>) =>
    client.requestPasswordReset(...args)

  const resetPassword = (...args: Parameters<typeof client.resetPassword>) =>
    client.resetPassword(...args)

  const sendVerificationEmail = (...args: Parameters<typeof client.sendVerificationEmail>) =>
    client.sendVerificationEmail(...args)

  const signOut = async ({ redirectTo }: { redirectTo?: RouteLocationRaw } = {}) => {
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
  }

  return {
    init,
    session,
    user,
    loggedIn: computed(() => !!session.value),
    signIn,
    signUp,
    signOut,
    useSession,
    requestPasswordReset,
    resetPassword,
    sendVerificationEmail,
    fetchSession,
  }
})
