<template>
  <div class="min-h-screen flex items-center justify-center p-8">
    <div class="w-full max-w-sm">
      <div class="text-center mb-6">
        <p class="text-lg font-semibold">Nuxt starter</p>
        <p class="text-lg">{{ title }}</p>
      </div>
      <slot />
    </div>
  </div>
 </template>

<script setup>
const route = useRoute()

const title = computed(() => {
  switch (route.name) {
    case 'auth-login':
    case 'login':
      return 'Login to your account'

    case 'auth-register':
    case 'register':
      return 'Create your account'

    case 'auth-request-password-reset':
    case 'request-password-reset':
      return 'Request password reset'

    case 'auth-reset-password':
    case 'reset-password':
      return 'Reset your password'

    case 'auth-verify-email':
    case 'verify-email':
      return 'Email verification'

    case 'auth-callback':
    case 'callback':
      return 'Social login'
    default:
      return ''
  }
})
</script>