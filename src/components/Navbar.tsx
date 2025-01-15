import {useState, useEffect} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {
    User,
    Menu,
    X,
    Home,
    Users,
    Dumbbell,
    MessageSquare,
    Settings,
    LogOut,
    ChevronRight, LogInIcon,
} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {Link} from "react-router"
import {ModeToggle} from "@/components/shared/mode-toggle"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import useAuthStore from "@/store/authStore.ts";
import AuthUserProfile from "@/components/AuthUserProfile.tsx";

const navItems = [
    {name: 'Home', href: '/', icon: Home},
    {name: 'All Trainers', href: '/trainers', icon: Users},
    {name: 'All Classes', href: '/classes', icon: Dumbbell},
    {name: 'Community', href: '/community', icon: MessageSquare},
]

const userNavItems = [
    {name: 'Profile', href: '/profile', icon: User},
    {name: 'Dashboard', href: '/dashboard', icon: ChevronRight},
    {name: 'Settings', href: '/settings', icon: Settings},
]

const menuVariants = {
    open: {
        opacity: 1,
        height: 'auto',
        transition: {
            duration: 0.3,
            staggerChildren: 0.07,
            delayChildren: 0.1
        }
    },
    closed: {
        opacity: 0,
        height: 0,
        transition: {
            duration: 0.3,
            staggerChildren: 0.05,
            staggerDirection: -1,
            when: "afterChildren"
        }
    }
}

const menuItemVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: {stiffness: 1000, velocity: -100}
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: {stiffness: 1000}
        }
    }
}

const borderVariants = {
    hidden: {scaleX: 0},
    visible: {
        scaleX: 1,
        transition: {
            delay: 0.3,
            duration: 0.6
        }
    }
}

export default function Navbar() {
    const {currentUser, logout} = useAuthStore()
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)


    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.nav
            className={`fixed w-full z-50 transition-colors duration-200 ${
                isScrolled ? 'bg-black/50 backdrop-blur-sm shadow-md' : 'bg-transparent'
            }`}
            initial={{y: -100}}
            animate={{y: 0}}
            transition={{duration: 0.3}}
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
                                        className="text-gray-300 hover:bg-purple-500/30 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex gap-4 items-center md:ml-6">
                            <ModeToggle/>
                            <AuthUserProfile/>
                        </div>
                    </div>
                    <div className="md:hidden">
                        <Button variant="ghost" onClick={() => setIsOpen(!isOpen)} className="text-white">
                            <AnimatePresence mode="wait" initial={false}>
                                {isOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{opacity: 0, rotate: -90}}
                                        animate={{opacity: 1, rotate: 0}}
                                        exit={{opacity: 0, rotate: 90}}
                                        transition={{duration: 0.2}}
                                    >
                                        <X className="h-6 w-6"/>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{opacity: 0, rotate: 90}}
                                        animate={{opacity: 1, rotate: 0}}
                                        exit={{opacity: 0, rotate: -90}}
                                        transition={{duration: 0.2}}
                                    >
                                        <Menu className="h-6 w-6"/>
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
                        <motion.div
                            className="px-2 py-3 bg-purple-900/30"
                            variants={menuItemVariants}
                        >
                            <div className="flex w-full items-center justify-between ">
                                {!currentUser ? (
                                    <Link to="/login"
                                          className="text-gray-300 flex items-center justify-center gap-2 hover:bg-purple-500/30 hover:text-white px-3 py-2 rounded-md text-base font-medium">
                                        <LogInIcon className={"rotate-180"}/>
                                        Login
                                    </Link>
                                ) : (
                                    <>
                                        <Avatar>
                                            <AvatarImage src={currentUser?.photoURL || undefined}/>
                                            <AvatarFallback><User className="text-purple-200"/></AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-semibold text-white">{currentUser?.displayName}</h3>
                                            <p className="text-sm text-gray-300">{currentUser?.email}</p>
                                        </div>
                                    </>
                                )}

                                <ModeToggle/>
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
                                        to={item.href}
                                        className="flex items-center space-x-3 text-gray-300 hover:bg-purple-500/30 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        <item.icon className="h-5 w-5"/>
                                        <span>{item.name}</span>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            className="h-px bg-purple-500/30"
                            variants={borderVariants}
                            initial="hidden"
                            animate="visible"
                        />

                        <div className="px-2 pt-4 pb-3 space-y-1">
                            {userNavItems.map((item) => (
                                <motion.div key={item.name} variants={menuItemVariants}>
                                    <Link
                                        to={item.href}
                                        className="flex items-center space-x-3 text-gray-300 hover:bg-purple-500/30 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        <item.icon className="h-5 w-5"/>
                                        <span>{item.name}</span>
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div variants={menuItemVariants}>
                                <button
                                    onClick={logout}
                                    className="flex w-full items-center space-x-3 text-gray-300 hover:bg-purple-500/30 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                                >
                                    <LogOut className="h-5 w-5"/>
                                    <span>Logout</span>
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}

