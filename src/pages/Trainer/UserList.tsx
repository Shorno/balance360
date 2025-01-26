import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";

interface UserDetails {
    _id: string;
    displayName: string;
    email: string;
    photoURL?: string;
}

export default function UserList({ users }: { users: UserDetails[] }) {
    return (
        <TooltipProvider>
            <div className="flex flex-wrap gap-2">
                {users.slice(0, 5).map((user) => (
                    <Tooltip key={user._id}>
                        <TooltipTrigger asChild>
                                <Avatar className="w-10 h-10 cursor-pointer hover:ring-2 hover:ring-purple-400 transition-all">
                                    <AvatarImage
                                        src={user.photoURL}
                                        alt={user.displayName}
                                    />
                                    <AvatarFallback>
                                        {user.displayName?.charAt(0) || user.email.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                        </TooltipTrigger>
                        <TooltipContent
                            className="bg-gray-800 border border-gray-600/50 rounded-md p-2 z-50"
                            side="bottom"
                        >
                            <div className="text-center space-y-1">
                                <h4 className="text-sm font-medium text-white">
                                    {user.displayName}
                                </h4>
                                <p className="text-xs text-gray-400">{user.email}</p>
                            </div>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </div>
        </TooltipProvider>
    );
}