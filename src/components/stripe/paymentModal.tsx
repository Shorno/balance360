import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from '@tanstack/react-query';
import { CreditCard, CheckCircle, Clock } from 'lucide-react';
import {createPaymentIntent} from "@/api/payments.ts";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    amount: number;
    planName: string;
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function PaymentModal({ isOpen, onClose, amount, planName }: PaymentModalProps) {
    const paymentMutation = useMutation({
        mutationFn: createPaymentIntent,
        onSuccess: async (data) => {
            try {
                const stripe = await stripePromise;
                if (!stripe) throw new Error('Stripe failed to load');

                const result = await stripe.confirmCardPayment(data.clientSecret, {
                    payment_method: {
                        card: {
                            token: 'tok_visa', // For testing only - use Elements in production
                        },
                    },
                });

                if (result.error) {
                    console.error(result.error);
                } else {
                    if (result.paymentIntent.status === 'succeeded') {
                        // Handle successful payment
                        console.log('Payment successful!');
                        onClose();
                    }
                }
            } catch (error) {
                console.error('Payment confirmation failed:', error);
            }
        },
        onError: (error) => {
            console.error('Payment intent creation failed:', error);
        },
    });

    const handlePayment = () => {
        paymentMutation.mutate({ amount, planName });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg max-w-4xl w-full mx-4 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Product Details Section */}
                    <div className="p-8 bg-gray-900">
                        <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                    <CreditCard className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">{planName}</h3>
                                    <p className="text-gray-400">Monthly Subscription</p>
                                </div>
                            </div>

                            <div className="border-t border-gray-700 pt-4">
                                <div className="flex justify-between text-gray-400 mb-2">
                                    <span>Subtotal</span>
                                    <span>${amount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-white text-lg font-semibold">
                                    <span>Total</span>
                                    <span>${amount.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span>Secure payment processing</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Clock className="w-5 h-5 text-blue-500" />
                                    <span>Instant access after payment</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Form Section */}
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Payment Details</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Card Number
                                </label>
                                <input
                                    type="text"
                                    placeholder="4242 4242 4242 4242"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Expiry Date
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        CVC
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="123"
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={paymentMutation.isPending}
                                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {paymentMutation.isPending ? (
                                    <>
                                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Processing...
                                    </>
                                ) : (
                                    <>Pay ${amount.toFixed(2)}</>
                                )}
                            </button>

                            <button
                                onClick={onClose}
                                disabled={paymentMutation.isPending}
                                className="w-full mt-2 px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                        </div>

                        {paymentMutation.isError && (
                            <p className="mt-4 text-red-400 text-sm">
                                Payment failed. Please try again.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}