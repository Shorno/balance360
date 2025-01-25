import { useQuery, useMutation } from '@tanstack/react-query';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Calendar,
    Clock,
    User,
    Trash2,
    Mail,
    Phone,
    AlertTriangle,
} from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog.tsx';
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";

// Dummy data for demonstration
const DUMMY_SLOTS = [
    {
        id: '1',
        date: '2024-02-25',
        startTime: '09:00 AM',
        endTime: '10:00 AM',
        isBooked: true,
        booking: {
            clientName: 'John Doe',
            email: 'john@example.com',
            phone: '+1 234-567-8900',
            fitnessGoal: 'Weight Loss',
        },
    },
    {
        id: '2',
        date: '2024-02-25',
        startTime: '10:30 AM',
        endTime: '11:30 AM',
        isBooked: false,
    },
    {
        id: '3',
        date: '2024-02-25',
        startTime: '02:00 PM',
        endTime: '03:00 PM',
        isBooked: true,
        booking: {
            clientName: 'Sarah Smith',
            email: 'sarah@example.com',
            phone: '+1 234-567-8901',
            fitnessGoal: 'Muscle Gain',
        },
    },
    {
        id: '4',
        date: '2024-02-26',
        startTime: '11:00 AM',
        endTime: '12:00 PM',
        isBooked: false,
    },
];

export default function ManageSlots() {
    const { data: slots, isLoading } = useQuery({
        queryKey: ['trainer-slots'],
        queryFn: () => Promise.resolve(DUMMY_SLOTS),
    });

    const deleteSlotMutation = useMutation({
        mutationFn: async (slotId: string) => {
            // Implement delete logic here
            console.log(`Deleting slot ${slotId}`);
        },
        onSuccess: () => {
            // Refresh slots data
            console.log('Slot deleted successfully');
        },
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-gray-400">Loading slots...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Manage Training Slots
                    </h1>
                    <p className="mt-2 text-gray-400">
                        View and manage your training slots and bookings
                    </p>
                </div>

                <div className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-gray-700">
                                    <TableHead className="text-gray-300">Date</TableHead>
                                    <TableHead className="text-gray-300">Time</TableHead>
                                    <TableHead className="text-gray-300">Status</TableHead>
                                    <TableHead className="text-gray-300">Client Details</TableHead>
                                    <TableHead className="text-gray-300">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {slots?.map((slot) => (
                                    <TableRow
                                        key={slot.id}
                                        className="border-gray-700 hover:bg-gray-800/50"
                                    >
                                        <TableCell className="text-gray-300">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-purple-400" />
                                                {slot.date}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-gray-300">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-purple-400" />
                                                {slot.startTime} - {slot.endTime}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={`${
                                                    slot.isBooked
                                                        ? 'border-green-500/30 text-green-400 bg-green-500/10'
                                                        : 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10'
                                                }`}
                                            >
                                                {slot.isBooked ? 'Booked' : 'Available'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-gray-300">
                                            {slot.isBooked && slot.booking ? (
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <User className="w-4 h-4 text-purple-400" />
                                                        {slot.booking.clientName}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                                        <Mail className="w-3 h-3" />
                                                        {slot.booking.email}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                                        <Phone className="w-3 h-3" />
                                                        {slot.booking.phone}
                                                    </div>
                                                    <Badge
                                                        variant="outline"
                                                        className="border-purple-500/30 text-purple-400 bg-purple-500/10"
                                                    >
                                                        Goal: {slot.booking.fitnessGoal}
                                                    </Badge>
                                                </div>
                                            ) : (
                                                <span className="text-gray-500">No booking</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className="bg-gray-800 border-gray-700">
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle className="text-white flex items-center gap-2">
                                                            <AlertTriangle className="w-5 h-5 text-red-400" />
                                                            Delete Training Slot
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription className="text-gray-400">
                                                            Are you sure you want to delete this training slot?
                                                            {slot.isBooked && (
                                                                <span className="block mt-2 text-red-400">
                                  Warning: This slot is currently booked!
                                </span>
                                                            )}
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel className="bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600">
                                                            Cancel
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => deleteSlotMutation.mutate(slot.id)}
                                                            className="bg-red-500 hover:bg-red-600 text-white"
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}