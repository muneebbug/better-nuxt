<template>
  <div>
    <Card>
      <CardHeader class="p-6 pb-0">
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
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
                  type="text"
                  placeholder="abc@gmail.com"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField
            v-slot="{ componentField }"
            name="password"
          >
            <FormItem>
              <FormLabel>
                <span>
                  Password
                </span>
                <NuxtLink
                  to="/auth/request-password-reset"
                  class="float-end font-normal text-sm text-primary"
                >
                  <span>
                    Forgot password?
                  </span>
                </NuxtLink>
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
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
              Login
            </Button>
            <FormError :error="formError" />
        </form>
        <p class="text-sm text-muted-foreground mt-6 text-center">
          Don’t have an account?
          <NuxtLink to="/signup" class="text-primary underline underline-offset-4 ml-1">Sign up</NuxtLink>
        </p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

import FormError from '~/components/form/FormError.vue'



import { loginSchema } from '@@/shared/schemas/auth/login.schema'

type LoginForm = z.infer<typeof loginSchema>

const { handleSubmit, isSubmitting, errors } = useForm<LoginForm>({
  validationSchema: toTypedSchema(loginSchema),
})

const auth = useAuth()
const formError = ref<string | null>(null)
const callbackURL = decodeURIComponent(useRoute().query.redirect as string || '/')

const onSubmit = handleSubmit(async (values) => {
  formError.value = null
  const {data, error} = await auth.signIn.email({
    email: values.email,
    password: values.password,
    callbackURL,
  })
  console.log(data, error)
  if (error) {
    formError.value = error.message!
    return
  }
})

definePageMeta({
  layout: 'auth',
  auth: {
    only: 'guest',
  }
})
</script>