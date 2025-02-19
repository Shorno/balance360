import AddNewSlotForm from "@/components/AddNewSlotFrom.tsx";
import DashboardBreadcrumb from "@/components/DashboardBreadcrumb.tsx";
import {BreadcrumbItem, BreadcrumbPage} from "@/components/ui/breadcrumb.tsx";

const breadcrumb =

    <BreadcrumbItem>
        <BreadcrumbPage>
            New Slot
        </BreadcrumbPage>
    </BreadcrumbItem>

export default function AddNewSlotPage() {
    return (
        <>
            <DashboardBreadcrumb breadcrumb={breadcrumb}/>
            <AddNewSlotForm/>
        </>
    )
}