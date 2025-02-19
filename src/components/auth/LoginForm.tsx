import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {Link, useLocation, useNavigate} from 'react-router'
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
import toast from "react-hot-toast"
import {LoginFormData, loginSchema} from "@/schema/schema.ts";

const DEMO_CREDENTIALS = {
    member: {
        email: "MaishaRahman@gmail.com",
        password: "MaishaRahman@gmail.com"
    },
    trainer: {
        email: "tonyhortonlife@gamil.com",
        password: "Tonyhortonlife@gamil.com"
    },
    admin: {
        email: "Shorno_admin@gmail.com",
        password: "Shorno_admin@gmail.com"
    }
};

export default function LoginForm() {
    const {login, signInWithGoogle} = useAuthStore()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const location = useLocation()
    const previousPage = location.state?.from?.pathname || '/';


    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange"
    })

    const fillCredentials = async (role: 'member' | 'trainer' | 'admin') => {
        const credentials = DEMO_CREDENTIALS[role];
        form.setValue('email', credentials.email);
        form.setValue('password', credentials.password);
        await form.trigger()
    };

    const onSubmit = async (values: LoginFormData) => {
        const {email, password} = values;
        try {
            setIsLoading(true);
            await login(email, password);
            toast.success('Login successful');
            navigate(previousPage, {replace: true});
        } catch (error: any) {
            switch (error.code) {
                case 'auth/invalid-credential':
                    toast.error('Invalid Credentials. Please try again');
                    break;
                default:
                    toast.error('Failed to login: ' + error.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            const user = useAuthStore.getState().currentUser?.email;
            console.log(user)
            navigate(previousPage, {replace: true});
            toast.success('Sign in successful');
        } catch (error: any) {
            toast.error(`Sign in failed ${error.message}`);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <p className="text-sm text-gray-400 text-center mb-2">Quick Login Options:</p>
                    <div className="grid grid-cols-3 gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => fillCredentials('member')}
                            className="bg-blue-600/20 border-blue-500 text-blue-400 hover:bg-blue-600/30"
                        >
                            Member
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => fillCredentials('trainer')}
                            className="bg-green-600/20 border-green-500 text-green-400 hover:bg-green-600/30"
                        >
                            Trainer
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => fillCredentials('admin')}
                            className="bg-purple-600/20 border-purple-500 text-purple-400 hover:bg-purple-600/30"
                        >
                            Admin
                        </Button>
                    </div>
                </div>

                <Button
                    onClick={handleGoogleSignIn}
                    variant="outline"
                    className="w-full bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                    type="button"
                >
                    Sign in with Google
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
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-gray-200">Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
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
                        disabled={!form.formState.isValid || isLoading}
                    >
                        {isLoading ? "Signing in..." : "Sign in"}
                    </Button>
                </div>

                <div className="text-center text-sm text-gray-400">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-purple-400 hover:text-purple-300 underline underline-offset-4"
                    >
                        Sign up
                    </Link>
                </div>
            </form>
        </Form>
    )
}