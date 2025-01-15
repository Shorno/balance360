import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuthStore from "@/store/authStore";
import { UserIcon } from 'lucide-react';
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function AuthUserProfile() {
    const { currentUser, logout } = useAuthStore()

    if (!currentUser) {
        return (
            <>

                <Button asChild className="text-white bg-purple-500/70 hover:bg-purple-600">
                    <Link to="/login">Login</Link>
                </Button>
            </>

        )
    }

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Avatar className="size-8 cursor-pointer">
                    <AvatarImage
                        src={currentUser.photoURL || undefined}
                        alt={currentUser.displayName || undefined}
                    />
                    <AvatarFallback>
                        <UserIcon className="text-gray-300" />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" forceMount className="w-56 bg-black/90 backdrop-blur-md text-gray-300 border-purple-500/30">
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none text-white">
                            {currentUser.displayName || 'User'}
                        </p>
                        <p className="text-xs leading-none text-gray-400">
                            {currentUser.email || ''}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-purple-500/30" />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="hover:bg-purple-500/30 hover:text-white focus:bg-purple-500/30 focus:text-white">
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-purple-500/30 hover:text-white focus:bg-purple-500/30 focus:text-white">
                        Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-purple-500/30 hover:text-white focus:bg-purple-500/30 focus:text-white">
                        Settings
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-purple-500/30" />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="hover:bg-purple-500/30 hover:text-white focus:bg-purple-500/30 focus:text-white">
                        <button onClick={logout} className="w-full text-left">
                            Logout
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

