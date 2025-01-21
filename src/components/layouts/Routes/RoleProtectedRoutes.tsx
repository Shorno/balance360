import {Navigate, Outlet} from 'react-router'

import useAuthStore from "@/store/authStore.ts";
import {LoadingState} from "@/components/data-states/loading-state.tsx";
import {useUserRole} from "@/hooks/useUserRole.ts";
import {Role} from "@/types";

export const RoleProtectedRoute = ({allowedRoles}: { allowedRoles: string[] }) => {
    const {currentUser, authLoading} = useAuthStore()
    const role: Role = useUserRole()

    if (authLoading || !role) {
        return (
            <div className="flex min-h-screen justify-center items-center">
                <LoadingState/>
            </div>
        )
    }

    if (!currentUser) {
        return <Navigate to="/login" replace/>
    }

    return allowedRoles.includes(role) ? (
        <Outlet/>
    ) : (
        <Navigate to="/login" replace/>
    )
}