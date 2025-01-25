import {Button} from "@/components/ui/button.tsx";

import {Tooltip, ResponsiveContainer, PieChart, Pie, Cell} from "recharts"
import {DollarSign, Users, Mail, CreditCard, Calendar, ArrowUpDown} from "lucide-react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {useQuery} from "@tanstack/react-query"
import {getStatistics} from "@/api/admin"
import {LoadingState} from "@/components/data-states/loading-state"
import type {ColumnDef} from "@tanstack/react-table"
import {BreadcrumbItem, BreadcrumbPage} from "@/components/ui/breadcrumb.tsx";
import DashboardBreadcrumb from "@/components/DashboardBreadcrumb.tsx";
import TransactionsTable from "@/components/TransactionsTable.tsx";


const COLORS = ["#9333ea", "#e879f9"]

interface Transaction {
    id: string
    userEmail: string
    package: string
    amount: number
    createdAt: string
    status: string
}


const breadcrumb =
    <BreadcrumbItem>
        <BreadcrumbPage>
            Balance
        </BreadcrumbPage>
    </BreadcrumbItem>


const columns: ColumnDef<Transaction>[] = [
    {
        accessorKey: "userEmail",
        header: ({column}) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Member
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => (
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Users className="w-4 h-4 text-purple-400"/>
                </div>
                {row.getValue("userEmail")}
            </div>
        ),
    },
    {
        accessorKey: "package",
        header: "Plan",
        cell: ({row}) => (
            <div className="flex items-center gap-2 w-max">
                <CreditCard className="w-4 h-4 text-muted-foreground"/>
                {row.getValue("package")}
            </div>
        ),
    },
    {
        accessorKey: "amount",
        header: ({column}) => {
            return (
                <div className={"flex justify-center"}>
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Amount
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                </div>
            )
        },
        cell: ({row}) => <div className={"flex justify-center"}>${row.getValue("amount")}</div>,
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({row}) => {
            const date = new Date(row.getValue("createdAt"))
            return (
                <div className="flex items-center gap-2 w-max">
                    <Calendar className="w-4 h-4 text-muted-foreground"/>
                    <span className="hidden sm:inline">
            {date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            })}
          </span>
                    <span className="sm:hidden">
            {date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            })}
          </span>
                </div>
            )
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => (
            <Badge variant="default" className="bg-green-800 hover:bg-green-900 text-white capitalize">
                {row.getValue("status")}
            </Badge>
        ),
    },
]

export default function AdminBalancePage() {
    const {data: statistics, isLoading} = useQuery({
        queryKey: ["statistics"],
        queryFn: () => getStatistics(),
    })


    return (
        <>
            <DashboardBreadcrumb breadcrumb={breadcrumb}/>
            <div className="min-h-screen py-10 px-2">
                <div className="mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold">Financial Overview</h1>
                    </div>

                    {isLoading ? (
                        <LoadingState/>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 ">
                                <div className={"flex flex-col gap-4"}>
                                    <Card className="bg-gray-800 border-purple-900/60">
                                        <CardHeader
                                            className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium text-gray-300">Total
                                                Balance</CardTitle>
                                            <div
                                                className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                                                <DollarSign className="w-6 h-6 text-green-400"/>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div
                                                className="text-3xl font-bold text-white">${statistics?.totalRevenue}</div>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-gray-800 border-purple-900/60">
                                        <CardHeader
                                            className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium text-gray-300">Total
                                                Members</CardTitle>
                                            <div
                                                className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                                                <Users className="w-6 h-6 text-purple-400"/>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div
                                                className="text-3xl font-bold text-white">{statistics?.totalMembers}</div>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-gray-800 border-purple-900/60">
                                        <CardHeader
                                            className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium text-gray-300">Newsletter
                                                Subscribers</CardTitle>
                                            <div
                                                className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center">
                                                <Mail className="w-6 h-6 text-pink-400"/>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div
                                                className="text-3xl font-bold text-white">{statistics?.newsletterSubscribers}</div>
                                        </CardContent>
                                    </Card>
                                </div>
                                <Card className="bg-gray-800 border-purple-900/60">
                                    <CardHeader>
                                        <CardTitle className="text-gray-300">Members vs Subscribers</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-80">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={[
                                                            {
                                                                name: "Newsletter Subscribers",
                                                                value: statistics?.newsletterSubscribers || 0
                                                            },
                                                            {
                                                                name: "Paid Members",
                                                                value: statistics?.totalPaidMembers || 0
                                                            }
                                                        ]}
                                                        cx="50%"
                                                        cy="50%"
                                                        innerRadius={80}
                                                        outerRadius={120}
                                                        fill="#8884d8"
                                                        paddingAngle={5}
                                                        dataKey="value"
                                                        style={{outline: "none"}}
                                                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                    >
                                                        {statistics?.newsletterSubscribers
                                                            && statistics.totalPaidMembers
                                                            && COLORS.map((color, index) => (
                                                                <Cell key={index} fill={color}/>
                                                            ))}
                                                    </Pie>
                                                    <Tooltip/>
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>


                            <Card className="bg-gray-800 border-purple-900/60">
                                <CardHeader>
                                    <CardTitle className="text-gray-300">Recent Transactions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <TransactionsTable columns={columns} data={statistics?.recentTransactions || []}/>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

