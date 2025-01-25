import DashboardBreadcrumb from "@/components/DashboardBreadcrumb.tsx";
import {BreadcrumbItem, BreadcrumbPage} from "@/components/ui/breadcrumb.tsx";
import ManageSlots from "@/pages/Trainer/ManageSlots.tsx";
import {useQuery} from "@tanstack/react-query";
import {getTrainerSlots} from "@/api/trainer.ts";
import {Slot} from "@/components/TimeSlots.tsx";
import useAuthStore from "@/store/authStore.ts";

const breadcrumb =
    <BreadcrumbItem>
        <BreadcrumbPage>
            Slots
        </BreadcrumbPage>
    </BreadcrumbItem>

export default function ManageSlot() {
    const {currentUser} = useAuthStore()
    const {data: slotsList} = useQuery<Slot[]>({
        queryKey: ["slots", currentUser?.email],
        queryFn: () => getTrainerSlots(currentUser?.email || ""),
        enabled: !!currentUser?.email,
    })

    console.log(slotsList)

    return (
        <>
            <DashboardBreadcrumb breadcrumb={breadcrumb}/>
            <ManageSlots/>
        </>
    )
}