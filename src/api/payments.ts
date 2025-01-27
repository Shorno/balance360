import {secureApi} from "@/lib/axios.ts";

interface CreatePaymentIntent {
    amount: number;
    planName: string;
}

interface ConfirmPayment {
    slotId: string;
    price: number;
    planName: string;
    trainerEmail: string;
    stripePaymentId: string;
    userEmail: string;
}


export const createPaymentIntent = async ({amount, planName}: CreatePaymentIntent) => {
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