import { z } from 'zod'

export const FirstNameSchema = z.string({ message: 'First name is required' })
  .min(1, { message: 'First name is required' })
  .max(255, { message: 'First name must be at most 255 characters long' })

export const LastNameSchema = z.string({ message: 'Last name is required' })
  .min(1, { message: 'Last name is required' })
  .max(255, { message: 'Last name must be at most 255 characters long' })

export const EmailSchema = z.email({ message: 'Invalid email address' })

export const PasswordSchema = z.string({ message: 'Password is required' })
  .min(8, { message: 'Password must be at least 8 characters long' })
  .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  .regex(/\d/, { message: 'Password must contain at least one number' })

export const ConfirmPasswordSchema = z.string({ message: 'Confirm password is required' })
  .min(8, { message: 'Confirm password must be at least 8 characters long' })
  .regex(/[a-z]/, { message: 'Confirm password must contain at least one lowercase letter' })
  .regex(/[A-Z]/, { message: 'Confirm password must contain at least one uppercase letter' })
  .regex(/\d/, { message: 'Confirm password must contain at least one number' })
