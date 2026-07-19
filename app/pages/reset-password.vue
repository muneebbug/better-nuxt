<script setup lang="ts">
import type { z } from 'zod'

import { resetPasswordSchema } from '@@/shared/schemas/auth/reset-password.schema'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

import FormError from '@/components/form/form-error.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

type ResetPasswordRequestForm = z.infer<typeof resetPasswordSchema>

const { handleSubmit, isSubmitting } = useForm<ResetPasswordRequestForm>({
  validationSchema: toTypedSchema(resetPasswordSchema),
})
const token = useRoute().query.token as string
const auth = useAuthStore()
const formError = ref<string | null>(null)
const formSuccess = ref<string | null>(null)

if (!token) {
  formError.value = 'Invalid or expired reset link. Please request a new password reset.'
}

const onSubmit = handleSubmit(async (values) => {
  formSuccess.value = null
  const { error } = await auth.resetPassword({
    token,
    newPassword: values.password,
  })

  if (error) {
    formError.value = error.message!

    return
  }
  formSuccess.value = 'Password reset successfully'
})

definePageMeta({
  layout: 'auth',
  auth: {
    only: 'guest',
  },
})
</script>

<template>
  <div>
    <Card>
      <CardHeader class="p-6 pb-0">
        <CardTitle>Reset password</CardTitle>
        <CardDescription>Enter your new password below</CardDescription>
      </CardHeader>
      <CardContent class="p-6 pt-4">
        <form
          v-if="token && !formError"
          class="space-y-6 mb-4"
          @submit="onSubmit"
        >
          <FormField
            v-slot="{ componentField }"
            name="password"
          >
            <FormItem>
              <FormLabel class="flex justify-between items-center">
                <span>
                  New Password
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="New Password"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField
            v-slot="{ componentField }"
            name="confirmPassword"
          >
            <FormItem>
              <FormLabel class="flex justify-between items-center">
                <span>
                  Confirm Password
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button
            class="w-full"
            type="submit"
            :loading="isSubmitting"
          >
            Reset Password
          </Button>
          <FormSuccess :message="formSuccess" />
          <FormError :error="formError" />
        </form>
        <div v-else>
          <div class="text-center">
            <p class="text-sm text-destructive mb-4">
              Invalid or expired reset link. Please request a new password reset.
            </p>
            <Button
              class="w-full"
              to="/forgot-password"
            >
              Request new reset link
            </Button>
          </div>
        </div>
        <Button
          class="w-full"
          variant="link"
          to="/login"
        >
          Back to login
        </Button>
      </CardContent>
    </Card>
  </div>
</template>
