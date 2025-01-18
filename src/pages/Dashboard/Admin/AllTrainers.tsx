import {useQuery} from "@tanstack/react-query";
import {LoadingState} from "@/components/data-states/loading-state.tsx";
import {ErrorState} from "@/components/data-states/error-state.tsx";
import {getApprovedTrainers} from "@/api/admin.ts";
import {TrainersListTable} from "@/components/TrainerListTable.tsx";
import {BreadcrumbItem, BreadcrumbPage} from "@/components/ui/breadcrumb.tsx";
import DashboardBreadcrumb from "@/components/DashboardBreadcrumb.tsx";


const breadcrumb =

    <BreadcrumbItem>
        <BreadcrumbPage>
            Trainers
        </BreadcrumbPage>
    </BreadcrumbItem>


export default function AllTrainers() {
    const {data: trainers, isLoading, isError} = useQuery({
        queryKey: ['trainers'],
        queryFn: () => getApprovedTrainers(),
        select: (data) => data?.data
    })

    console.log(trainers)

    if (isLoading) {
        return <LoadingState/>
    }
    if (isError) {
        return <ErrorState/>
    }


    return (
        <>
            <DashboardBreadcrumb breadcrumb={breadcrumb}/>
            <TrainersListTable data={trainers}/>
        </>
    )
}
