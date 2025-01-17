import { Dumbbell } from 'lucide-react'
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface LoadingStateProps {
    className?: string
    message?: string
}

export function LoadingState({ className, message = "Loading..." }: LoadingStateProps) {
    return (
        <motion.div
            className={cn(
                "flex flex-col items-center justify-center min-h-[200px] w-full",
                className
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="relative">
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Dumbbell className="w-12 h-12 text-purple-400" />
                </motion.div>
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
            <div className="mt-4 flex flex-col items-center gap-2">
                <div className="h-1 w-24 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full w-1/2 bg-gradient-to-r from-purple-500 to-pink-500"
                        initial={{ x: "-100%" }}
                        animate={{ x: "200%" }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>
                <motion.p
                    className="text-gray-400"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    {message}
                </motion.p>
            </div>
        </motion.div>
    )
}