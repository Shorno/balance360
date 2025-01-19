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
import TrainerApplications from "@/pages/Dashboard/Admin/TrainerApplications.tsx";
import TrainerApplicationDetailsPage from "@/pages/Dashboard/Admin/TrainerApplicationDetailsPage.tsx";
import AllTrainers from "@/pages/Dashboard/Admin/AllTrainers.tsx";
import ActivityLogPage from "@/pages/Dashboard/Member/ActivityLogPage.tsx";
import ProfilePage from "@/pages/Dashboard/Member/ProfilePage.tsx";
import AddNewSlotPage from "@/pages/Dashboard/Member/AddNewSlotPage.tsx";
import AddClassPage from "@/pages/Dashboard/Admin/AddClassPage.tsx";

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

                 <Route element={<ProtectedRoutes/>}>
                     <Route element={<AdminLayout/>}>
                         <Route path="/dashboard">
                             <Route index path={"trainers"} element={<AllTrainers/>}/>
                             <Route path="trainers/applications"  element={<TrainerApplications/>}/>
                             <Route path="trainers/applications/:_id" element={<TrainerApplicationDetailsPage/>}/>
                             <Route path="add-class" element={<AddClassPage/>}/>

                             <Route path="activity-log" element={<ActivityLogPage/>}/>
                             <Route path="profile" element={<ProfilePage/>}/>


                             <Route path="slots/new-slot" element={<AddNewSlotPage/>}/>


                         </Route>
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
