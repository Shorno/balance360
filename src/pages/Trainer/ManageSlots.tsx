import {useState} from "react"
import {useQuery} from "@tanstack/react-query"
import {
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {ChevronDown, Search} from "lucide-react"
import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Input} from "@/components/ui/input"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import useAuthStore from "@/store/authStore"
import {cn} from "@/lib/utils"
import {columns} from "@/pages/Trainer/Colums.tsx";
import {LoadingState} from "@/components/data-states/loading-state.tsx";
import {getTrainerSlotsDetails} from "@/api/public.ts";

export interface TrainerSlot {
    _id: string;
    additionalInfo: string;
    bookedCount: number;
    bookedUsers: BookedUser[];
    createdAt: string;
    selectedClass: string;
    selectedDays: string[];
    slotDuration: string;
    slotName: string;
    startTime: string;
    trainerEmail: string;
    updatedAt: string;
}

interface BookedUser {
    _id: string;
    userEmail: string;
    paymentId: string;
    bookingDate: string;
    userDetails?: {
        _id: string;
        displayName: string;
        email: string;
        photoURL?: string;
    };
}

export default function ManageSlots() {
    const {currentUser} = useAuthStore()
    const {data: slots, isLoading} = useQuery<TrainerSlot[]>({
        queryKey: ["slots", currentUser?.email],
        queryFn: () => getTrainerSlotsDetails(currentUser?.email || ""),
        enabled: !!currentUser?.email,
        // @ts-ignore
        select: (data) => data?.data,
    })

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data: slots || [],
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full space-y-6 mt-32 px-4 lg:px-10">
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold">Manage Training Slots</h1>
                <p className="text-muted-foreground">View and manage your training slots and bookings</p>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-muted-foreground"/>
                    <Input
                        placeholder="Search slots..."
                        value={(table.getColumn("slotName")?.getFilterValue() as string) ?? ""}
                        onChange={(event) => table.getColumn("slotName")?.setFilterValue(event.target.value)}
                        className="h-9 w-[250px] lg:w-[300px]"
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto h-9 bg-gray-850">
                            View <ChevronDown className="ml-2 h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[150px] ">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(value)}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-lg border shadow-sm grid grid-cols-1">
                {isLoading ? <LoadingState/> :
                    (
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id} className="hover:bg-transparent">
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id} className="h-11 px-4">
                                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                            className={cn("hover:bg-secondary/50 transition-colors", row.getIsSelected() && "bg-secondary")}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id} className="py-3 px-4">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            No results found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )
                }
            </div>
            <div className="flex items-center justify-end  space-x-2 py-4">
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="h-8"
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="h-8"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
