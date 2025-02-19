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
import AddNewSlotPage from "@/pages/Dashboard/Trainer/AddNewSlotPage.tsx";
import AddClassPage from "@/pages/Dashboard/Admin/AddClassPage.tsx";
import ManageSlotsPage from "@/pages/Dashboard/Trainer/ManageSlotsPage.tsx";
import DashboardLayout from "@/components/layouts/DashboardLayout.tsx";
import {DashboardRedirect} from "@/components/layouts/Routes/DashboardRedirect.tsx";
import AllClassesPage from "@/pages/AllClassesPage.tsx";
import {Role} from "@/types";
import {RoleProtectedRoute} from "@/components/layouts/Routes/RoleProtectedRoutes.tsx";
import TrainerBookingPage from "@/pages/TrainerBookingPage.tsx";
import PaymentPage from "@/pages/PaymentPage.tsx";
import AdminBalancePage from "@/pages/Dashboard/Admin/BalancePage.tsx";
import NewsLetterPage from "@/pages/Dashboard/Admin/NewsLetterPage.tsx";
import CreatePostForm from "@/pages/Dashboard/Admin/ForumForm.tsx";
import ForumPostsPage from "@/pages/ForumPostsPage.tsx";
import BookedTrainerPage from "@/pages/Dashboard/Member/BookedTrainerPage.tsx";
import ScrollToTop from "@/lib/ScrollToTop.tsx";
import NotFound from "@/pages/NotFound.tsx";
import MyProfilePage from "@/pages/MyProfilePage.tsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <ScrollToTop/>
                <Routes>
                    <Route element={<MainLayout/>}>
                        <Route index element={<Home/>}/>
                        <Route path="/trainers" element={<AllTrainersPage/>}/>
                        <Route path="/trainers/:_id" element={<TrainerDetailsPage/>}/>
                        <Route path="/classes" element={<AllClassesPage/>}/>
                        <Route path="/classes/:page?" element={<AllClassesPage/>}/>
                        <Route path="/community" element={<ForumPostsPage/>}/>
                        <Route path="/community/:page?" element={<ForumPostsPage/>}/>
                        <Route element={<ProtectedRoutes/>}>
                            <Route path="/become-a-trainer" element={<BecomeATrainerPage/>}/>
                            <Route path="/trainers/book-trainer" element={<TrainerBookingPage/>}/>
                            <Route path={"/trainers/book-trainer/payment"} element={<PaymentPage/>}/>
                            <Route path="/my-profile" element={<MyProfilePage/>}/>
                        </Route>
                    </Route>

                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/signup" element={<SignupPage/>}/>

                    <Route element={<ProtectedRoutes/>}>
                        <Route element={<DashboardLayout/>}>
                            <Route path="/dashboard">
                                <Route index element={<DashboardRedirect/>}/>

                                <Route element={<RoleProtectedRoute allowedRoles={[Role.Admin]}/>}>
                                    <Route path="admin">
                                        <Route path="trainers" element={<AllTrainers/>}/>
                                        <Route path="profile" element={<ProfilePage/>}/>
                                        <Route path="trainers/applications" element={<TrainerApplications/>}/>
                                        <Route path="trainers/applications/:_id"
                                               element={<TrainerApplicationDetailsPage/>}/>
                                        <Route path="add-class" element={<AddClassPage/>}/>
                                        <Route path="balance" element={<AdminBalancePage/>}/>
                                        <Route path="newsletter-subscribers"
                                               element={<NewsLetterPage/>}/>
                                        <Route path="add-forum" element={<CreatePostForm/>}/>
                                    </Route>
                                </Route>

                                <Route element={<RoleProtectedRoute allowedRoles={[Role.Trainer]}/>}>
                                    <Route path="trainer">
                                        <Route path="profile" element={<ProfilePage/>}/>
                                        <Route path="slots" element={<ManageSlotsPage/>}/>
                                        <Route path="slots/new-slot" element={<AddNewSlotPage/>}/>
                                        <Route path="add-forum" element={<CreatePostForm/>}/>
                                    </Route>
                                </Route>

                                <Route element={<RoleProtectedRoute allowedRoles={[Role.Member]}/>}>
                                    <Route path="member">
                                        <Route path="profile" element={<ProfilePage/>}/>
                                        <Route path="activity-log" element={<ActivityLogPage/>}/>
                                        <Route path="booked-trainers" element={<BookedTrainerPage/>}/>
                                    </Route>
                                </Route>
                            </Route>
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
            <Toaster position={"top-center"}/>
        </>
    )
}

export default App