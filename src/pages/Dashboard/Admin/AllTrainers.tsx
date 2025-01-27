import {useQuery} from "@tanstack/react-query";
import {LoadingState} from "@/components/data-states/loading-state.tsx";
import {ErrorState} from "@/components/data-states/error-state.tsx";
import {getApprovedTrainers} from "@/api/admin.ts";
import {TrainersListTable} from "@/components/TrainerListTable.tsx";
import {BreadcrumbItem, BreadcrumbPage} from "@/components/ui/breadcrumb.tsx";
import DashboardBreadcrumb from "@/components/DashboardBreadcrumb.tsx";
import useDynamicTitle from "@/hooks/useDynamicTitle.tsx";


const breadcrumb =

    <BreadcrumbItem>
        <BreadcrumbPage>
            Trainers
        </BreadcrumbPage>
    </BreadcrumbItem>


export default function AllTrainers() {
    useDynamicTitle("Dashboard")
    const {data: trainers, isLoading, isError} = useQuery({
        queryKey: ['trainers'],
        queryFn: () => getApprovedTrainers(),
        select: (data) => data?.data
    })

    if (isError) {
        return <ErrorState/>
    }

    return (
        <>
            <DashboardBreadcrumb breadcrumb={breadcrumb}/>
            {isLoading ? <LoadingState/> : <TrainersListTable data={trainers}/>}
        </>
    )
}
