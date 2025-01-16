import {
    BookIcon,
    GalleryVerticalEnd,
    LayoutDashboardIcon,
    ListOrderedIcon,
    LogsIcon,
    LucideListOrdered,
    Settings2,
    UsersIcon,
} from "lucide-react"

import {NavMain} from "@/components/sidebar/nav-main.tsx"
import {NavUser} from "@/components/sidebar/nav-user.tsx"
import {TeamSwitcher} from "@/components/sidebar/team-switcher.tsx"
import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail,} from "@/components/ui/sidebar.tsx"
import {NavSingle} from "@/components/sidebar/nav-single.tsx";
import useAuthStore from "@/store/authStore.ts";
import {useUserRole} from "@/hooks/useUserRole.tsx";
import {Role} from "@/types";

const adminNav = {
    team: {
        name: "X Book Store",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
    },
    navSingle: [
        {
            name: "Dashboard",
            url: "",
            icon: LayoutDashboardIcon,
        },
        {
            name: "Users",
            url: "/admin/users",
            icon: UsersIcon,
        },
        {
            name: "Books",
            url: "/admin/books",
            icon: BookIcon
        },
        {
            name: "Orders",
            url: "/admin/orders",
            icon: LucideListOrdered
        },
    ],
    navWithSub: [
        {
            title: "Management",
            url: "#",
            icon: LogsIcon,
            isActive: true,
            items: [
                {
                    title: "Add Book",
                    url: "/admin/add-book",
                },
                {
                    title: "Applications",
                    url: "admin/applications",
                },
                {
                    title: "Statistics",
                    url: "admin/statistics",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },

                {
                    title: "Billing",
                    url: "#",
                },
            ],
        },
    ],
}

const trainerNav = {
    team: {
        name: "X Book Store",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
    },
    navSingle: [
        {
            name: "Dashboard",
            url: "",
            icon: LayoutDashboardIcon,
        },
        {
            name: "Books",
            url: "/admin/books",
            icon: BookIcon
        },
        {
            name: "Orders",
            url: "/admin/orders",
            icon: ListOrderedIcon
        },

    ],
    navWithSub: [
        {
            title: "Management",
            url: "#",
            icon: LogsIcon,
            isActive: true,
            items: [
                {
                    title: "Statistics",
                    url: "admin/statistics",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },

                {
                    title: "Billing",
                    url: "#",
                },
            ],
        },
    ],
}


export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    const {currentUser} = useAuthStore()
    const role: Role = useUserRole()
    const isAdmin = role === Role.Admin
    const links = (isAdmin ? adminNav : trainerNav)


    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher team={links.team}/>
            </SidebarHeader>
            <SidebarContent>
                <NavSingle navSingle={links.navSingle}/>
                <NavMain items={links.navWithSub}/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser currentUser={currentUser!}/>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}
