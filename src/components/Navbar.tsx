import {useState} from "react"
import {motion, AnimatePresence} from "framer-motion"
import {
    User,
    Menu,
    X,
    Home,
    Users,
    Dumbbell,
    MessageSquare,
    LogInIcon,
    LogOutIcon,
    LayoutDashboardIcon, UserIcon
} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Link} from "react-router"
import {ModeToggle} from "@/components/shared/mode-toggle"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import useAuthStore from "@/store/authStore.ts"
import AuthUserProfile from "@/components/AuthUserProfile.tsx"
import logo from "/src/assets/default-monochrome-white.svg"
import logoLight from "/src/assets/default-monochrome-black.svg"


const publicNav = [
    {name: "Home", href: "/", icon: Home},
    {name: "All Trainers", href: "/trainers", icon: Users},
    {name: "All Classes", href: "/classes", icon: Dumbbell},
]

const userNav = [
    {name: "Home", href: "/", icon: Home},
    {name: "All Trainers", href: "/trainers", icon: Users},
    {name: "All Classes", href: "/classes", icon: Dumbbell},
    {name: "Community", href: "/community", icon: MessageSquare},
    {name: "My Profile", href: "/my-profile", icon: UserIcon},

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
    hidden: {scaleX: 0},
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
    const {currentUser, logout} = useAuthStore()
    const [isOpen, setIsOpen] = useState(false)
    const navItems = currentUser ? userNav : publicNav;

    const handleLogout = () => {
        logout()
        setIsOpen(false)
    }

    const mobileNavItems = currentUser
        ? [...navItems, {name: "Dashboard", href: "/dashboard", icon: LayoutDashboardIcon}]
        : navItems

    return (
        <motion.nav
            className={"fixed w-full z-50 transition-all duration-300 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm dark:shadow-md"}
            initial={{y: -100, opacity: 0}}
            animate={{y: 0, opacity: 1}}
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
                            <img
                                className="size-8 object-cover w-full dark:hidden"
                                src={logoLight}
                                alt="logo"
                            />
                            <img
                                className="size-8 object-cover w-full hidden dark:block"
                                src={logo}
                                alt="logo"
                            />
                        </Link>
                        <div className="hidden md:block ml-10">
                            <div className="flex items-baseline space-x-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className="text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-500/30 hover:text-purple-700 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                                    >
                                        <motion.span
                                            whileHover={{scale: 1.05}}
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
                            <ModeToggle/>
                            <AuthUserProfile/>
                        </div>
                    </div>
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 dark:text-gray-300"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {isOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{opacity: 0, rotate: -90, scale: 0.5}}
                                        animate={{opacity: 1, rotate: 0, scale: 1}}
                                        exit={{opacity: 0, rotate: 90, scale: 0.5}}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 24,
                                            mass: 0.8,
                                        }}
                                    >
                                        <X className="h-6 w-6"/>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{opacity: 0, rotate: 90, scale: 0.5}}
                                        animate={{opacity: 1, rotate: 0, scale: 1}}
                                        exit={{opacity: 0, rotate: -90, scale: 0.5}}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 24,
                                            mass: 0.8,
                                        }}
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
                        className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md overflow-hidden"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                    >
                        <motion.div
                            className="px-4 py-4 space-y-4 bg-purple-100/30 dark:bg-purple-900/30"
                            variants={menuItemVariants}
                        >
                            {currentUser ? (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={currentUser?.photoURL || undefined}/>
                                            <AvatarFallback>
                                                <User className="text-purple-600 dark:text-purple-200"/>
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                                {currentUser?.displayName}
                                            </h3>
                                            <p className="text-xs text-gray-600 dark:text-gray-300">
                                                {currentUser?.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ModeToggle/>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={handleLogout}
                                            className="dark:bg-red-600 dark:hover:bg-red-700"
                                        >
                                            <LogOutIcon className="h-4 w-4"/>
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between">
                                    <Link
                                        to="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="text-gray-700 dark:text-gray-300 flex items-center gap-2 hover:bg-purple-100 dark:hover:bg-purple-500/30 hover:text-purple-700 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        <LogInIcon className="rotate-180 h-4 w-4"/>
                                        <span>Login</span>
                                    </Link>
                                    <ModeToggle/>
                                </div>
                            )}
                        </motion.div>

                        <motion.div
                            className="h-px bg-gray-200 dark:bg-gray-700"
                            variants={borderVariants}
                            initial="hidden"
                            animate="visible"
                        />

                        <div className="px-2 pt-2 pb-4 space-y-1">
                            {mobileNavItems.map((item) => (
                                <motion.div key={item.name} variants={menuItemVariants}>
                                    <Link
                                        onClick={() => setIsOpen(false)}
                                        to={item.href}
                                        className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-500/30 hover:text-purple-700 dark:hover:text-white px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        <item.icon className="h-5 w-5"/>
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