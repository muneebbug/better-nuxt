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
          <div class="space-y-2">
            <Button
              class="w-full"
              type="submit"
              :loading="isSubmitting"
            >
              Login
            </Button>
          </div>
        </form>
        <p class="text-sm text-muted-foreground mt-6 text-center">
          Don’t have an account?
          <NuxtLink to="/register" class="text-primary underline underline-offset-4 ml-1">Sign up</NuxtLink>
        </p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { authClient } from "~~/lib/auth-client"
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

const formSchema = z.object({
  email: z.string({ message: 'Email is required' }).email({ message: 'Invalid email' }),
  password: z.string({ message: 'Password is required' }).min(8, { message: 'Password must be at least 8 characters long' }),
})

type LoginForm = z.infer<typeof formSchema>

const { handleSubmit, isSubmitting } = useForm<LoginForm>({
  validationSchema: toTypedSchema(formSchema),
})

definePageMeta({
  layout: 'auth',
  middleware: 'auth-guest-only',
})

const { signIn } = authClient
const callbackURL = decodeURIComponent(useRoute().query.redirect as string || '/')

const onSubmit = handleSubmit(async (values) => {
 const {data, error} = await signIn.email({
    email: values.email,
    password: values.password,
    callbackURL: callbackURL,
  })
  console.log(data, error)
})
</script>