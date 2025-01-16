import {
    type LucideIcon,
} from "lucide-react"


import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar.tsx"
import {Link} from "react-router";

export function NavSingle({
                              navSingle
                          }: {
    navSingle: {
        name: string
        url: string
        icon: LucideIcon
    }[]
}) {

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarMenu>
                {navSingle.map((item) => (
                    <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild>
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
