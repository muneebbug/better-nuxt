import z from 'zod'

export const signupSchema = z.object({
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