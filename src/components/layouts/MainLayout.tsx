import {Outlet} from "react-router";
import Navbar from "@/components/Navbar.tsx";
import Footer from "@/components/Footer.tsx";

export default function MainLayout() {
    return (
        <>
            <div className={"flex flex-col min-h-screen"}>
                <Navbar/>
                <div className={"bg-gray-900"}>
                    <Outlet/>
                </div>
                <Footer/>
            </div>
        </>
    )
}