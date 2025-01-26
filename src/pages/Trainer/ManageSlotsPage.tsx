import DashboardBreadcrumb from "@/components/DashboardBreadcrumb.tsx";
import {BreadcrumbItem, BreadcrumbPage} from "@/components/ui/breadcrumb.tsx";
import ManageSlots from "@/pages/Trainer/ManageSlots.tsx";


const breadcrumb =
    <BreadcrumbItem>
        <BreadcrumbPage>
            Slots
        </BreadcrumbPage>
    </BreadcrumbItem>


export default function ManageSlotsPage() {


    return (
        <>
            <DashboardBreadcrumb breadcrumb={breadcrumb}/>
            <ManageSlots/>
        </>
    )
}