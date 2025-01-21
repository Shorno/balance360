import {Navigate} from 'react-router'
import {useUserRole} from "@/hooks/useUserRole.ts";
import {Role} from "@/types";

export const DashboardRedirect = () => {
    const role: Role = useUserRole()
    switch (role) {
        case 'admin':
            return <Navigate to="/dashboard/admin/trainers"/>
        case 'trainer':
            return <Navigate to="/dashboard/trainer/slots"/>
        case 'member':
            return <Navigate to="/dashboard/member/profile"/>
        default:
            return <Navigate to="/"/>
    }
}