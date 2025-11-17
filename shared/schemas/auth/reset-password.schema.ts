import { z } from 'zod'

import { ConfirmPasswordSchema, EmailSchema, PasswordSchema } from '../common'

export const forgotPasswordSchema = z.object({
  email: EmailSchema,
})

export const resetPasswordSchema = z.object({
  password: PasswordSchema,
  confirmPassword: ConfirmPasswordSchema,
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})
