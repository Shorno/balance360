import TrainerApplicationDetails from "@/components/TrainerApplicationDetails.tsx";
import {Link, useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {getTrainerApplicationDetails} from "@/api/admin.ts";
import {LoadingState} from "@/components/data-states/loading-state.tsx";
import {ErrorState} from "@/components/data-states/error-state.tsx";
import {BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator} from "@/components/ui/breadcrumb.tsx";
import DashboardBreadcrumb from "@/components/DashboardBreadcrumb.tsx";
import useDynamicTitle from "@/hooks/useDynamicTitle.tsx";


const breadcrumb = <>
    <BreadcrumbItem>
        <Link to={"/dashboard/trainers"}>
            <BreadcrumbLink>
                Trainers
            </BreadcrumbLink>
        </Link>
    </BreadcrumbItem>
    <BreadcrumbSeparator/>
    <BreadcrumbItem>
        <Link to={"/dashboard/admin/trainers/applications"}>
            <BreadcrumbLink>
                Applications
            </BreadcrumbLink>
        </Link>
    </BreadcrumbItem>
    <BreadcrumbSeparator/>
    <BreadcrumbPage>
        Application Details
    </BreadcrumbPage></>

export default function TrainerApplicationDetailsPage() {
    useDynamicTitle("Dashboard")

    const {_id} = useParams();
    console.log("id", _id)
    const {data: applicationDetails, isLoading, isError} = useQuery({
        queryKey: ['trainerApplication', _id],
        queryFn: () => getTrainerApplicationDetails(_id || ""),
        enabled: !!_id,
        select: (data) => data?.data
    })

    if (isError) {
        return <ErrorState/>
    }


    return (
        <>
            <DashboardBreadcrumb breadcrumb={breadcrumb}/>

            {
                isLoading ? <LoadingState className={"mt-32"}/> : <TrainerApplicationDetails
                    application={applicationDetails}
                />
            }

        </>
    )
}