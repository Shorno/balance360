import { motion } from 'motion/react'
import { Link } from 'react-router'
import SignupForm from "@/components/auth/SignupForm.tsx";
import useDynamicTitle from "@/hooks/useDynamicTitle.tsx";
import logo from "@/assets/default-monochrome-white.svg";

export default function SignupPage() {
    useDynamicTitle("Signup")

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900 p-8 md:p-12 lg:p-16 flex flex-col justify-center"
            >
                <div className="max-w-md w-full mx-auto">
                    <div className="flex items-center gap-2 mb-8">
                        <Link to="/" className="flex-shrink-0">
                            <img
                                className={"size-10 object-cover w-full"}
                                src={logo}
                                alt={"logo"}
                            />
                        </Link>
                    </div>

                    <h2 className="text-2xl font-semibold text-white mb-2">
                        Create Your Fitness Account
                    </h2>
                    <p className="text-gray-400 mb-8">
                        Sign up to get started with your fitness journey
                    </p>

                    <SignupForm />

                    <p className="mt-6 text-center text-xs text-gray-500">
                        By clicking continue, you agree to our{" "}
                        <Link to="#" className="text-purple-400 hover:text-purple-300 underline underline-offset-4">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="#" className="text-purple-400 hover:text-purple-300 underline underline-offset-4">
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </div>
            </motion.div>

            <div className="hidden md:block relative">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('/placeholder.svg?height=1080&width=1920')`,
                        backgroundPosition: 'center',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 to-black/90" />
            </div>
        </div>
    )
}

