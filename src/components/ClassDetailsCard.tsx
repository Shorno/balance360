import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {ClassFormValues} from "@/schema/schema.ts";
import {Clock, Dumbbell, Users} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@radix-ui/react-tooltip";
import {useQuery} from "@tanstack/react-query";
import TrainerList from "@/components/TrainerList.tsx";
import {getClassWithTrainers} from "@/api/class.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";

interface ClassDetailsCardProps extends ClassFormValues {
    _id: string
    trainers: string[]
    bookingCount: number
}

export interface TrainerDetails {
    _id: string
    fullName: string
    email: string
    profileImage: string
}

export default function ClassDetailsCard({classItem}: { classItem: ClassDetailsCardProps }) {
    const {data: trainers, isLoading} = useQuery({
        queryKey: ["trainerInfo", classItem._id],
        queryFn: () => getClassWithTrainers(classItem._id),
        select: (data) => data?.trainers
    });

    return (
        <Card className="bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all duration-300">
            <div className="aspect-video w-full overflow-hidden relative">
                <img
                    src={classItem?.image}
                    alt={classItem?.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <Badge
                    variant="secondary"
                    className="bg-purple-500 dark:bg-purple-600 text-white border border-purple-500/30 absolute top-2 right-2"
                >
                    Total Bookings: {classItem?.bookingCount}
                </Badge>
            </div>

            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-xl text-gray-900 dark:text-white mb-2">
                                {classItem?.name}
                            </CardTitle>
                            <Badge
                                variant="secondary"
                                className="bg-purple-100/80 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30"
                            >
                                {classItem?.category}
                            </Badge>
                        </div>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                            {classItem?.details}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400"/>
                        {classItem?.duration}
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-600 dark:text-purple-400"/>
                        Max {classItem?.maxParticipants}
                    </div>
                    <div className="flex items-center gap-2">
                        <Dumbbell className="w-4 h-4 text-purple-600 dark:text-purple-400"/>
                        {classItem?.intensity}
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Class Trainers
                    </h4>
                    <div className="flex p-1 overflow-hidden">
                        <TooltipProvider>
                            {isLoading ? (
                                Array.from({length: 3}).map((_, index) => (
                                    <Skeleton
                                        key={index}
                                        className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"
                                    />
                                ))
                            ) : (
                                trainers?.length > 0 ? (
                                    <div className="flex gap-2">
                                        {trainers.map((trainer: TrainerDetails) => (
                                            <Tooltip key={trainer._id}>
                                                <TooltipTrigger>
                                                    <TrainerList trainers={[trainer]}/>
                                                </TooltipTrigger>
                                                <TooltipContent
                                                    className="bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-600/50 rounded-md p-2 shadow-sm dark:shadow-none"
                                                >
                                                    <div className="text-center">
                                                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {trainer.fullName}
                                                        </h4>
                                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                                            {trainer.email}
                                                        </p>
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-gray-500 dark:text-gray-400 text-sm">
                                        No trainers assigned yet
                                    </div>
                                )
                            )}
                        </TooltipProvider>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}