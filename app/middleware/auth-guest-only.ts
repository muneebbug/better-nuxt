import { authClient } from "~~/lib/auth-client"

export default defineNuxtRouteMiddleware(async () => {
  const { data: session } = await authClient.useSession(useFetch)
  if (session.value) {
    // If the user is already logged in, send them to the homepage
    return navigateTo("/")
  }
})