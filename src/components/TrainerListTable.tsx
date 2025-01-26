import {useState} from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    ArrowUpDown,
    ChevronDown,
    Search,
} from 'lucide-react'

import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Input} from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {cn} from "@/lib/utils"
import {Badge} from "@/components/ui/badge"
import {TrainerApplicationData} from "@/types";
import {TrainerActions} from "@/pages/Trainer/TrainerActions.tsx";

const columns: ColumnDef<TrainerApplicationData>[] = [
    {
        accessorKey: "profileImage",
        header: "Image",
        cell: ({row}) => (
            <div
                className="relative w-16 h-24 overflow-hidden rounded-md shadow-sm transition-transform hover:scale-105">
                <img
                    src={row.getValue("profileImage")}
                    alt={`Profile of ${row.getValue("fullName")}`}
                    className="object-cover w-full h-full rounded-md hover:opacity-90 transition-opacity"
                />
            </div>
        ),
    },
    {
        accessorKey: "fullName",
        enableHiding: false,
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-secondary/50"
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground"/>
                </Button>
            )
        },
        cell: ({row}) => (
            <div className="font-medium hover:text-primary transition-colors">
                {row.getValue("fullName")}
            </div>
        ),
    },
    {
        accessorKey: "email",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-secondary/50"
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground"/>
                </Button>
            )
        },
        cell: ({row}) => (
            <div className="text-muted-foreground hover:text-primary transition-colors">
                {row.getValue("email")}
            </div>
        ),
    },
    {
        accessorKey: "yearsOfExperience",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-secondary/50"
                >
                    Experience
                    <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const years = row.getValue("yearsOfExperience") as number
            return (
                <div className="font-medium">
                    <span
                        className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-sm bg-secondary">
                        {years} years
                    </span>
                </div>
            )
        },
    },
    {
        accessorKey: "status",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-secondary/50"
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const status = row.getValue("status") as string
            return (
                <Badge
                    className={cn(
                        "capitalize",
                        status === "approved" && "bg-green-100 text-green-800",
                        status === "pending" && "bg-yellow-100 text-yellow-800",
                        status === "rejected" && "bg-red-100 text-red-800"
                    )}
                >
                    {status}
                </Badge>
            )
        },
    },
    {
        id: "actions",
        header: "Actions",
        enableHiding: false,
        cell: ({row}) => <TrainerActions row={row}/>
    }
]

export function TrainersListTable({data}: { data: TrainerApplicationData[] }) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data,
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
        <div className="w-full space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-muted-foreground"/>
                    <Input
                        placeholder="Search trainers..."
                        value={(table.getColumn("fullName")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("fullName")?.setFilterValue(event.target.value)
                        }
                        className="h-9 w-[250px] lg:w-[300px]"
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto h-9 bg-gray-850">
                            View <ChevronDown className="ml-2 h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[150px] bg-gray-900">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-lg border shadow-sm grid grid-cols-1">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="hover:bg-transparent">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="h-11 px-4">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
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
                                    className={cn(
                                        "hover:bg-secondary/50 transition-colors",
                                        row.getIsSelected() && "bg-secondary"
                                    )}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="py-3 px-4">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
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