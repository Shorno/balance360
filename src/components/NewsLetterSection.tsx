import {Card, CardContent, CardDescription, CardHeader, CardTitle} from './ui/card';
import {Input} from './ui/input';
import {Button} from './ui/button';
import {Mail, Send, Dumbbell} from 'lucide-react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useMutation} from '@tanstack/react-query';
import {NewsletterFormValues, newsletterSchema} from "@/schema/schema.ts";
import {subscribeToNewsletter} from "@/api/newsletter.ts";
import toast from "react-hot-toast";

export default function NewsletterSection() {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<NewsletterFormValues>({
        resolver: zodResolver(newsletterSchema)
    });

    const { mutate, isPending } = useMutation({
        mutationFn: subscribeToNewsletter,
        onSuccess: () => {
            toast.success("Thanks for subscribing...!");
            reset();
        },
        onError: (error: any) => {
            const message = error.response?.data?.error || 'Subscription failed';
            toast.error(message);
        }
    });


    const onSubmit = (data: NewsletterFormValues) => {
        mutate(data);
    };

    return (
        <div className="w-full py-20 px-4 bg-gray-50  dark:bg-gray-900/50">
            <Card
                className="max-w-xl mx-auto  dark:border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all duration-300">
                <CardHeader className="text-center">
                    <div
                        className="mx-auto w-12 h-12  bg-purple-500 dark:bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                        <Dumbbell className="w-6 h-6 text-white dark:text-purple-400"/>
                    </div>
                    <CardTitle className="text-2xl ">Join Our Fitness Community</CardTitle>
                    <CardDescription className="text-gray-400">
                        Subscribe to receive exclusive workout tips, nutrition advice, and special offers
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                type="text"
                                placeholder="Your Name"
                                {...register('name')}
                                className="bg-gray-50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-purple-500"
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-4 h-4"/>
                                <Input
                                    type="email"
                                    placeholder="Your Email"
                                    {...register('email')}
                                    className="bg-gray-50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-purple-500 pl-10"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                            {isPending ? (
                                'Subscribing...'
                            ) : (
                                <>
                                    Subscribe Now <Send className="w-4 h-4 ml-2"/>
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}