import {useState, useEffect} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {User, Menu, X} from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button"
import {Link} from "react-router";
import {ModeToggle} from "@/components/shared/mode-toggle.tsx";

const navItems = [
    {name: 'Home', href: '/'},
    {name: 'All Trainers', href: '/trainers'},
    {name: 'All Classes', href: '/classes'},
    {name: 'Community', href: '/community'},
]

const userNavItems = [
    {name: 'Profile', href: '/profile'},
    {name: 'Dashboard', href: '/dashboard'},
    {name: 'Settings', href: '/settings'},
]

const menuVariants = {
    open: {
        opacity: 1,
        height: 'auto',
        transition: {
            duration: 0.2,
            staggerChildren: 0.05,
            delayChildren: 0.1
        }
    },
    closed: {
        opacity: 0,
        height: 0,
        transition: {
            duration: 0.2,
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
            y: {stiffness: 500, velocity: -50}
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: {stiffness: 500}
        }
    }
}


export default function Navbar() {
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
            className={`fixed  w-full z-50 transition-colors duration-200 ${
                isScrolled ? 'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-900 dark:to-black backdrop-blur-sm shadow-lg' : 'bg-transparent'
            }`}
            initial={{y: -100}}
            animate={{y: 0}}
            transition={{duration: 0.3}}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0">
                            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">Balance360</span>
                        </Link>
                        <div className="hidden md:block ml-10">
                            <div className="flex items-baseline space-x-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className="text-gray-800 dark:text-gray-200 hover:bg-purple-200/50 dark:hover:bg-purple-800/50 hover:text-purple-700 dark:hover:text-purple-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <ModeToggle/>
                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="ml-3">
                                        <User className="h-5 w-5"/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-900 dark:to-black">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    {userNavItems.map((item) => (
                                        <DropdownMenuItem key={item.name}>
                                            <Link to={item.href}>{item.name}</Link>
                                        </DropdownMenuItem>
                                    ))}
                                    <DropdownMenuItem>Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className="md:hidden">
                        <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
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
                        className="md:hidden bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-900 dark:to-black overflow-hidden"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item) => (
                                <motion.div key={item.name} variants={menuItemVariants}>
                                    <Link
                                        to={item.href}
                                        className="text-gray-800 dark:text-gray-200 hover:bg-purple-200/50 dark:hover:bg-purple-800/50 hover:text-purple-700 dark:hover:text-purple-300 block px-3 py-2 rounded-md text-base font-medium"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                    <User className="h-8 w-8 rounded-full"/>
                                </div>
                                <div className="ml-3">
                                    <div
                                        className="text-base font-medium leading-none text-gray-800 dark:text-gray-200">John
                                        Doe
                                    </div>
                                    <div
                                        className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">john@example.com
                                    </div>
                                </div>
                                <div className="ml-auto">
                                    <ModeToggle/>
                                </div>
                            </div>
                            <div className="mt-3 px-2 space-y-1">
                                {userNavItems.map((item) => (
                                    <motion.div key={item.name} variants={menuItemVariants}>
                                        <Link
                                            to={item.href}
                                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-purple-200/50 dark:hover:bg-purple-800/50 hover:text-purple-700 dark:hover:text-purple-300"
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                                <motion.div variants={menuItemVariants}>
                                    <button
                                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-purple-200/50 dark:hover:bg-purple-800/50 hover:text-purple-700 dark:hover:text-purple-300">Logout
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}

