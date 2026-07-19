<script setup lang="ts">
import type * as z from 'zod'

import { forgotPasswordSchema } from '@@/shared/schemas/auth/reset-password.schema'
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

type ResetPasswordRequestForm = z.infer<typeof forgotPasswordSchema>

const { handleSubmit, isSubmitting } = useForm<ResetPasswordRequestForm>({
  validationSchema: toTypedSchema(forgotPasswordSchema),
})

const auth = useAuthStore()
const formError = ref<string | null>(null)
const formSuccess = ref<string | null>(null)

const onSubmit = handleSubmit(async (values) => {
  formSuccess.value = null
  const { data, error } = await auth.requestPasswordReset({
    email: values.email,
    redirectTo: '/reset-password',
  })

  if (error) {
    formError.value = error.message!
    return
  }

  if (data?.status) {
    formSuccess.value = 'If your email is registered, you will receive a password reset link shortly.'
  }
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
        <CardDescription>Enter your email below to send a password reset link</CardDescription>
      </CardHeader>
      <CardContent class="p-6 pt-4">
        <form
          class="space-y-6 mb-4"
          @submit="onSubmit"
        >
          <FormField
            v-slot="{ componentField }"
            name="email"
          >
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="abc@gmail.com"
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
            Send Reset Link
          </Button>
          <FormSuccess :message="formSuccess" />
          <FormError :error="formError" />
        </form>
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
