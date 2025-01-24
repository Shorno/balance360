import {secureApi} from "@/lib/axios.ts";

interface CreatePaymentIntentParams {
    amount: number;
    planName: string;
}

export const createPaymentIntent = async ({ amount, planName }: CreatePaymentIntentParams) => {
    const response = await secureApi.post('/stripe/create-payment-intent', {
        amount,
        planName,
    });
    return response.data;
};