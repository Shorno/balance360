import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar.tsx"
import logo from "@/assets/default-monochrome-white.svg";
import logoLight from "@/assets/default-monochrome-black.svg";

export function TeamSwitcher() {

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex justify-start items-center"
                >
                    <img
                        className="size-8 object-center w-full dark:hidden"
                        src={logoLight}
                        alt="logo"
                    />
                    <img
                        className="size-8 object-center w-full hidden dark:block"
                        src={logo}
                        alt="logo"
                    />
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
