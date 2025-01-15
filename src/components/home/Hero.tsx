import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image1 from "@/assets/img1.jpg";
import Image2 from "@/assets/img2.jpg";
import Image3 from "@/assets/img3.jpg";
import Image4 from "@/assets/img4.jpg";
import Image5 from "@/assets/img5.jpg";
import {Link} from "react-router";


const images = [
    Image1,
    Image2,
    Image3,
    Image4,
    Image5
]
const slideVariants = {
    initial: { opacity: 0, scale: 1.1 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.5 } },
}

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [areImagesLoaded, setAreImagesLoaded] = useState(false)
    const [loadedImages, setLoadedImages] = useState<string[]>([])

    useEffect(() => {
        const loadImages = async () => {
            const promises = images.map((src) => {
                return new Promise((resolve, reject) => {
                    const img = new Image()
                    img.src = src
                    img.onload = () => resolve(src)
                    img.onerror = reject
                })
            })

            try {
                const loadedSrcs = await Promise.all(promises)
                setLoadedImages(loadedSrcs as string[])
                setAreImagesLoaded(true)
            } catch (error) {
                console.error('Failed to load images:', error)
            }
        }
        loadImages()
    }, [])

    useEffect(() => {
        if (areImagesLoaded) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
            }, 5000)

            return () => clearInterval(interval)
        }
    }, [areImagesLoaded])

    return (
        <div className="relative flex-grow min-h-[70dvh] flex items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    perspective: "1000px",
                }}
            >
                {areImagesLoaded && (
                    <AnimatePresence initial={false}>
                        <motion.img
                            key={currentIndex}
                            src={loadedImages[currentIndex]}
                            initial="initial"
                            animate="visible"
                            exit="exit"
                            variants={slideVariants}
                            className="absolute inset-0 h-full w-full object-cover object-center"
                        />
                    </AnimatePresence>
                )}
                <div className="absolute inset-0 bg-black/60 z-10" />
            </div>

            <div className="relative z-20 w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
                >
                    Revolutionize Your Fitness Journey
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-4 text-xl sm:text-2xl text-gray-200"
                >
                    Track, Achieve, and Transform with Our Cutting-Edge Platform
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-8"
                >
                    <Link
                        to="/classes"
                        className="inline-block px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-pink-600 rounded-full hover:from-purple-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
                    >
                        Explore Classes
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}

