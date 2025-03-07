import React, { useEffect } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Star, Mail, Calendar, Clock, MessageSquare } from "lucide-react"
import { addReview, getApplicationStatus, getUserDetails } from "@/api/user.ts"
import useAuthStore from "@/store/authStore.ts"
import TimeSlots from "@/components/TimeSlots.tsx"
import { LoadingState } from "@/components/data-states/loading-state.tsx"
import DashboardBreadcrumb from "@/components/DashboardBreadcrumb.tsx"
import { BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb.tsx"
import toast from "react-hot-toast"
import useDynamicTitle from "@/hooks/useDynamicTitle.tsx"

const breadcrumb = (
    <BreadcrumbItem>
        <BreadcrumbPage>Booked Trainer</BreadcrumbPage>
    </BreadcrumbItem>
)

const reviewSchema = z.object({
    userEmail: z.string().email(),
    trainerEmail: z.string().email(),
    rating: z.number().min(1, "Rating is required"),
    comment: z.string().min(10, "Review must be at least 10 characters"),
})

type ReviewFormValues = z.infer<typeof reviewSchema>

export default function BookedTrainerDetails() {
    useDynamicTitle("Dashboard")
    const { currentUser } = useAuthStore()
    const [isReviewModalOpen, setIsReviewModalOpen] = React.useState(false)
    const [hoveredRating, setHoveredRating] = React.useState(0)

    const { data: userDetails } = useQuery({
        queryKey: ["user-details"],
        queryFn: () => getUserDetails(currentUser?.email || ""),
        select: (data) => data.bookings[0],
    })

    const trainerEmail = userDetails?.trainerEmail

    const { data: trainer, isLoading: trainerLoading } = useQuery({
        queryKey: ["trainerInfo", trainerEmail],
        queryFn: () => getApplicationStatus(trainerEmail || ""),
        select: (data) => data?.data,
        enabled: !!trainerEmail,
    })

    const form = useForm<ReviewFormValues>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            userEmail: currentUser?.email || "",
            trainerEmail: trainerEmail || "",
            comment: "",
            rating: 0,
        },
    })

    useEffect(() => {
        if (currentUser?.email && trainerEmail) {
            form.reset({
                userEmail: currentUser.email,
                trainerEmail: trainerEmail,
                comment: form.getValues("comment"),
                rating: form.getValues("rating"),
            })
        }
    }, [currentUser?.email, trainerEmail, form])

    const reviewMutation = useMutation({
        mutationFn: (review: ReviewFormValues) => addReview(review),
        onSuccess: () => {
            toast.success("Review submitted successfully")
            setIsReviewModalOpen(false)
            form.reset()
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to submit review")
        },
    })

    const handleSubmitReview = async (data: ReviewFormValues) => {
        await reviewMutation.mutateAsync(data)
    }

    if (trainerLoading) {
        return (
            <div>
                <DashboardBreadcrumb breadcrumb={breadcrumb} />
                <div className={"mt-32"}>
                    <LoadingState />
                </div>
            </div>
        )
    }

    if (!trainer || !trainerEmail) {
        return (
            <>
                <DashboardBreadcrumb breadcrumb={breadcrumb} />
                <div className="min-h-screen py-8 mt-32 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <Card className="bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700">
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center justify-center py-12">
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No Trainer Booked</h2>
                                    <p className="text-gray-600 dark:text-gray-400 text-center">
                                        You haven't booked any trainer yet. Book a trainer to get started with your fitness journey.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <DashboardBreadcrumb breadcrumb={breadcrumb} />
            <div className="min-h-screen py-32 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700">
                            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
                                <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                    Booked Trainer Details
                                </CardTitle>
                                <CardDescription className="text-gray-600 dark:text-gray-400">
                                    View information about your booked trainer
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="aspect-square rounded-lg overflow-hidden">
                                        <img
                                            src={trainer?.profileImage || "/placeholder.svg"}
                                            alt={trainer?.fullName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="md:col-span-2 space-y-6">
                                        <div>
                                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{trainer?.fullName}</h1>
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                                {trainer?.email}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Experience</p>
                                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {trainer?.yearsOfExperience} years
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Age</p>
                                                <p className="text-lg font-semibold text-gray-900 dark:text-white">{trainer?.age} years</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                                    <span className="text-gray-700 dark:text-gray-300">Available Days</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {trainer?.availableDays.map((day: string) => (
                                                        <Badge
                                                            key={day}
                                                            className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                                                        >
                                                            {day}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                                    <span className="text-gray-700 dark:text-gray-300">Available Time</span>
                                                </div>
                                                <p className="text-gray-900 dark:text-white">{trainer?.availableTime}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col xl:flex-row gap-10 items-center justify-between pt-4">
                                            <div className="flex items-center gap-2">
                                                <div className="flex">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star
                                                            key={star}
                                                            className={`w-4 h-4 ${
                                                                star <= (trainer?.rating || 0)
                                                                    ? "text-yellow-400 fill-yellow-400"
                                                                    : "text-gray-300 dark:text-gray-600"
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-gray-700 dark:text-gray-300 flex flex-col">
                          {trainer?.rating} ({trainer?.totalReviews} reviews)
                        </span>
                                            </div>

                                            <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className="border-purple-500 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/20"
                                                    >
                                                        <MessageSquare className="w-4 h-4 mr-2" />
                                                        Write Review
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                                    <DialogHeader>
                                                        <DialogTitle className="text-gray-900 dark:text-white">Rate Your Experience</DialogTitle>
                                                        <DialogDescription className="text-gray-600 dark:text-gray-400">
                                                            Share your experience with {trainer?.fullName}
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <form onSubmit={form.handleSubmit(handleSubmitReview)} className="space-y-4">
                                                        <div className="flex items-center justify-center gap-2 py-4">
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <button
                                                                    key={star}
                                                                    type="button"
                                                                    onClick={() => form.setValue("rating", star)}
                                                                    onMouseEnter={() => setHoveredRating(star)}
                                                                    onMouseLeave={() => setHoveredRating(0)}
                                                                    className="focus:outline-none"
                                                                >
                                                                    <Star
                                                                        className={`w-8 h-8 transition-colors ${
                                                                            star <= (hoveredRating || form.watch("rating"))
                                                                                ? "text-yellow-400 fill-yellow-400"
                                                                                : "text-gray-300 dark:text-gray-600"
                                                                        }`}
                                                                    />
                                                                </button>
                                                            ))}
                                                        </div>
                                                        {form.formState.errors.rating && (
                                                            <p className="text-red-600 dark:text-red-400 text-sm text-center">
                                                                {form.formState.errors.rating.message}
                                                            </p>
                                                        )}
                                                        <Textarea
                                                            placeholder="Share your experience..."
                                                            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 min-h-[120px]"
                                                            {...form.register("comment")}
                                                        />
                                                        {form.formState.errors.comment && (
                                                            <p className="text-red-600 dark:text-red-400 text-sm">
                                                                {form.formState.errors.comment.message}
                                                            </p>
                                                        )}
                                                        <div className="flex justify-end space-x-2">
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                onClick={() => setIsReviewModalOpen(false)}
                                                                className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                                            >
                                                                Cancel
                                                            </Button>
                                                            <Button
                                                                type="submit"
                                                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600"
                                                                disabled={reviewMutation.isPending}
                                                            >
                                                                {reviewMutation.isPending ? "Submitting..." : "Submit Review"}
                                                            </Button>
                                                        </div>
                                                    </form>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>

                                    <div className="md:col-span-3">
                                        <div className="space-y-4">
                                            <div>
                                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Trainer Details</h2>
                                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                                    {trainer?.details.slice(0, 500)}...
                                                </p>
                                            </div>

                                            <div>
                                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Skills & Expertise</h2>
                                                <div className="flex flex-wrap gap-2">
                                                    {trainer?.skills.map((skill: string) => (
                                                        <Badge
                                                            key={skill}
                                                            className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
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
                        <TimeSlots email={trainerEmail} trainerName={trainer?.fullName} book={false} />
                    </div>
                </div>
            </div>
        </>
    )
}

