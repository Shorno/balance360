import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Clock, Calendar, ChevronRight, Dumbbell} from "lucide-react"
import {useNavigate} from "react-router"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {useQuery} from "@tanstack/react-query"
import {getTrainerDetails, getTrainerSlots} from "@/api/trainer.ts"
import useAuthStore from "@/store/authStore.ts"
import type {TrainerFormData} from "@/schema/schema.ts"
import {LoadingState} from "@/components/data-states/loading-state.tsx";
import BecomeTrainerCTA from "@/components/BecomeTrainerCTA.tsx";

export default function TrainerDetailsPage() {
    const navigate = useNavigate()
    const {currentUser} = useAuthStore()
    const {data: trainerInfo, isLoading: isTrainerLoading} = useQuery<TrainerFormData>({
        queryKey: ["trainer", currentUser?.email],
        queryFn: () => getTrainerDetails(currentUser?.email || ""),
        select: (data) => data,
    })

    console.log(trainerInfo)

    const {data: slotsList, isLoading: isSlotLoading} = useQuery({
        queryKey: ["slots", currentUser?.email],
        queryFn: () => getTrainerSlots(currentUser?.email || ""),
        enabled: !!currentUser,
    })


    const allDays = slotsList?.flatMap(slot => slot.selectedDays) || [];
    const uniqueDays = [...new Set(allDays)];

    const handleBecomeTrainer = () => {
        navigate("/become-trainer")
    }

    return (
        <div className="min-h-screen bg-gray-900 py-40 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Trainer Profile */}
                    {
                        isTrainerLoading ?
                            <LoadingState/>
                            :
                            (
                                <Card className="bg-gray-800/50 border-gray-700">
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
                                                    <h1 className="text-2xl font-bold text-white mb-1">{trainerInfo?.fullName}</h1>
                                                    <p className="text-gray-400">{trainerInfo?.email}</p>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                        <p className="text-sm text-gray-400">Experience</p>
                                                        <p className="text-lg font-semibold text-white">{trainerInfo?.yearsOfExperience} years</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-sm text-gray-400">Age</p>
                                                        <p className="text-lg font-semibold text-white">{trainerInfo?.age} years</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Calendar className="w-4 h-4 text-purple-400"/>
                                                            <span className="text-gray-300">Available Days</span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {trainerInfo?.availableDays.map((day) => (
                                                                <Badge key={day}
                                                                       className="bg-purple-500/20 text-purple-300 border border-purple-500/30">
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
                                                        <p className="text-white">{trainerInfo?.availableTime}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="md:col-span-3">
                                                <div className="space-y-4">
                                                    <div>
                                                        <h2 className="text-xl font-semibold text-white mb-3">About
                                                            Me</h2>
                                                        <p className="text-gray-300 leading-relaxed">{trainerInfo?.details}</p>
                                                    </div>

                                                    <div>
                                                        <h2 className="text-xl font-semibold text-white mb-3">Skills &
                                                            Expertise</h2>
                                                        <div className="flex flex-wrap gap-2">
                                                            {trainerInfo?.skills.map((skill) => (
                                                                <Badge key={skill}
                                                                       className="bg-purple-500/20 text-purple-300 border border-purple-500/30">
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


                    {
                        isSlotLoading  ? <LoadingState/> :
                            (
                                <Card className="bg-gray-800/50 border-gray-700 h-fit">
                                    <CardContent className="p-6">
                                        <h2 className="text-2xl font-bold text-white mb-6">
                                            {slotsList?.length ? "Available Time Slots" : "Loading Slots..."}
                                        </h2>
                                        {
                                            slotsList?.length ? (
                                                    <Tabs defaultValue={uniqueDays[0]} className="w-full">
                                                        <TabsList className="bg-gray-700/50 p-1 mb-6">
                                                            {uniqueDays.map((day) => (
                                                                <TabsTrigger
                                                                    key={day}
                                                                    value={day}
                                                                    className="flex-1 data-[state=active]:bg-purple-500 data-[state=active]:text-white"
                                                                >
                                                                    <div className="text-center">
                                                                        <div className="font-medium">{day}</div>
                                                                    </div>
                                                                </TabsTrigger>
                                                            ))}
                                                        </TabsList>

                                                        {uniqueDays.map((day) => (
                                                            <TabsContent key={day} value={day}>
                                                                <div className="space-y-4">
                                                                    {slotsList?.filter(slot => slot.selectedDays.includes(day)).map((slot) => (
                                                                        <Card key={slot._id}
                                                                              className="bg-gray-700/30 border-gray-600">
                                                                            <CardContent className="p-4">
                                                                                <div
                                                                                    className="flex items-center justify-between">
                                                                                    <div className="space-y-1">
                                                                                        <h3 className="text-lg font-semibold text-white">
                                                                                            {slot.slotName}
                                                                                        </h3>
                                                                                        <div
                                                                                            className="flex items-center gap-4 text-gray-300">
                                                                                            <div
                                                                                                className="flex items-center gap-1">
                                                                                                <Clock
                                                                                                    className="w-4 h-4 text-purple-400"/>
                                                                                                {slot.startTime}
                                                                                            </div>
                                                                                            <div
                                                                                                className="text-gray-400">|
                                                                                            </div>
                                                                                            <div>{slot.slotDuration}</div>
                                                                                        </div>
                                                                                        <div
                                                                                            className="flex flex-wrap gap-2 mt-2">
                                                                                            <Badge
                                                                                                variant="secondary"
                                                                                                className="bg-purple-500/20 text-purple-300"
                                                                                            >
                                                                                                {slot.selectedClass}
                                                                                            </Badge>
                                                                                        </div>
                                                                                        {slot.additionalInfo && (
                                                                                            <p className="text-sm text-gray-400 mt-2">
                                                                                                {slot.additionalInfo}
                                                                                            </p>
                                                                                        )}
                                                                                    </div>
                                                                                    <Button
                                                                                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                                                                                    >
                                                                                        Book Now
                                                                                        <ChevronRight
                                                                                            className="w-4 h-4 ml-2"/>
                                                                                    </Button>
                                                                                </div>
                                                                            </CardContent>
                                                                        </Card>
                                                                    ))}
                                                                </div>
                                                            </TabsContent>
                                                        ))}
                                                    </Tabs>
                                                )
                                                :
                                                (
                                                    <div className="text-center text-white">
                                                        <Dumbbell className="w-16 h-16 mx-auto"/>
                                                        <p className="text-lg font-semibold mt-4">No Slots Available</p>
                                                        <p className="text-gray-300">Trainer has not added any slots
                                                            yet.</p>
                                                    </div>
                                                )
                                        }
                                    </CardContent>
                                </Card>
                            )
                    }
                </div>
                <BecomeTrainerCTA/>

            </div>
        </div>
    )
}

