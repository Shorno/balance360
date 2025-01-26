import React from 'react';
import {useQuery, useMutation} from '@tanstack/react-query';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Badge} from '@/components/ui/badge';
import {
    Star,
    Mail,
    Calendar,
    Clock,
    MessageSquare,
} from 'lucide-react';
import {getApplicationStatus, getUserDetails} from "@/api/user.ts";
import useAuthStore from "@/store/authStore.ts";
import TimeSlots from "@/components/TimeSlots.tsx";
import {LoadingState} from "@/components/data-states/loading-state.tsx";
import DashboardBreadcrumb from "@/components/DashboardBreadcrumb.tsx";
import {BreadcrumbItem, BreadcrumbPage} from "@/components/ui/breadcrumb.tsx";

const breadcrumb =
    <BreadcrumbItem>
        <BreadcrumbPage>
            Booked Trainer
        </BreadcrumbPage>
    </BreadcrumbItem>

const reviewSchema = z.object({
    rating: z.number().min(1).max(5),
    comment: z.string().min(10, 'Review must be at least 10 characters'),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

export default function BookedTrainerDetails() {
    const {currentUser} = useAuthStore()
    const [rating, setRating] = React.useState(0);
    const [hoveredRating, setHoveredRating] = React.useState(0);

    const {data: userDetails} = useQuery({
        queryKey: ['user-details'],
        queryFn: () => getUserDetails(currentUser?.email || ""),
        select: (data) => data.bookings[0]
    })
    const trainerEmail = userDetails?.trainerEmail


    const {data: trainer, isLoading: trainerLoading} = useQuery({
        queryKey: ['application', currentUser?.email],
        queryFn: () => getApplicationStatus(trainerEmail || ''),
        select: (data) => data?.data,
        enabled: !!currentUser?.email
    })

    const form = useForm<ReviewFormValues>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            rating: 0,
            comment: '',
        },
    });

    const reviewMutation = useMutation({
        mutationFn: async (data: ReviewFormValues) => {
            // Implement review submission logic here
            console.log('Submitting review:', data);
        },
    });

    const onSubmitReview = (data: ReviewFormValues) => {
        reviewMutation.mutate({...data, rating});
    };

    return (
        <>
            <DashboardBreadcrumb breadcrumb={breadcrumb}/>
            <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {
                            trainerLoading ? <LoadingState/> :
                                (
                                    <Card className="bg-gray-800/50 border-gray-700 h-min">
                                        <CardContent className="p-6">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div className="aspect-square rounded-lg overflow-hidden">
                                                    <img
                                                        src={trainer?.profileImage}
                                                        alt={trainer?.fullName}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>

                                                {/* Profile Info */}
                                                <div className="md:col-span-2 space-y-6">
                                                    <div>
                                                        <h1 className="text-2xl font-bold text-white mb-1">
                                                            {trainer?.fullName}
                                                        </h1>
                                                        <div className="flex items-center gap-2 text-gray-400">
                                                            <Mail className="w-4 h-4 text-purple-400"/>
                                                            {trainer?.email}
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-1">
                                                            <p className="text-sm text-gray-400">Experience</p>
                                                            <p className="text-lg font-semibold text-white">
                                                                {trainer?.yearsOfExperience} years
                                                            </p>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-sm text-gray-400">Age</p>
                                                            <p className="text-lg font-semibold text-white">
                                                                {trainer?.age} years
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4">
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <Calendar className="w-4 h-4 text-purple-400"/>
                                                                <span className="text-gray-300">Available Days</span>
                                                            </div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {trainer?.availableDays.map((day: string[]) => (
                                                                    <Badge
                                                                        key={trainer._id}
                                                                        className="bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                                                    >
                                                                        {day}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <Clock className="w-4 h-4 text-purple-400"/>
                                                                <span className="text-gray-300">Available Time</span>
                                                            </div>
                                                            <p className="text-white">{trainer?.availableTime}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between pt-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex">
                                                                {[1, 2, 3, 4, 5].map((star) => (
                                                                    <Star
                                                                        key={star}
                                                                        className={`w-4 h-4 ${
                                                                            star <= (trainer?.rating || 0)
                                                                                ? 'text-yellow-400 fill-yellow-400'
                                                                                : 'text-gray-600'
                                                                        }`}
                                                                    />
                                                                ))}
                                                            </div>
                                                            <span className="text-gray-300">
                                                            {trainer?.rating} ({trainer?.totalReviews} reviews)
                                                        </span>
                                                        </div>
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                                                                >
                                                                    <MessageSquare className="w-4 h-4 mr-2"/>
                                                                    Write Review
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="bg-gray-800 border-gray-700">
                                                                <DialogHeader>
                                                                    <DialogTitle className="text-white">
                                                                        Rate Your Experience
                                                                    </DialogTitle>
                                                                    <DialogDescription className="text-gray-400">
                                                                        Share your experience with {trainer?.fullName}
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <form
                                                                    onSubmit={form.handleSubmit(onSubmitReview)}
                                                                    className="space-y-4"
                                                                >
                                                                    <div
                                                                        className="flex items-center justify-center gap-2 py-4">
                                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                                            <button
                                                                                key={star}
                                                                                type="button"
                                                                                onClick={() => setRating(star)}
                                                                                onMouseEnter={() => setHoveredRating(star)}
                                                                                onMouseLeave={() => setHoveredRating(0)}
                                                                                className="focus:outline-none"
                                                                            >
                                                                                <Star
                                                                                    className={`w-8 h-8 transition-colors ${
                                                                                        star <= (hoveredRating || rating)
                                                                                            ? 'text-yellow-400 fill-yellow-400'
                                                                                            : 'text-gray-600'
                                                                                    }`}
                                                                                />
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                    <Textarea
                                                                        placeholder="Share your experience..."
                                                                        className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 min-h-[120px]"
                                                                        {...form.register('comment')}
                                                                    />
                                                                    <Button
                                                                        type="submit"
                                                                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                                                                        disabled={reviewMutation.isPending}
                                                                    >
                                                                        {reviewMutation.isPending
                                                                            ? 'Submitting...'
                                                                            : 'Submit Review'}
                                                                    </Button>
                                                                </form>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                </div>

                                                <div className="md:col-span-3">
                                                    <div className="space-y-4">
                                                        <div>
                                                            <h2 className="text-xl font-semibold text-white mb-3">
                                                                Trainer Details
                                                            </h2>
                                                            <p className="text-gray-300 leading-relaxed">
                                                                {trainer?.details.slice(0, 500)}...
                                                            </p>
                                                        </div>

                                                        <div>
                                                            <h2 className="text-xl font-semibold text-white mb-3">
                                                                Skills & Expertise
                                                            </h2>
                                                            <div className="flex flex-wrap gap-2">
                                                                {trainer?.skills.map((skill: string[]) => (
                                                                    <Badge
                                                                        key={trainer._id}
                                                                        className="bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                                                    >
                                                                        {skill}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                )
                        }
                        <TimeSlots email={trainerEmail} trainerName={trainer?.fullName}/>
                    </div>
                </div>
            </div>
        </>

    );
}