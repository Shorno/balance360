import {BrowserRouter, Route, Routes} from "react-router"
import {Toaster} from "react-hot-toast";
import MainLayout from "@/components/layouts/MainLayout.tsx";
import Home from "@/pages/Home.tsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout/>}>
                        <Route index element={<Home/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
            <Toaster position={"top-center"}/>
        </>
    )
}

export default App
