import { z } from 'zod'

import { EmailSchema, PasswordSchema } from '../common'

export const loginSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
})
