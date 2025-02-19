import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button.tsx"
import { Badge } from "@/components/ui/badge.tsx"
import UserList from "@/pages/Dashboard/Trainer/UserList.tsx"
import {TrainerSlot} from "@/pages/Dashboard/Trainer/ManageSlots.tsx";
import {SlotsAction} from "@/pages/Dashboard/Trainer/SlotsAction.tsx";

export const columns: ColumnDef<TrainerSlot>[] = [
    {
        accessorKey: "slotName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-secondary/50"
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="font-medium hover:text-primary transition-colors w-max">{row.getValue("slotName")}</div>
        ),
    },
    {
        accessorKey: "startTime",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-secondary/50"
                >
                    Time
                    <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="text-muted-foreground hover:text-primary transition-colors">{row.getValue("startTime")}</div>
        ),
    },
    {
        accessorKey: "slotDuration",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-secondary/50"
                >
                    Duration
                    <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="font-medium">
        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-sm bg-secondary">
          {row.getValue("slotDuration")}
        </span>
            </div>
        ),
    },
    {
        accessorKey: "selectedClass",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-secondary/50"
                >
                    Class
                    <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
                </Button>
            )
        },
        cell: ({ row }) => <Badge variant="secondary">{row.getValue("selectedClass")}</Badge>,
    },
    {
        accessorKey: "bookedUsers",
        header: "Booked Clients",
        cell: ({ row }) => {
            const bookedUsers = row.original.bookedUsers
            return (
                <div className="space-y-2 w-max">
                    <UserList
                        users={bookedUsers.map((bookedUser) => ({
                            _id: bookedUser.userDetails?._id || bookedUser._id,
                            displayName: bookedUser.userDetails?.displayName || bookedUser.userEmail,
                            email: bookedUser.userEmail,
                            photoURL: bookedUser.userDetails?.photoURL,
                        }))}
                    />
                    <Badge variant="outline" className="border-purple-500/30 text-purple-400 bg-purple-500/10 w-fit">
                        {bookedUsers.length} Booking{bookedUsers.length !== 1 && "s"}
                    </Badge>
                </div>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <SlotsAction row={row} />,
    },
]

