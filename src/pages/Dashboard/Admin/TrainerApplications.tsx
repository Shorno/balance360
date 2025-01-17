import {useQuery} from "@tanstack/react-query";
import {getTrainerApplications} from "@/api/admin.ts";
import DashboardBreadcrumb from "@/components/DashboardBreadcrumb.tsx";
import {BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator} from "@/components/ui/breadcrumb.tsx";
import {Link} from "react-router";
import {ApplicationListTable} from "@/components/ApplicationListTable.tsx";
import {LoadingState} from "@/components/data-states/loading-state.tsx";
import {ErrorState} from "@/components/data-states/error-state.tsx";

const breadcrumb = <>
    <BreadcrumbItem>
        <Link to={"/trainers"}>
            <BreadcrumbLink>
                Trainers
            </BreadcrumbLink>
        </Link>
    </BreadcrumbItem>
    <BreadcrumbSeparator/>
    <BreadcrumbPage>
        Trainer Applications
    </BreadcrumbPage></>

export default function TrainerApplications() {
    const {data: applications, isError, isLoading} = useQuery({
        queryKey: ['trainerApplications'],
        queryFn: getTrainerApplications,
        select: (data) => data.data
    })
    console.log(applications)

    if (isLoading) {
        return <LoadingState/>
    }
    if (isError) {
        return <ErrorState/>
    }

    return (
        <>
            <DashboardBreadcrumb breadcrumb={breadcrumb}/>

            <ApplicationListTable data={applications}/>
        </>
    )
}