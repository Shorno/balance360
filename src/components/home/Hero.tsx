import { motion } from 'motion/react'

export default function Hero() {
    return (
        <div className="flex-grow min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-900 dark:to-black">
            <div className="w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 dark:from-blue-400 dark:to-teal-600"
                    >
                        Revolutionize Your Fitness Journey
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-4 text-xl sm:text-2xl text-gray-600 dark:text-gray-300"
                    >
                        Track, Achieve, and Transform with Our Cutting-Edge Platform
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-8"
                    >
                        <a
                            href="/classes"
                            className="inline-block px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-pink-600 rounded-full hover:from-purple-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:from-blue-500 dark:to-teal-600 dark:hover:from-blue-600 dark:hover:to-teal-700 dark:focus:ring-blue-500 transition-all duration-200"
                        >
                            Explore Classes
                        </a>
                    </motion.div>
                </div>
                <div className="absolute inset-0 bg-[url('/mesh-gradient.png')] bg-cover bg-center opacity-30 dark:opacity-10 -z-10"></div>
            </div>
        </div>
    )
}

