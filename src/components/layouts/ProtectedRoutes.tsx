import useAuthStore from "@/store/authStore.ts";
import {Navigate, Outlet, useLocation} from "react-router";

export default function ProtectedRoutes() {
    const location = useLocation();
    const {currentUser, authLoading} = useAuthStore();


    if (authLoading) {
        return <div>Loading</div>;
    }


    return currentUser ? <Outlet/> : <Navigate to="/login" state={{from: location}} replace/>;

}