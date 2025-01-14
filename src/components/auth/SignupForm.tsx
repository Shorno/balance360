import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {Link, useNavigate} from 'react-router'
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import useAuthStore from '@/store/authStore'
import {SignupFormData, signupSchema} from "@/schema/authSchema"
import toast from "react-hot-toast"
import UploadAndPreviewPhoto from "@/components/UploadAndPreviewPhoto.tsx";

export default function SignupForm() {
    const {signUp, signInWithGoogle} = useAuthStore()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const form = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        mode: "onBlur"
    })

    const onSubmit = async (values: SignupFormData) => {
        try {
            setIsLoading(true)
            const {displayName, email, password, photoURL} = values
            await signUp(email, password, displayName, photoURL)
            navigate('/')
            toast.success("Sign up successful")
        } catch (error: any) {
            console.error("Signup error:", error)
            toast.error(`Sign up failed: ${error.message}`)
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle()
            const user = useAuthStore.getState().currentUser?.email
            console.log("Google Sign In successful:", user)
            navigate('/')
            toast.success("Sign in successful")
        } catch (error: any) {
            console.error("Google Sign In error:", error)
            toast.error(`Sign in failed: ${error.message}`)
        }
    }

    const handleImageUpload = (url: string) => {
        form.setValue('photoURL', url, {
            shouldValidate: true,
            shouldDirty: true,
        });
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Button
                    onClick={handleGoogleSignIn}
                    variant="outline"
                    className="w-full bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                    type="button"
                >
                    Sign up with Google
                </Button>

                <div className="relative text-center">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-700"></div>
                    </div>
                    <span className="relative z-10 bg-gray-900 px-4 text-sm text-gray-400">
                        Or continue with
                    </span>
                </div>

                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="displayName"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-gray-200">Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="John Doe"
                                        {...field}
                                        className="bg-gray-800 border-gray-700 text-white"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-gray-200">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="john@example.com"
                                        {...field}
                                        className="bg-gray-800 border-gray-700 text-white"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="photoURL"
                        render={({field}) => (
                            <FormItem className={field.value ? "pb-8" : null!}>
                                <FormLabel className="text-gray-200">Profile Photo</FormLabel>
                                <FormControl>
                                    <UploadAndPreviewPhoto onImageUpload={handleImageUpload}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-gray-200">Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="At least 8 characters"
                                        {...field}
                                        className="bg-gray-800 border-gray-700 text-white"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing up..." : "Sign up"}
                    </Button>
                </div>

                <div className="text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-purple-400 hover:text-purple-300 underline underline-offset-4"
                    >
                        Log in
                    </Link>
                </div>
            </form>
        </Form>
    )
}

