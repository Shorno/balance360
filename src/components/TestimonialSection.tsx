import {useState} from 'react';
import {Star, ChevronLeft, ChevronRight, Quote} from 'lucide-react';
import {useQuery} from "@tanstack/react-query";
import {cn} from "@/lib/utils.ts";
import {getUsersWithReviews} from "@/api/public.ts";

export interface User {
    _id: string;
    displayName: string;
    email: string;
    photoURL?: string;
    role: 'member' | 'trainer' | 'admin';
    lastLogin: Date;
    bookings: Booking[];
    reviews: Review[];
}

interface Booking {
    slotId: string;
    trainerEmail: string;
    trainerName: string;
    trainerImage: string;
    slotName: string;
    slotTime: string;
    slotDuration: string;
    paymentId: string;
    bookingDate: Date;
}

export interface Review {
    trainerEmail: string;
    rating: number;
    comment: string;
    createdAt: Date;
    slotName: string;
}
const TestimonialsSection = () => {
    const {data: userReviews} = useQuery({
        queryKey: ["user-reviews"],
        queryFn: getUsersWithReviews,
        select: (data) => data.data,
    })


    const [currentIndex, setCurrentIndex] = useState(0);

    //@ts-ignore
    const allReviews: Review [] = userReviews?.flatMap(user  =>
        //@ts-ignore
        user.reviews.map(review  => ({
            ...review,
            user: {
                name: user.displayName,
                image: user.photoURL,
                email: user.email
            }
        }))
    ) || [];

    const next = () => {
        setCurrentIndex(prev => (prev + 3 >= allReviews.length ? 0 : prev + 3));
    };

    const prev = () => {
        setCurrentIndex(prev => (prev - 3 < 0 ? allReviews.length - (allReviews.length % 3 || 3) : prev - 3));
    };

    const visibleReviews = allReviews.slice(currentIndex, currentIndex + 3);

    return (
        <section className="py-32 bg-gray-100 dark:bg-gray-900/50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4">
                        Community Experiences
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Real stories from our members about their fitness journeys
                    </p>
                </div>

                <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[350px]">
                        {visibleReviews.map((review: any, index: number) => (
                            <div
                                key={`${review.user.email}-${index}`}
                                className={cn(
                                    "bg-white dark:bg-gray-800/50 rounded-xl p-6 border border-purple-500/30 dark:border-purple-500/20",
                                    "backdrop-blur-sm transform transition-all hover:scale-[1.02]",
                                    "hover:border-purple-500/40 relative h-full shadow-sm dark:shadow-none"
                                )}
                            >
                                <Quote className="absolute top-4 right-4 w-8 h-8 text-purple-400/30 dark:text-purple-400/20"/>

                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={review.user.image || '/default-avatar.png'}
                                        alt={review.user.name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/30"
                                    />
                                    <div className="flex-1">
                                        <h4 className="text-gray-900 dark:text-white font-semibold truncate">
                                            {review.user.name}
                                        </h4>
                                        <div className="flex items-center gap-2">
                                            <span className="text-purple-600 dark:text-purple-400 text-sm font-medium">
                                                {review.slotName}
                                            </span>
                                            <span className="text-gray-400 dark:text-gray-500">•</span>
                                            <span className="text-gray-500 dark:text-gray-400 text-sm">
                                                {new Date(review.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={cn(
                                                "w-5 h-5",
                                                i < review.rating
                                                    ? "text-yellow-400 fill-yellow-400"
                                                    : "text-gray-300 dark:text-gray-600 fill-gray-300 dark:fill-gray-600"
                                            )}
                                        />
                                    ))}
                                </div>

                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-6 mb-4">
                                    {review.comment}
                                </p>
                            </div>
                        ))}
                    </div>

                    {allReviews.length > 3 && (
                        <div className="flex justify-center mt-8 gap-4">
                            <button
                                onClick={prev}
                                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800/50 border border-purple-500/30 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:border-purple-500/40 transition-colors"
                            >
                                <ChevronLeft className="w-6 h-6"/>
                            </button>
                            <button
                                onClick={next}
                                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800/50 border border-purple-500/30 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:border-purple-500/40 transition-colors"
                            >
                                <ChevronRight className="w-6 h-6"/>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;