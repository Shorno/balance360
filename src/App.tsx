import {BrowserRouter, Route, Routes} from "react-router"
import {Toaster} from "react-hot-toast";
import MainLayout from "@/components/layouts/MainLayout.tsx";
import Home from "@/pages/Home.tsx";
import SignupPage from "@/pages/auth/Signup.tsx";
import LoginPage from "@/pages/auth/Login.tsx";
import AllTrainersPage from "@/pages/AllTrainersPage.tsx";
import TrainerDetailsPage from "@/pages/TrainerDetailsPage.tsx";
import BecomeATrainerPage from "@/pages/BeATrainerPage.tsx";
import ProtectedRoutes from "@/components/layouts/ProtectedRoutes.tsx";
import AdminLayout from "@/components/layouts/DashboardLayout.tsx";
import Dashboard from "@/pages/Dashboard/Dashboard.tsx";
import TrainerApplications from "@/pages/Dashboard/Admin/TrainerApplications.tsx";
import TrainerApplicationDetailsPage from "@/pages/Dashboard/Admin/TrainerApplicationDetailsPage.tsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout/>}>
                        <Route index element={<Home/>}/>
                        <Route element={<AllTrainersPage/>} path="/trainers"/>
                        <Route element={<TrainerDetailsPage/>} path="/trainers/details"/>
                        <Route element={<ProtectedRoutes/>}>
                            <Route element={<BecomeATrainerPage/>} path="/become-a-trainer"/>
                        </Route>
                    </Route>
                    <Route element={<AdminLayout/>}>
                        <Route path="/dashboard">
                            <Route index element={<Dashboard/>}/>
                            <Route path="trainers/applications"  element={<TrainerApplications/>}/>
                            <Route path="trainers/applications/:_id" element={<TrainerApplicationDetailsPage/>}/>
                        </Route>
                    </Route>

                    <Route element={<SignupPage/>} path="/signup"/>
                    <Route element={<LoginPage/>} path="/login"/>
                </Routes>
            </BrowserRouter>
            <Toaster position={"top-center"}/>
        </>
    )
}

export default App
