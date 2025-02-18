import {SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {Separator} from "@radix-ui/react-separator";
import {
    Breadcrumb, BreadcrumbList,
} from "@/components/ui/breadcrumb.tsx";
import {ReactNode} from "react";

export default function DashboardBreadcrumb({breadcrumb}: { breadcrumb?: ReactNode}) {
    return (
        <header
            className="flex fixed w-full z-50  bg-[#fafafa]  dark:bg-[#18181b] h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b  dark:border-b-gray-600">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1"/>
                <Separator orientation="vertical" className="mr-2 h-4"/>
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumb}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>

    )
}