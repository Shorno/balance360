import {secureApi} from "@/lib/axios.ts";

interface NewsletterSubscription {
    email: string;
    name: string;
}

export const subscribeToNewsletter = async ({name, email}: NewsletterSubscription) => {
    const response = await secureApi.post('/newsletter/subscribe', {name, email});
    return response.data;
}