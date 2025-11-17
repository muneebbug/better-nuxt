import { z } from 'zod'

import { ConfirmPasswordSchema, EmailSchema, FirstNameSchema, LastNameSchema, PasswordSchema } from '../common'

export const signupSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  // passwordConfirm must be the same as password
  passwordConfirm: ConfirmPasswordSchema,
  firstName: FirstNameSchema,
  lastName: LastNameSchema,
}).refine(data => data.password === data.passwordConfirm, {
  message: 'Passwords do not match',
  path: ['passwordConfirm'],
})
