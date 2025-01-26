import {Card, CardContent} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {ChevronRight, Clock} from "lucide-react"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {useQuery} from "@tanstack/react-query"
import {getTrainerSlots} from "@/api/trainer"
import React from "react"
import {LoadingState} from "@/components/data-states/loading-state"
import {useNavigate} from "react-router"

export type Slot = {
    _id: string
    slotName: string
    startTime: string
    slotDuration: string
    selectedClass: string
    selectedDays: string[]
    additionalInfo?: string
}

export default function TimeSlots({
                                      book = true,
                                      email,
                                      trainerName,
                                  }: {
    email: string | undefined
    trainerName: string | undefined
    book?: boolean
}) {
    const {
        data: slotsList,
        isLoading,
    } = useQuery<Slot[]>({
        queryKey: ["slots", email],
        queryFn: () => getTrainerSlots(email || ""),
        enabled: !!email,
    })

    const uniqueDays = React.useMemo(() => {
        if (!slotsList) return []
        const allDays = new Set(slotsList.flatMap((slot) => slot.selectedDays))
        return Array.from(allDays)
    }, [slotsList])

    const navigate = useNavigate()

    if (isLoading) {
        return (
            <Card className="bg-gray-800/50 border-gray-700 h-fit">
                <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Loading Time Slots...</h2>
                    <LoadingState/>
                </CardContent>
            </Card>
        )
    }

    if (!slotsList || slotsList.length === 0) {
        return (
            <Card className="bg-gray-800/50 border-gray-700 h-fit">
                <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">No Time Slots Available</h2>
                    <p className="text-gray-400">There are currently no available time slots for this trainer.</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="bg-gray-800/50 border-gray-700 h-fit">
            <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Available Time Slots</h2>
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
                                {slotsList
                                    .filter((slot) => slot.selectedDays.includes(day))
                                    .map((slot) => (
                                        <Card key={slot.slotName} className="bg-gray-700/30 border-gray-600">
                                            <CardContent className="p-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-1">
                                                        <h3 className="text-lg font-semibold text-white">{slot.slotName}</h3>
                                                        <div className="flex items-center gap-4 text-gray-300">
                                                            <div className="flex items-center gap-1">
                                                                <Clock className="w-4 h-4 text-purple-400"/>
                                                                {slot.startTime}
                                                            </div>
                                                            <div className="text-gray-400">|</div>
                                                            <div>{slot.slotDuration}</div>
                                                        </div>
                                                        <Badge variant="secondary"
                                                               className="bg-purple-500/20 text-purple-300">
                                                            {slot.selectedClass}
                                                        </Badge>
                                                        {slot.additionalInfo &&
                                                            <p className="text-sm text-gray-400 mt-2">{slot.additionalInfo}</p>}
                                                    </div>
                                                    {
                                                        book && (
                                                            <Button
                                                                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                                                                onClick={() =>
                                                                    navigate(`/trainers/book-trainer`, {
                                                                        state: {
                                                                            slot: slot,
                                                                            trainerName,
                                                                        },
                                                                    })
                                                                }
                                                            >
                                                                Book Now
                                                                <ChevronRight className="w-4 h-4 ml-2"/>
                                                            </Button>
                                                        )
                                                    }
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    )
}

