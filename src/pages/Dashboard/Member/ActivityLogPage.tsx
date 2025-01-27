import {Eye} from 'lucide-react'
import {useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {Badge} from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {BreadcrumbItem, BreadcrumbPage} from "@/components/ui/breadcrumb.tsx";
import DashboardBreadcrumb from "@/components/DashboardBreadcrumb.tsx";
import {getApplicationStatus} from "@/api/user.ts";
import {useQuery} from "@tanstack/react-query";
import useAuthStore from "@/store/authStore.ts";
import {LoadingState} from "@/components/data-states/loading-state.tsx";
import BecomeTrainerCTA from "@/components/BecomeTrainerCTA.tsx";
import useDynamicTitle from "@/hooks/useDynamicTitle.tsx";


const breadcrumb =
    <BreadcrumbItem>
        <BreadcrumbPage>
            Activity Log
        </BreadcrumbPage>
    </BreadcrumbItem>


interface Application {
    id: string
    fullName: string
    email: string
    createdAt: Date
    status: 'pending' | 'rejected'
    rejectionReason?: string
    profileImage: string
}

export default function ActivityLogPage() {
    useDynamicTitle("Dashboard")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {currentUser} = useAuthStore()

    const {data: application, isLoading} = useQuery({
        queryKey: ['application', currentUser?.email],
        queryFn: () => getApplicationStatus(currentUser?.email || ''),
        select: (data) => data?.data,
        enabled: !!currentUser?.email
    })

    const getStatusBadge = (status: Application['status']) => {
        switch (status) {
            case 'pending':
                return (
                    <Badge className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                        Pending
                    </Badge>
                )
            case 'rejected':
                return (
                    <Badge className="bg-red-500/20 text-red-300 border border-red-500/30">
                        Rejected
                    </Badge>
                )
            default:
                return null
        }
    }

    return (
        <>

            <DashboardBreadcrumb breadcrumb={breadcrumb}/>

            <div className="min-h-screen bg-gray-900 sm:p-6 lg:p-8">
                <Card className="max-w-3xl mx-auto bg-gray-800/50 border-gray-700">
                    <CardHeader className="border-b border-gray-700">
                        <CardTitle
                            className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Application Status
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                            Track the status of your trainer application
                        </CardDescription>
                    </CardHeader>
                    {
                        isLoading? <LoadingState/> :
                            (
                                application ?
                                    (
                                        <CardContent className="pt-6">
                                            <div className="space-y-6">
                                                <div
                                                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 rounded-lg border border-gray-700 bg-gray-800/30">
                                                    <div className="flex items-center gap-4">
                                                        <img
                                                            src={application?.profileImage}
                                                            alt={application?.fullName}
                                                            className="w-16 h-16 rounded-md object-cover"
                                                        />
                                                        <div className="space-y-1">
                                                            <h3 className="text-lg font-semibold text-white">
                                                                {application?.fullName}
                                                            </h3>
                                                            {
                                                                application?.createdAt &&
                                                                <p className="text-sm text-gray-400">
                                                                    Applied
                                                                    on {new Date(application?.createdAt).toLocaleDateString("en-US", {
                                                                    month: "long",
                                                                    day: "numeric",
                                                                    year: "numeric"
                                                                })}
                                                                </p>
                                                            }
                                                            <div className="flex items-center gap-2">
                                                                {getStatusBadge(application?.status)}
                                                                {application?.status === 'rejected' && (
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() => setIsModalOpen(true)}
                                                                        className="hover:bg-gray-700 h-7 px-2 text-sm"
                                                                    >
                                                                        <Eye className="w-4 h-4 mr-1 text-gray-400"/>
                                                                        View Feedback
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {application?.status === 'pending' && (
                                                    <div
                                                        className="text-center p-4 rounded-lg border border-yellow-500/20 bg-yellow-500/5">
                                                        <p className="text-yellow-200">
                                                            Your application is currently under review. We'll notify you once a
                                                            decision has
                                                            been made.
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                                                <DialogContent className="bg-gray-800 border-gray-700">
                                                    <DialogHeader>
                                                        <DialogTitle className="text-xl text-white">
                                                            Application Feedback
                                                        </DialogTitle>
                                                    </DialogHeader>
                                                    <div className="space-y-6">
                                                        <div className="flex items-center space-x-4">
                                                            <img
                                                                src={application?.profileImage}
                                                                alt={application?.fullName}
                                                                className="w-16 h-16 rounded-full object-cover"
                                                            />
                                                            <div>
                                                                <h4 className="text-lg font-semibold text-white">
                                                                    {application?.fullName}
                                                                </h4>
                                                                <p className="text-sm text-gray-400">
                                                                    {application?.email}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                                                            <p className="text-gray-300 whitespace-pre-wrap">
                                                                {application?.rejectionReason}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </CardContent>

                                    ) :
                                    (
                                        <div className="text-center p-8 flex flex-col gap-10">
                                            <p className="text-gray-400">
                                                You haven't submitted a trainer application yet.
                                            </p>
                                            <BecomeTrainerCTA/>
                                        </div>
                                    )
                            )
                    }
                </Card>
            </div>
        </>
    )
}