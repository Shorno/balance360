import {
    type LucideIcon,
} from "lucide-react"


import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar.tsx"
import {Link, useLocation} from "react-router";

export function NavSingle({
                              navSingle
                          }: {
    navSingle: {
        name: string
        url: string
        icon: LucideIcon
    }[]
}) {
    const location = useLocation()
    const {setOpenMobile} = useSidebar();


    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarMenu>
                {navSingle.map((item) => (
                    <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                            onClick={() => setOpenMobile(false)}
                            asChild
                            isActive={location.pathname === item.url}
                        >
                            <Link to={item.url}>
                                <item.icon/>
                                <span>{item.name}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
