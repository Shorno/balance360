import {useLocation, useNavigate} from "react-router"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import {loadStripe} from "@stripe/stripe-js"
import {useMutation} from "@tanstack/react-query"
import {confirmPayment, createPaymentIntent} from "../api/payments.ts"
import {CreditCard, CheckCircle, Clock, User, Calendar, Package, DollarSign, Dumbbell} from "lucide-react"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card"
import useAuthStore from "@/store/authStore.ts"
import toast from "react-hot-toast"
import {LoadingState} from "@/components/data-states/loading-state.tsx"
import {useState} from "react"
import useDynamicTitle from "@/hooks/useDynamicTitle.tsx";
import {useBookingStore} from "@/store/useBookingStore.ts";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const paymentFormSchema = z
    .object({
        fullName: z.string().min(2, "Full name is required"),
        email: z.string().email("Invalid email address"),
        cardNumber: z.string().min(16, "Invalid card number"),
        expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)"),
        cvc: z.string().min(3, "Invalid CVC").max(4, "Invalid CVC"),
    })
    .partial({
        fullName: true,
        email: true,
    })

type PaymentFormData = z.infer<typeof paymentFormSchema>

export default function PaymentPage() {
    useDynamicTitle("Complete Payment")
    const {currentUser} = useAuthStore()
    const location = useLocation()
    const navigate = useNavigate();
    const {trainerName, slot, email} = useBookingStore()
    const {price, planName} = location.state

    const confirmMutation = useMutation({
        mutationFn: confirmPayment,
        onSuccess: () => {
            setPaymentSuccess(true)
            toast.success("Payment confirmed successfully!")
        },
        onError: (error: any) => {
            toast.error(`Confirmation failed: ${error.response?.data?.error || error.message}`)
            console.error("Confirmation error:", error)
        },
    })

    const paymentMutation = useMutation({
        mutationFn: createPaymentIntent,
        onSuccess: async (data) => {
            try {
                const stripe = await stripePromise
                if (!stripe) throw new Error("Stripe failed to load")

                const result = await stripe.confirmCardPayment(data.clientSecret, {
                    payment_method: {
                        card: {
                            token: "tok_visa",
                        },
                        billing_details: {
                            name: form.getValues("fullName"),
                            email: form.getValues("email"),
                        },
                    },
                })

                if (result.error) {
                    console.error(result.error)
                    toast.error("Payment failed. Please try again.")
                } else {
                    console.log("Stripe success. Calling confirm with:", {
                        slotId: slot?._id,
                        price,
                        planName,
                        trainerEmail: email,
                        stripePaymentId: result.paymentIntent.id,
                    })

                    if (result.paymentIntent.status === "succeeded") {
                        confirmMutation.mutate({
                            slotId: slot?._id || "",
                            userEmail: currentUser?.email || "",
                            price,
                            planName,
                            //@ts-ignore
                            trainerEmail: email,
                            stripePaymentId: result.paymentIntent.id,
                        })
                        setPaymentSuccess(true)
                        toast("Payment successful!", {icon: "🎉"})
                        // navigate('/success'); // Navigate to success page
                    }
                }
            } catch (error) {
                toast.error("Payment confirmation failed. Please try again.")
                console.error("Payment confirmation failed:", error)
            }
        },
    })

    const form = useForm<PaymentFormData>({
        resolver: zodResolver(paymentFormSchema),
        defaultValues: {
            fullName: currentUser?.displayName || "",
            email: currentUser?.email || "",
            cardNumber: "",
            expiryDate: "",
            cvc: "",
        },
    })

    const onSubmit = () => {
        paymentMutation.mutate({amount: price, planName})
    }

    const isLoading = paymentMutation.isPending || confirmMutation.isPending
    const [paymentSuccess, setPaymentSuccess] = useState(false)

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-32 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-4xl mx-auto bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-none">
                <CardHeader className="text-center pb-8 border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                        Complete Your Booking
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
                        Please review your booking details and complete the payment
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Booking Details */}
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-purple-100/80 dark:bg-purple-500/20 flex items-center justify-center">
                                        <User className="w-5 h-5 text-purple-600 dark:text-purple-400"/>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Trainer</p>
                                        <p className="text-gray-900 dark:text-white font-medium">{trainerName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-purple-100/80 dark:bg-purple-500/20 flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400"/>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Time Slot</p>
                                        <p className="text-gray-900 dark:text-white font-medium">{slot?.startTime}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Duration: {slot?.slotDuration}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-purple-100/80 dark:bg-purple-500/20 flex items-center justify-center">
                                        <Dumbbell className="w-5 h-5 text-purple-600 dark:text-purple-400"/>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Class</p>
                                        <p className="text-gray-900 dark:text-white font-medium">{slot?.selectedClass}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-purple-100/80 dark:bg-purple-500/20 flex items-center justify-center">
                                        <Package className="w-5 h-5 text-purple-600 dark:text-purple-400"/>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Package</p>
                                        <p className="text-gray-900 dark:text-white font-medium">{planName}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-purple-100/80 dark:bg-purple-500/20 flex items-center justify-center">
                                        <DollarSign className="w-5 h-5 text-purple-600 dark:text-purple-400"/>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
                                        <p className="text-gray-900 dark:text-white font-medium">${price}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-6">
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-500"/>
                                    <span>Secure payment processing</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-2">
                                    <Clock className="w-5 h-5 text-blue-600 dark:text-blue-500"/>
                                    <span>Instant booking confirmation</span>
                                </div>
                            </div>
                        </div>

                        {paymentSuccess ? (
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-500"/>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Successful!</h2>
                                <p className="text-gray-600 dark:text-gray-400 text-center">
                                    Thank you for your booking. You will receive a confirmation email shortly.
                                </p>
                                <Button
                                    onClick={() => navigate('/classes')}
                                    className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white"
                                >
                                    Explore More Classes
                                </Button>
                            </div>
                        ) : isLoading ? (
                            <LoadingState/>
                        ) : (
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="fullName"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 dark:text-gray-200">Full Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled
                                                        readOnly
                                                        placeholder="John Doe"
                                                        {...field}
                                                        className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-purple-600 dark:focus:ring-purple-400"
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
                                                <FormLabel className="text-gray-700 dark:text-gray-200">Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled
                                                        readOnly
                                                        placeholder="john@example.com"
                                                        {...field}
                                                        className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-purple-600 dark:focus:ring-purple-400"
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="cardNumber"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 dark:text-gray-200">Card Number</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="4242 4242 4242 4242"
                                                        {...field}
                                                        className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-purple-600 dark:focus:ring-purple-400"
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="expiryDate"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-700 dark:text-gray-200">Expiry Date</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="MM/YY"
                                                            {...field}
                                                            className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-purple-600 dark:focus:ring-purple-400"
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="cvc"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-700 dark:text-gray-200">CVC</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="123"
                                                            {...field}
                                                            className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-purple-600 dark:focus:ring-purple-400"
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white text-lg rounded-lg transition-all duration-200 transform"
                                        disabled={paymentMutation.isPending}
                                    >
                                        {paymentMutation.isPending ? (
                                            <>
                                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <CreditCard className="w-5 h-5 mr-2"/>
                                                Pay ${price}
                                            </>
                                        )}
                                    </Button>

                                    {paymentMutation.isError && (
                                        <div className="text-red-600 dark:text-red-400 text-sm mt-4">
                                            Payment failed. Please try again.
                                        </div>
                                    )}
                                </form>
                            </Form>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

