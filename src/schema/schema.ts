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


export const trainerFormSchema = z.object({
    fullName: z.string({
        required_error: "Full name is required"
    }).min(2, "Full name must be at least 2 characters"),

    email: z.string({
        required_error: "Email is required"
    }).email("Invalid email address"),
    profileImage: z.string({
        required_error: "Profile image is required"
    }),

    skills: z.array(z.string({
        required_error: "Skill is required"
    })).min(1, "Select at least one skill"),

    availableDays: z.array(z.string()).min(1, "Select at least one day"),

    availableTime: z.string({
        required_error: "Available time is required"
    }).min(1, "Available time is required"),

    details: z.string({
        required_error: "Details is required"
    }).min(10, "Details must be at least 10 characters"),
    age: z.number({
        required_error: "Age is required"
    }),
    yearsOfExperience: z.number({
        required_error: "Years of experience is required"
    }).min(1, "At least 1 year of experience is required"),

    status: z.enum(['pending', 'approved', 'rejected']).default('pending').optional(),

    rejectionReason: z.string().optional().nullable()
});


export const classFormSchema = z.object({
    name: z.string().min(2, {
        message: "Class name must be at least 2 characters.",
    }),
    image: z.string().min(1, {
        message: "Please upload a class image.",
    }),
    details: z.string().min(10, {
        message: "Details must be at least 10 characters.",
    }),
    duration: z.string().min(1, {
        message: "Please provide the class duration.",
    }),
    maxParticipants: z.number({
        message: "Please provide the maximum number of participants"
    }).min(2, {
        message: "Minimum 2 participants are required.",
    }),
    intensity: z.string().min(1, {
        message: "Please provide the class intensity.",
    }),
    category: z.string().min(1, {
        message: "Please provide the class category.",
    }),
})


export const addNewSlotSchema = z.object({
    slotName: z.string().min(1, "Slot name is required").max(100, "Slot name must be 100 characters or less"),
    slotDuration: z
        .string()
        .min(1, "Duration is required")
        .regex(/^\d+\s*(hour|minute|min|hr|h|m)s?$/i, "Invalid duration format. Use formats like '1 hour' or '30 minutes'"),
    selectedDays: z.array(z.string()).min(1, "Select at least one day"),
    selectedClass: z.string().min(1, "Please select a class"),
    startTime: z.string().regex(/^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(am|pm)$/i, "Invalid time format. Use 'HH:MM AM/PM'"),
    additionalInfo: z.string().max(500, "Additional information must be 500 characters or less").optional(),
})

export type AddNewSlotFormData = z.infer<typeof addNewSlotSchema>
export type LoginFormData = z.infer<typeof loginSchema>
export type SignupFormData = z.infer<typeof signupSchema>
export type TrainerFormData = z.infer<typeof trainerFormSchema>
export type ClassFormValues = z.infer<typeof classFormSchema>
