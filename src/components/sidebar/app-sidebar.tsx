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
    SidebarMenuSkeleton,
} from "@/components/ui/sidebar.tsx"
import {NavSingle} from "@/components/sidebar/nav-single.tsx";
import useAuthStore from "@/store/authStore.ts";
import {Role} from "@/types";
import {useUserRole} from "@/hooks/useUserRole.ts";
import {useMemo} from "react";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Link} from "react-router";


const navigationConfig = {
    admin: {
        navSingle: [
            {
                name: "Trainers",
                url: "/dashboard/admin/trainers",
                icon: UsersIcon,
            },
            {
                name: "Applied Trainers",
                url: "/dashboard/admin/trainers/applications",
                icon: FileUser
            },
            {
                name: "Balance",
                url: "/dashboard/admin/balance",
                icon: CreditCard
            },
            {
                name: "Add New Class",
                url: "/dashboard/admin/add-class",
                icon: FilePlusIcon
            },
            {
                name: "Newsletter Subscribers",
                url: "/dashboard/admin/newsletter-subscribers",
                icon: NewspaperIcon
            },
            {
                name: "Add Forum",
                url: "/dashboard/admin/add-forum",
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
                url: "/dashboard/trainer/slots",
                icon: ListOrderedIcon
            },
            {
                name: "Add New Slot",
                url: "/dashboard/trainer/slots/new-slot",
                icon: FilePlusIcon
            },
            {
                name: "Add Forum",
                url: "/dashboard/trainer/add-forum",
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
                url: "/dashboard/member/activity-log",
                icon: ActivityIcon
            },
            {
                name: "Profile",
                url: "/dashboard/member/profile",
                icon: UserIcon
            },
            {
                name: "Booked Trainers",
                url: "/dashboard/member/booked-trainers",
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

    //adjust skeleton number and size
    const renderSkeletons = useMemo(() => {
        const maxLinks = Math.max(
            navigationConfig.admin.navSingle.length,
            navigationConfig.trainer.navSingle.length,
            navigationConfig.member.navSingle.length
        );

        return Array(maxLinks).fill(0).map((_, index) => (
            <div className={"flex flex-col my-1.5 pt-1"}>
                <SidebarMenuSkeleton key={index} showIcon={true}/>
            </div>
        ));
    }, []);

    const links = getNavigation(role)

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <Link to={"/"}>
                    {!role ? (
                        <div className={"flex mb-2"}>
                            <Skeleton className="h-8 w-8 rounded-lg mt-3"/>
                            <div className="flex flex-col ml-2 mt-4 gap-2">
                                <Skeleton className="h-3 w-24"/>
                                <Skeleton className="h-2 w-16"/>
                            </div>
                        </div>
                    ) : (
                        <TeamSwitcher/>
                    )}
                </Link>
            </SidebarHeader>

            <SidebarContent>
                {!role ? renderSkeletons : <NavSingle navSingle={links.navSingle}/>}
            </SidebarContent>

            <SidebarFooter>
                {!role || !currentUser ? (
                    <div className="flex items-center space-x-4 ml-1">
                        <Skeleton className="h-10 w-10 rounded-full"/>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[100px]"/>
                            <Skeleton className="h-3 w-[60px]"/>
                        </div>
                    </div>
                ) : (
                    <NavUser currentUser={currentUser}/>
                )}
            </SidebarFooter>
        </Sidebar>
    )
}
