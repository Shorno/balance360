import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/sidebar/app-sidebar.tsx";
import {Outlet} from "react-router";
export default function AdminLayout() {

    return (
        <>
            <SidebarProvider defaultOpen={true}>
                <AppSidebar/>
                <SidebarInset className={"bg-gray-900"}>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        <Outlet/>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}