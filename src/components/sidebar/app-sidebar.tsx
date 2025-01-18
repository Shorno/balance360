import {
    ActivityIcon,
    CreditCard, FilePlusIcon, FileUser,
    GalleryVerticalEnd,
    ListOrderedIcon, ListPlusIcon,
    NewspaperIcon, UserIcon,
    UsersIcon,
} from "lucide-react"

import {NavUser} from "@/components/sidebar/nav-user.tsx"
import {TeamSwitcher} from "@/components/sidebar/team-switcher.tsx"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar.tsx"
import {NavSingle} from "@/components/sidebar/nav-single.tsx";
import useAuthStore from "@/store/authStore.ts";
import {Role} from "@/types";
import {useUserRole} from "@/hooks/useUserRole.ts";


const navigationConfig = {
    admin: {
        team: {
            name: "Balance360",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        navSingle: [
            {
                name: "Trainers",
                url: "/dashboard/trainers",
                icon: UsersIcon,
            },
            {
                name: "Applied Trainers",
                url: "/dashboard/trainers/applications",
                icon: FileUser
            },
            {
                name: "Balance",
                url: "/dashboard/balance",
                icon: CreditCard
            },
            {
                name: "Add New Class",
                url: "/dashboard/add-class",
                icon: FilePlusIcon
            },
            {
                name: "Newsletter Subscribers",
                url: "/dashboard/newsletter-subscribers",
                icon: NewspaperIcon
            },
            {
                name: "Add Forum",
                url: "/dashboard/add-forum",
                icon: ListPlusIcon
            },
        ],
    },
    trainer: {
        team: {
            name: "X Book Store",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        navSingle: [
            {
                name: "Manage Slots",
                url: "/dashboard/slots",
                icon: ListOrderedIcon
            },
            {
                name: "Add New Slot",
                url: "/dashboard/slots/new-slot",
                icon: FilePlusIcon
            },
            {
                name: "Add Forum",
                url: "/dashboard/add-forum",
                icon: ListPlusIcon
            },
        ],
    },
    member: {
        team: {
            name: "Balance360",
            logo: GalleryVerticalEnd,
            plan: "Basic",
        },
        navSingle: [
            {
                name: "Activity Log",
                url: "/dashboard/activity-log",
                icon: ActivityIcon
            },
            {
                name: "Profile",
                url: "/dashboard/profile",
                icon: UserIcon
            },
            {
                name: "Booked Trainers",
                url: "/dashboard/booked-trainers",
                icon: ListOrderedIcon
            },
        ],
    }
}

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    const {currentUser} = useAuthStore()
    const role: Role = useUserRole()

    const getNavigation = (role: Role) => {
        switch (role) {
            case Role.Admin:
                return navigationConfig.admin
            case Role.Trainer:
                return navigationConfig.trainer
            case Role.Member:
                return navigationConfig.member
            default:
                return navigationConfig.member
        }
    }


    const links = getNavigation(role)

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                    <TeamSwitcher team={links.team}/>
            </SidebarHeader>
            <SidebarContent>
                 <NavSingle navSingle={links.navSingle}/>
            </SidebarContent>
            <SidebarFooter>
                    <NavUser currentUser={currentUser}/>
            </SidebarFooter>
        </Sidebar>
    )
}
