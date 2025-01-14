import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import useAuthStore from "@/store/authStore.ts";
import {UserIcon} from "lucide-react";
import {Link} from "react-router";

export default function AuthUserProfile() {
    const {currentUser} = useAuthStore()

    return (
        <>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                        <Avatar className="size-8">
                            <AvatarImage
                                src={currentUser?.photoURL || undefined}
                                alt={currentUser?.displayName || undefined}
                            />
                            <AvatarFallback>
                                <UserIcon/>
                            </AvatarFallback>
                        </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" forceMount>
                    {currentUser ? (
                        <>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {currentUser.displayName || 'User'}
                                    </p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {currentUser.email || ''}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Dashboard
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Settings
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator/>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </>
                    ) : (
                        <>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Link to="/login">Login</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link to="/signup">Signup</Link>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

        </>
    )
}
