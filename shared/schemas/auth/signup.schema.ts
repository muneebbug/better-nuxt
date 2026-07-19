import { z } from 'zod'

import { EmailSchema, FirstNameSchema, LastNameSchema, PasswordSchema } from '../common'

export const signupSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  confirmPassword: PasswordSchema,
  firstName: FirstNameSchema,
  lastName: LastNameSchema,
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})
