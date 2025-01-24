import {secureApi} from "@/lib/axios.ts";

interface CreatePaymentIntent {
    amount: number;
    planName: string;
}
interface ConfirmPayment {
    slotId: string;          // MongoDB slot ID
    price: number;           // Payment amount
    planName: string;        // Package name
    trainerEmail: string;    // Trainer's email from slotInfo
    stripePaymentId: string; // Stripe payment intent ID
    userEmail: string;       // User's email
}


export const createPaymentIntent = async ({ amount, planName }: CreatePaymentIntent) => {
    const response = await secureApi.post('/payments/create-payment-intent', {
        amount,
        planName,
    });
    return response.data;
};


export const confirmPayment = async (paymentData: ConfirmPayment) => {
    const response = await secureApi.post('/payments/confirm', paymentData);
    return response.data;
}