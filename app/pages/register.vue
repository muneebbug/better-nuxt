<template>
  <div>
    <Card>
      <CardHeader class="p-6 pb-0">
        <CardTitle>Create your account</CardTitle>
        <CardDescription>Enter your details below to create your account</CardDescription>
      </CardHeader>
      <CardContent class="p-6 pt-4">
        <div v-if="success">
          <div class="text-center">
            <CheckCircle class="text-green-500 mb-2 h-16 w-16" />
            <p class="text-2xl font-semibold mb-1">
              Email verification sent
            </p>
            <p class="text-gray-500 mb-4">
              Please check your inbox for a verification link
            </p>
            <Button
              to="/login"
            >
              Go back to login
            </Button>
          </div>
        </div>

        <div v-else>
          <form
            class="space-y-6 mb-4"
            @submit="onSubmit"
          >
            <FormField
              v-slot="{ componentField }"
              name="firstName"
            >
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

            <FormField
              v-slot="{ componentField }"
              name="lastName"
            >
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
            <FormField
              v-slot="{ componentField }"
              name="passwordConfirm"
            >
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
                    @input="validateField('passwordConfirm')"
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
                Register
              </Button>
            </div>
          </form>
          <p class="text-sm text-muted-foreground mt-6 text-center">
            Already have an account?
            <NuxtLink to="/login" class="text-primary underline underline-offset-4 ml-1">Login</NuxtLink>
          </p>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script  setup lang="ts">
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
import { CheckCircle } from 'lucide-vue-next'


const formSchema = z.object({
  email: z.string({ message: 'Email is required' }).email({ message: 'Invalid email' }),
  password: z.string({ message: 'Password is required' }).min(8, { message: 'Password must be at least 8 characters long' }),
  // passwordConfirm must be the same as password
  passwordConfirm: z.string(),
  firstName: z.string({ message: 'First name is required' }),
  lastName: z.string({ message: 'Last name is required' }),
}).refine(data => data.password === data.passwordConfirm, {
  message: 'Passwords do not match',
  path: ['passwordConfirm'],
})

type RegisterForm = z.infer<typeof formSchema>

const { handleSubmit, isSubmitting, setFieldError, validateField } = useForm<RegisterForm>({
  validationSchema: toTypedSchema(formSchema),
})

const auth = useAuth()
const success = ref(false)

const apiErrors = ref({
  emailAlreadyExists: false,
})

const onSubmit = handleSubmit(async (values) => {
  await auth.signUp.email({
    email: values.email,
    password: values.password,
    name: values.firstName + ' ' + values.lastName,
    firstName: values.firstName,
    lastName: values.lastName,
  }).catch(async (error) => {
    // Check if the error is due to email already being used
    if (error.data.message === 'Email already used') {
      apiErrors.value.emailAlreadyExists = true
      setFieldError('email', 'This email is already registered')
    }
    else {
      // Handle other errors as needed
      console.error('Unexpected error:', error)
    }
  })
})

definePageMeta({
  layout: 'auth',
  auth: {
    only: 'guest'
  }
})
</script>