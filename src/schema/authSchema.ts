import {z} from "zod";

export const loginSchema = z.object({
    email: z.string().nonempty('Email is required').email('Invalid email address'),
    password: z.string().nonempty('Password is required')
})

export const signupSchema = z.object({
    displayName: z.string({
        required_error: 'Name is required.',
    }).min(2, 'Name must be at least 2 characters'),

    email: z.string({
        required_error: 'Email is required.',
    }).email('Invalid email address'),

    photoURL: z.string({
        required_error: 'User Photo is required.',
    }).url('Photo URL is missing'),

    password: z.string({
        required_error: 'Password is required.',
    })
        .min(6, 'Password must be at least 6 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter'),
});


export type LoginFormData = z.infer<typeof loginSchema>
export type SignupFormData = z.infer<typeof signupSchema>