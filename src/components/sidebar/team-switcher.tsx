import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar.tsx"
import logo from "@/assets/default-monochrome-white.svg";

export function TeamSwitcher() {

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex justify-start items-center"
                >
                    <img
                        className={"size-24 object-center"}
                        src={logo}
                        alt={"logo"}
                    />
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
