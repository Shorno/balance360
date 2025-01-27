import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Menu, X, Home, Users, Dumbbell, MessageSquare, LogInIcon, LogOutIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import { ModeToggle } from "@/components/shared/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useAuthStore from "@/store/authStore.ts"
import AuthUserProfile from "@/components/AuthUserProfile.tsx"

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "All Trainers", href: "/trainers", icon: Users },
    { name: "All Classes", href: "/classes", icon: Dumbbell },
    { name: "Community", href: "/community", icon: MessageSquare },
]

const menuVariants = {
    open: {
        opacity: 1,
        height: "auto",
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 24,
            mass: 0.8,
            staggerChildren: 0.07,
            delayChildren: 0.1,
        },
    },
    closed: {
        opacity: 0,
        height: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10,
            mass: 0.5,
            staggerChildren: 0.01,
            staggerDirection: -1,
        },
    },
}

const menuItemVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 24,
            mass: 0.8,
        },
    },
    closed: {
        y: 20,
        opacity: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 24,
            mass: 0.8,
        },
    },
}

const borderVariants = {
    hidden: { scaleX: 0 },
    visible: {
        scaleX: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 24,
            mass: 0.8,
            delay: 0.1,
        },
    },
}

export default function Navbar() {
    const { currentUser, logout } = useAuthStore()
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    const handleLogout = () => {
        logout()
        setIsOpen(false)
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <motion.nav
            className={`fixed w-full z-50 transition-all duration-300 ${
                isScrolled ? "bg-black/50 backdrop-blur-sm shadow-md" : "bg-transparent"
            }`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 24,
                mass: 0.8,
            }}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0">
                            <span className="text-2xl font-bold text-white">Balance360</span>
                        </Link>
                        <div className="hidden md:block ml-10">
                            <div className="flex items-baseline space-x-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className="text-gray-300 hover:bg-purple-500/30 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                                    >
                                        <motion.span
                                            whileHover={{ scale: 1.05 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 24,
                                                mass: 0.8,
                                            }}
                                        >
                                            {item.name}
                                        </motion.span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex gap-4 items-center md:ml-6">
                            <ModeToggle />
                            <AuthUserProfile />
                        </div>
                    </div>
                    <div className="md:hidden">
                        <Button variant="ghost" onClick={() => setIsOpen(!isOpen)} className="text-white">
                            <AnimatePresence mode="wait" initial={false}>
                                {isOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                        exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 24,
                                            mass: 0.8,
                                        }}
                                    >
                                        <X className="h-6 w-6" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                        exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 24,
                                            mass: 0.8,
                                        }}
                                    >
                                        <Menu className="h-6 w-6" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="md:hidden bg-black/90 backdrop-blur-md overflow-hidden"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                    >
                        <motion.div className="px-2 py-3 bg-purple-900/30" variants={menuItemVariants}>
                            <div className="flex w-full items-center justify-between ">
                                {!currentUser ? (
                                    <Link
                                        to="/login"
                                        className="text-gray-300 flex items-center justify-center gap-2 hover:bg-purple-500/30 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        <LogInIcon className={"rotate-180"} />
                                        Login
                                    </Link>
                                ) : (
                                    <>
                                        <div className={"flex gap-4 px-2"}>
                                            <Avatar>
                                                <AvatarImage src={currentUser?.photoURL || undefined} />
                                                <AvatarFallback>
                                                    <User className="text-purple-200" />
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="text-sm font-semibold text-white">{currentUser?.displayName}</h3>
                                                <p className="text-sm text-gray-300">{currentUser?.email}</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className={"flex gap-4 px-4"}>
                                    <ModeToggle />
                                    {currentUser && (
                                        <Button variant="destructive" onClick={handleLogout}>
                                            <LogOutIcon />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="h-px bg-purple-500/30"
                            variants={borderVariants}
                            initial="hidden"
                            animate="visible"
                        />

                        <div className="px-2 pt-2 pb-4 space-y-1">
                            {navItems.map((item) => (
                                <motion.div key={item.name} variants={menuItemVariants}>
                                    <Link
                                        onClick={() => setIsOpen(false)}
                                        to={item.href}
                                        className="flex items-center space-x-3 text-gray-300 hover:bg-purple-500/30 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        <item.icon className="h-5 w-5" />
                                        <span>{item.name}</span>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}

