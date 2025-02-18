import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/sidebar/app-sidebar.tsx";
import {Outlet} from "react-router";
export default function DashboardLayout() {
    return (
        <>
            <SidebarProvider defaultOpen={true}>
                <AppSidebar/>
                <SidebarInset>
                    <div className="flex flex-1 flex-col dark:bg-gray-900/50">
                        <Outlet/>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}