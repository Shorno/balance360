import {useQuery} from "@tanstack/react-query";
import {getTrainerApplications} from "@/api/admin.ts";
import DashboardBreadcrumb from "@/components/DashboardBreadcrumb.tsx";
import {BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator} from "@/components/ui/breadcrumb.tsx";
import {Link} from "react-router";
import {ApplicationListTable} from "@/components/ApplicationListTable.tsx";

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
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error</div>
    }

    return (
        <>
            <DashboardBreadcrumb breadcrumb={breadcrumb}/>

            <ApplicationListTable data={applications}/>
        </>
    )
}