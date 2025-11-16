import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: z.email('Invalid email address'),
})

export const resetPasswordSchema = z.object({
  password: z.string({message: 'Password is required'}).min(8, 'Password must be at least 8 characters long'),
  confirmPassword: z.string({message: 'Confirm password is required'}).min(8, 'Confirm password must be at least 8 characters long'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})