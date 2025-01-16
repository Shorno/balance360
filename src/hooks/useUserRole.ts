import {useQuery} from "@tanstack/react-query";
import useAuthStore from "@/store/authStore.ts";
import {getRoleByEmail} from "@/api/user.ts";

export function useUserRole() {
    const {currentUser} = useAuthStore()
    const email = currentUser?.email;
    const {data :role} = useQuery({
        queryKey: ["userRole", email],
        queryFn: () => getRoleByEmail(email || ''),
        enabled: !!email,
        select : (data) => data?.role

    })
    return role
}