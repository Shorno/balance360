import React, {useState, useEffect} from "react"
import {motion, AnimatePresence} from "framer-motion"
import {cn} from "@/lib/utils"

interface Feature {
    step: string
    title?: string
    content: string
    image: string
    icon: React.ElementType
}

interface FeatureStepsProps {
    features: Feature[]
    className?: string
    title?: string
    autoPlayInterval?: number
}

export function FeatureSteps({
                                 features,
                                 className,
                                 title = "Transform Your Fitness Journey",
                                 autoPlayInterval = 5000,
                             }: FeatureStepsProps) {
    const [currentFeature, setCurrentFeature] = useState(0)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            if (progress < 98) {
                setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
            } else {
                setCurrentFeature((prev) => (prev + 1) % features.length)
                setProgress(0)
            }
        }, 100)

        return () => clearInterval(timer)
    }, [progress, features.length, autoPlayInterval])

    return (
        <div className={cn("py-16 bg-gray-900", className)}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center text-white">
                    {title}
                </h2>

                <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12">
                    <div className="order-2 md:order-1 space-y-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className={cn(
                                    "flex items-start gap-6 p-6 rounded-lg border transition-all duration-200",
                                    index === currentFeature
                                        ? "border-purple-500 bg-gray-800"
                                        : "border-gray-700 bg-gray-800/50"
                                )}
                                initial={{opacity: 0.3, y: 20}}
                                animate={{
                                    opacity: index === currentFeature ? 1 : 0.7,
                                    y: 0,
                                    scale: index === currentFeature ? 1.03 : 1
                                }}
                                transition={{duration: 0.3, ease: "easeInOut"}}
                            >
                                <div className={cn(
                                    "w-12 h-12 rounded-full flex items-center justify-center",
                                    index === currentFeature ? "bg-purple-500 text-white" : "bg-gray-700 text-gray-300"
                                )}>
                                    {React.createElement(feature.icon, {size: 24})}
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                                        {feature.title || feature.step}
                                    </h3>
                                    <p className="text-sm md:text-base text-gray-300">
                                        {feature.content}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="order-1 md:order-2 relative overflow-hidden rounded-lg">
                        <div className="h-[500px] md:h-full">
                            <AnimatePresence mode="wait">
                                {features.map(
                                    (feature, index) =>
                                        index === currentFeature && (
                                            <motion.div
                                                key={index}
                                                className="absolute inset-0 rounded-lg overflow-hidden"
                                                initial={{opacity: 0, scale: 1.05}}
                                                animate={{opacity: 1, scale: 1}}
                                                exit={{opacity: 0, scale: 1.05}}
                                                transition={{duration: 0.3, ease: "easeInOut"}}
                                            >
                                                <img
                                                    src={feature.image}
                                                    alt={feature.title || feature.step}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div
                                                    className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"/>
                                            </motion.div>
                                        )
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

