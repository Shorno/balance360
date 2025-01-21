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
import TrainerApplications from "@/pages/Dashboard/Admin/TrainerApplications.tsx";
import TrainerApplicationDetailsPage from "@/pages/Dashboard/Admin/TrainerApplicationDetailsPage.tsx";
import AllTrainers from "@/pages/Dashboard/Admin/AllTrainers.tsx";
import ActivityLogPage from "@/pages/Dashboard/Member/ActivityLogPage.tsx";
import ProfilePage from "@/pages/Dashboard/Member/ProfilePage.tsx";
import AddNewSlotPage from "@/pages/Trainer/AddNewSlotPage.tsx";
import AddClassPage from "@/pages/Dashboard/Admin/AddClassPage.tsx";
import ManageSlot from "@/pages/Trainer/ManageSlot.tsx";
import DashboardLayout from "@/components/layouts/DashboardLayout.tsx";
import {DashboardRedirect} from "@/components/layouts/Routes/DashboardRedirect.tsx";
import AllClassesPage from "@/pages/AllClassesPage.tsx";
import {Role} from "@/types";
import {RoleProtectedRoute} from "@/components/layouts/Routes/RoleProtectedRoutes.tsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route element={<MainLayout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="/trainers" element={<AllTrainersPage/>}/>
                        <Route path="/trainers/:id" element={<TrainerDetailsPage/>}/>
                        <Route path="/become-a-trainer" element={<BecomeATrainerPage/>}/>
                        <Route path="/classes" element={<AllClassesPage/>}/>
                    </Route>

                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/signup" element={<SignupPage/>}/>

                    <Route element={<ProtectedRoutes/>}>
                        <Route element={<DashboardLayout/>}>
                            <Route path="/dashboard">
                                <Route index element={<DashboardRedirect/>}/>

                                {/* Admin Routes */}
                                <Route element={<RoleProtectedRoute allowedRoles={[Role.Admin]}/>}>
                                    <Route path="admin">
                                        <Route path="trainers" element={<AllTrainers/>}/>
                                        <Route path="trainers/applications" element={<TrainerApplications/>}/>
                                        <Route path="trainers/applications/:_id"
                                               element={<TrainerApplicationDetailsPage/>}/>
                                        <Route path="add-class" element={<AddClassPage/>}/>
                                        <Route path="balance" element={<div>Balance Page</div>}/>
                                        <Route path="newsletter-subscribers"
                                               element={<div>Newsletter Subscribers</div>}/>
                                        <Route path="add-forum" element={<div>Add Forum</div>}/>
                                    </Route>
                                </Route>

                                {/* Trainer Routes */}
                                <Route element={<RoleProtectedRoute allowedRoles={[Role.Trainer]}/>}>
                                    <Route path="trainer">
                                        <Route path="slots" element={<ManageSlot/>}/>
                                        <Route path="slots/new-slot" element={<AddNewSlotPage/>}/>
                                        <Route path="add-forum" element={<div>Add Forum</div>}/>
                                    </Route>
                                </Route>

                                {/* Member Routes */}
                                <Route element={<RoleProtectedRoute allowedRoles={[Role.Member]}/>}>
                                    <Route path="member">
                                        <Route path="profile" element={<ProfilePage/>}/>
                                        <Route path="activity-log" element={<ActivityLogPage/>}/>
                                        <Route path="booked-trainers" element={<div>Booked Trainers</div>}/>
                                    </Route>
                                </Route>
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
            <Toaster position={"top-center"}/>
        </>
    )
}

export default App