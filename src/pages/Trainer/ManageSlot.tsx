import DashboardBreadcrumb from "@/components/DashboardBreadcrumb.tsx";
import {BreadcrumbItem, BreadcrumbPage} from "@/components/ui/breadcrumb.tsx";

const breadcrumb =

    <BreadcrumbItem>
        <BreadcrumbPage>
            Slots
        </BreadcrumbPage>
    </BreadcrumbItem>

export default function ManageSlot() {
    return (
        <>
            <DashboardBreadcrumb breadcrumb={breadcrumb}/>
            Manage Slot
        </>
    )
}