import {BrowserRouter, Route, Routes} from "react-router"
import {Toaster} from "react-hot-toast";
import MainLayout from "@/components/layouts/MainLayout.tsx";
import Home from "@/pages/Home.tsx";
import SignupPage from "@/pages/auth/Signup.tsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout/>}>
                        <Route index element={<Home/>}/>
                    </Route>
                    <Route element={<SignupPage/>} path="/signup"/>
                </Routes>
            </BrowserRouter>
            <Toaster position={"top-center"}/>
        </>
    )
}

export default App
