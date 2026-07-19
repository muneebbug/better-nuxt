import { z } from 'zod'

import { EmailSchema, PasswordSchema } from '../common'

export const forgotPasswordSchema = z.object({
  email: EmailSchema,
})

export const resetPasswordSchema = z.object({
  password: PasswordSchema,
  confirmPassword: PasswordSchema,
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})
