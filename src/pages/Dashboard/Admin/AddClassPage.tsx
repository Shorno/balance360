import AddNewClassForm from "@/components/AddClassForm.tsx";
import {BreadcrumbItem, BreadcrumbPage} from "@/components/ui/breadcrumb.tsx";
import DashboardBreadcrumb from "@/components/DashboardBreadcrumb.tsx";
import useDynamicTitle from "@/hooks/useDynamicTitle.tsx";


const breadcrumb =

    <BreadcrumbItem>
        <BreadcrumbPage>
            Add Class
        </BreadcrumbPage>
    </BreadcrumbItem>


export default function AddClassPage() {
    useDynamicTitle("Dashboard")
    return (

        <>
            <DashboardBreadcrumb breadcrumb={breadcrumb}/>
            <AddNewClassForm/>
        </>
    )
}