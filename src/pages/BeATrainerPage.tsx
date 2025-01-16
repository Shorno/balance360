import {motion} from "framer-motion"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
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
                    <Card className="bg-gray-800 text-white">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-center">Become a Trainer</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <BecomeATrainerForm/>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}

