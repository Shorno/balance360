import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Clock, Award } from 'lucide-react'
import { useState } from 'react'

interface TrainerApplicationDetailsProps {
    application: {
        fullName: string
        email: string
        yearsOfExperience: number
        skills: string[]
        availableDays: string[]
        availableTime: string
        profileImage: string
        details: string
    }
}

export default function TrainerApplicationDetails({ application }: TrainerApplicationDetailsProps) {
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
    const [rejectionFeedback, setRejectionFeedback] = useState("")

    return (
        <div className="bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-7xl mx-auto bg-gray-800/50 border-gray-700">
                <CardHeader className="border-b border-gray-700">
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Trainer Application
                            </CardTitle>
                            <p className="text-gray-400 mt-2">Application details for {application.fullName}</p>
                        </div>
                        <div className="flex gap-4">
                            <Button
                                onClick={() => {}}
                                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                            >
                                Confirm Application
                            </Button>
                            <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="destructive" className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600">
                                        Reject Application
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-gray-800 border-gray-700">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl text-white">Reject Application</DialogTitle>
                                        <DialogDescription className="text-gray-400">
                                            Please provide feedback for rejecting this application
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-6 py-4">
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={application.profileImage}
                                                alt={application.fullName}
                                                className="w-16 h-16 rounded-full object-cover"
                                            />
                                            <div>
                                                <h4 className="text-lg font-semibold text-white">{application.fullName}</h4>
                                                <p className="text-sm text-gray-400">{application.email}</p>
                                            </div>
                                        </div>
                                        <Textarea
                                            value={rejectionFeedback}
                                            onChange={(e) => setRejectionFeedback(e.target.value)}
                                            placeholder="Enter your feedback for rejection..."
                                            className="bg-gray-700 border-gray-600 text-white h-32 focus:ring-purple-400"
                                        />
                                        <div className="flex justify-end space-x-4">
                                            <Button
                                                variant="outline"
                                                onClick={() => setIsRejectModalOpen(false)}
                                                className="border-gray-600 text-gray-300 hover:bg-gray-700"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                onClick={() => {}}
                                                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                                            >
                                                Confirm Rejection
                                            </Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <Award className="w-5 h-5 text-purple-400" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">Experience</h3>
                                        <p className="text-gray-400">{application.yearsOfExperience} years</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <CalendarDays className="w-5 h-5 text-purple-400" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">Available Days</h3>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {application.availableDays.map((day) => (
                                                <Badge key={day} className="bg-gray-700 text-white">
                                                    {day}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Clock className="w-5 h-5 text-purple-400" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">Available Time</h3>
                                        <p className="text-gray-400">{application.availableTime}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Skills & Expertise</h3>
                                <div className="flex flex-wrap gap-2">
                                    {application.skills.map((skill) => (
                                        <Badge
                                            key={skill}
                                            className="bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                        >
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">About</h3>
                                <p className="text-gray-400 whitespace-pre-wrap">{application.details}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-700">
                                <img
                                    src={application.profileImage}
                                    alt={application.fullName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                                <h3 className="text-lg font-semibold text-white mb-2">Contact Information</h3>
                                <div className="space-y-2">
                                    <p className="text-gray-400">
                                        <span className="font-medium text-gray-300">Name:</span> {application.fullName}
                                    </p>
                                    <p className="text-gray-400">
                                        <span className="font-medium text-gray-300">Email:</span> {application.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}