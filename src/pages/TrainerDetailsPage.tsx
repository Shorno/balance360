import {Badge} from "@/components/ui/badge"
import {Card, CardContent} from "@/components/ui/card"
import {Clock, Calendar} from "lucide-react"
import {useQuery} from "@tanstack/react-query"
import {LoadingState} from "@/components/data-states/loading-state.tsx"
import BecomeTrainerCTA from "@/components/BecomeTrainerCTA.tsx"
import TimeSlots from "@/components/TimeSlots.tsx";
import {useParams} from "react-router";
import {getTrainerApplicationDetails} from "@/api/admin.ts";
import {ErrorState} from "@/components/data-states/error-state.tsx";

interface trainerInfoDetails {
    _id: string
    fullName: string
    email: string
    profileImage: string
    yearsOfExperience: number
    age: number
    availableDays: string[]
    availableTime: string
    details: string
    skills: string[]
}

export default function TrainerDetailsPage() {
    const {_id} = useParams()
    const {data: trainerInfo, isLoading: isTrainerLoading} = useQuery<trainerInfoDetails>({
        queryKey: ["trainer", _id],
        queryFn: () => getTrainerApplicationDetails(_id || ""),
        enabled: !!_id,
        //@ts-ignore
        select: (data) => data.data,
    })


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-40 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {isTrainerLoading ? (
                        <LoadingState/>
                    ) : (
                        trainerInfo ?
                            (<Card className="bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 h-min shadow-sm dark:shadow-none">
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {/* Profile Image */}
                                        <div className="aspect-square rounded-lg overflow-hidden">
                                            <img
                                                src={trainerInfo?.profileImage || "/placeholder.svg"}
                                                alt={trainerInfo?.fullName}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Profile Info */}
                                        <div className="md:col-span-2 space-y-6">
                                            <div>
                                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                                    {trainerInfo?.fullName}
                                                </h1>
                                                <p className="text-gray-600 dark:text-gray-400">{trainerInfo?.email}</p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Experience</p>
                                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        {trainerInfo?.yearsOfExperience} years
                                                    </p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Age</p>
                                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        {trainerInfo?.age} years
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400"/>
                                                        <span className="text-gray-700 dark:text-gray-300">Available Days</span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {trainerInfo?.availableDays.map((day) => (
                                                            <Badge key={day}
                                                                   className="bg-purple-100/80 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
                                                                {day}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400"/>
                                                        <span className="text-gray-700 dark:text-gray-300">Available Time</span>
                                                    </div>
                                                    <p className="text-gray-900 dark:text-white">{trainerInfo?.availableTime}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="md:col-span-3">
                                            <div className="space-y-4">
                                                <div>
                                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                                        About Me
                                                    </h2>
                                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                                        {trainerInfo?.details}
                                                    </p>
                                                </div>

                                                <div>
                                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                                        Skills & Expertise
                                                    </h2>
                                                    <div className="flex flex-wrap gap-2">
                                                        {trainerInfo?.skills.map((skill) => (
                                                            <Badge key={skill}
                                                                   className="bg-purple-100/80 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
                                                                {skill}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>)
                            : <ErrorState message={"Failed to load trainer data"}/>
                    )}

                    <TimeSlots email={trainerInfo?.email} trainerName={trainerInfo?.fullName}/>
                </div>
                <BecomeTrainerCTA/>
            </div>
        </div>
    )
}

