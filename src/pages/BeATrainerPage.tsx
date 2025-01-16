import {motion} from "framer-motion"
import BecomeATrainerForm from "@/components/BeATrainerForm.tsx";


export default function BecomeATrainerPage() {


    return (
        <div className="bg-gray-900 min-h-screen flex justify-center items-center pt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >

                    <BecomeATrainerForm/>
                </motion.div>
            </div>
        </div>
    )
}

