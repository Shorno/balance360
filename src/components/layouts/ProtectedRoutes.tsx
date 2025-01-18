import useAuthStore from "@/store/authStore.ts";
import {Navigate, Outlet, useLocation} from "react-router";
import {LoadingState} from "@/components/data-states/loading-state.tsx";

export default function ProtectedRoutes() {
    const location = useLocation();
    const {currentUser, authLoading} = useAuthStore();


    if (authLoading) {
        return <div className={"flex min-h-screen justify-center items-center"}>
            <LoadingState/>
        </div>
    }


    return currentUser ? <Outlet/> : <Navigate to="/login" state={{from: location}} replace/>;

}