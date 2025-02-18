import {BreadcrumbItem, BreadcrumbPage} from "@/components/ui/breadcrumb.tsx";
import DashboardBreadcrumb from "@/components/DashboardBreadcrumb.tsx";
import type {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {ArrowUpDown, AtSign, UserIcon} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {getAllSubscribers} from "@/api/newsletter.ts";
import {LoadingState} from "@/components/data-states/loading-state.tsx";
import SubscribersTable from "@/components/SubscribersTable.tsx";
import useDynamicTitle from "@/hooks/useDynamicTitle.tsx";

const breadcrumb =
    <BreadcrumbItem>
        <BreadcrumbPage>
            Balance
        </BreadcrumbPage>
    </BreadcrumbItem>


interface Newsletter {
    name: string;
    email: string;
}

const columns: ColumnDef<Newsletter>[] = [
    {
        accessorKey: "name",
        header: ({column}) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => (
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-purple-400"/>
                </div>
                {row.getValue("name")}
            </div>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({row}) => (
            <div className="flex items-center gap-2 w-max">
                <AtSign className="w-4 h-4 text-purple-400"/>
                {row.getValue("email")}
            </div>
        ),
    },

]


export default function NewsLetterPage() {
    useDynamicTitle("Dashboard")

    const {data: subscribers, isLoading} = useQuery({
        queryKey: ["subscribers"],
        queryFn: () => getAllSubscribers(),
    })

    console.log(subscribers)


    return (
        <>
            <DashboardBreadcrumb breadcrumb={breadcrumb}/>
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Newsletter Subscribers</h1>
            </div>
            {
                isLoading ? <LoadingState className={"mt-32"}/> : (
                    <SubscribersTable columns={columns} data={subscribers}/>
                )
            }
        </>
    )
}