<script setup lang="ts">
import type * as z from 'zod'

import { signupSchema } from '@@/shared/schemas/auth/signup.schema'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

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

type RegisterForm = z.infer<typeof signupSchema>

const { handleSubmit, isSubmitting, validateField } = useForm<RegisterForm>({
  validationSchema: toTypedSchema(signupSchema),
})

const auth = useAuthStore()
const success = ref(false)
const formError = ref<string | null>(null)

const onSubmit = handleSubmit(async (values) => {
  const { error } = await auth.signUp.email({
    email: values.email,
    password: values.password,
    name: `${values.firstName} ${values.lastName}`,
    firstName: values.firstName,
    lastName: values.lastName,
  })
  if (error) {
    formError.value = error.message!
    return
  }
  success.value = true
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
        <CardTitle>Create your account</CardTitle>
        <CardDescription>Enter your details below to create your account</CardDescription>
      </CardHeader>
      <CardContent class="p-6 pt-4">
        <form class="space-y-6 mb-4" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="firstName">
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="John"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="lastName">
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Doe"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="email">
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
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>
                Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  v-bind="componentField"
                  @input="validateField('password')"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="confirmPassword">
            <FormItem>
              <FormLabel>
                <span>
                  Confirm Password
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  v-bind="componentField"
                  @input="validateField('confirmPassword')"
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
            Sign Up
          </Button>
          <FormError v-if="formError" :error="formError" />
          <FormSuccess v-if="success" message="Verification email sent, Please check your email to verify your email address" />
        </form>
        <p class="text-sm text-muted-foreground mt-6 text-center">
          Already have an account?
          <NuxtLink to="/login" class="text-primary underline underline-offset-4 ml-1">
            Login
          </NuxtLink>
        </p>
      </CardContent>
    </Card>
  </div>
</template>
