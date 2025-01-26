import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Badge} from "@/components/ui/badge"
import {Textarea} from "@/components/ui/textarea"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {CalendarDays, Clock, Award, CakeIcon} from 'lucide-react'
import {useState} from 'react'
import {useMutation} from "@tanstack/react-query";
import {approveTrainerApplication, rejectTrainerApplication} from "@/api/admin.ts";
import toast from "react-hot-toast";
import {useNavigate} from "react-router";

interface TrainerApplicationDetailsProps {
    application: {
        _id: string
        fullName: string
        email: string
        yearsOfExperience: number,
        age: number,
        skills: string[]
        availableDays: string[]
        availableTime: string
        profileImage: string
        details: string
    }
}

export default function TrainerApplicationDetails({application}: TrainerApplicationDetailsProps) {
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
    const [rejectionFeedback, setRejectionFeedback] = useState("")


    const navigate = useNavigate()


    const {mutateAsync, isPending} = useMutation({
        mutationFn: approveTrainerApplication,
        onSuccess: () => {
            toast.success("Trainer request has been approved")
            navigate("/dashboard/admin/trainers")
        },
        onError: (error) => {
            toast.error("Failed to approve application")
            console.error(error)
        }
    })

    const handleApprove = async () => {
        await mutateAsync(application._id)
    }


    const {mutateAsync: rejectApplication, isPending: isRejectionPending} = useMutation({
        mutationFn: ({id, rejectionReason}: { id: string; rejectionReason: string }) =>
            rejectTrainerApplication(id, rejectionReason),
        onSuccess: () => {
            toast.success("Trainer request has been rejected");
            navigate("/dashboard/admin/trainers")
            setIsRejectModalOpen(false);
        },
        onError: (error) => {
            toast.error("Failed to reject application");
            console.error(error);
        }
    });


    const handleReject = async () => {
        await rejectApplication({id: application._id, rejectionReason: rejectionFeedback});
    }


    return (
        <div className="py-4 sm:py-8 sm:px-6 lg:px-8">
            <Card className="max-w-7xl mx-auto bg-gray-800/50 border-gray-700">
                <CardHeader className="border-b border-gray-700">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                            <CardTitle
                                className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Trainer Application
                            </CardTitle>
                            <p className="text-gray-400 mt-2 text-sm sm:text-base">Application details
                                for {application?.fullName}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
                            <Button
                                onClick={handleApprove}
                                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                            >
                                {isPending ? "Processing Request..." : "Confirm Application"}
                            </Button>
                            <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="destructive"
                                            className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600">
                                        Reject Application
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-gray-800 border-gray-700 w-[90vw] max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle className="text-xl sm:text-2xl text-white">Reject
                                            Application</DialogTitle>
                                        <DialogDescription className="text-gray-400 text-sm sm:text-base">
                                            Please provide feedback for rejecting this application
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 sm:space-y-6 py-2 sm:py-4">
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={application?.profileImage || "/placeholder.svg"}
                                                alt={application?.fullName}
                                                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                                            />
                                            <div>
                                                <h4 className="text-base sm:text-lg font-semibold text-white">{application?.fullName}</h4>
                                                <p className="text-xs sm:text-sm text-gray-400">{application?.email}</p>
                                            </div>
                                        </div>
                                        <Textarea
                                            value={rejectionFeedback}
                                            onChange={(e) => setRejectionFeedback(e.target.value)}
                                            placeholder="Enter your feedback for rejection..."
                                            className="bg-gray-700 border-gray-600 text-white h-24 sm:h-32 focus:ring-purple-400"
                                        />
                                        <div className="flex justify-end space-x-2 sm:space-x-4">
                                            <Button
                                                variant="outline"
                                                onClick={() => setIsRejectModalOpen(false)}
                                                className="border-gray-600 text-gray-300 hover:bg-gray-700 text-xs sm:text-sm"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                onClick={handleReject}
                                                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-xs sm:text-sm"
                                            >
                                                {isRejectionPending ? "Processing Request..." : "Reject Application"}
                                            </Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-4 sm:pt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        <div className="space-y-6 sm:space-y-8">
                            <div className="space-y-4 sm:space-y-6">
                                <div className="flex items-center space-x-4">
                                    <Award className="w-5 h-5 text-purple-400"/>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-semibold text-white">Experience</h3>
                                        <p className="text-sm sm:text-base text-gray-400">{application?.yearsOfExperience} years</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <CakeIcon className="w-5 h-5 text-purple-400"/>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-semibold text-white">Age</h3>
                                        <p className="text-sm sm:text-base text-gray-400">{application?.age} years</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <CalendarDays className="w-5 h-5 text-purple-400 mt-1"/>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-semibold text-white">Available
                                            Days</h3>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {application?.availableDays.map((day) => (
                                                <Badge key={day} className="bg-gray-700 text-white text-xs sm:text-sm">
                                                    {day}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Clock className="w-5 h-5 text-purple-400"/>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-semibold text-white">Available
                                            Time</h3>
                                        <p className="text-sm sm:text-base text-gray-400">{application?.availableTime}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-4">Skills &
                                    Expertise</h3>
                                <div className="flex flex-wrap gap-2">
                                    {application?.skills.map((skill) => (
                                        <Badge
                                            key={skill}
                                            className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs sm:text-sm"
                                        >
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-4">About</h3>
                                <p className="text-sm sm:text-base text-gray-400 whitespace-pre-wrap">{application?.details}</p>
                            </div>
                        </div>

                        <div className="space-y-4 sm:space-y-6">
                            <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-700">
                                <img
                                    src={application?.profileImage || "/placeholder.svg"}
                                    alt={application?.fullName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Contact
                                    Information</h3>
                                <div className="space-y-2">
                                    <p className="text-sm sm:text-base text-gray-400">
                                        <span className="font-medium text-gray-300">Name:</span> {application?.fullName}
                                    </p>
                                    <p className="text-sm sm:text-base text-gray-400">
                                        <span className="font-medium text-gray-300">Email:</span> {application?.email}
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

