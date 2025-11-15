import z from 'zod'

export const loginSchema = z.object({
    email: z.email({ message: 'Invalid email' }),
    password: z.string({ message: 'Password is required' }).min(1, { message: 'Password is required' }),
})