import {Facebook, Linkedin, Instagram, Twitter} from 'lucide-react'
import {Link} from "react-router";
import logo from "@/assets/default-monochrome-white.svg";

const socialLinks = [
    {icon: Facebook, href: '#', label: 'Facebook'},
    {icon: Linkedin, href: '#', label: 'LinkedIn'},
    {icon: Instagram, href: '#', label: 'Instagram'},
    {icon: Twitter, href: '#', label: 'Twitter'}
]

const navLinks = [
    {name: 'Home', href: '/'},
    {name: 'About', href: '/about'},
    {name: 'Features', href: '/features'},
    {name: 'Service', href: '/service'},
    {name: 'Exercise', href: '/exercise'}
]

export default function Footer() {
    return (
        <footer
            className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-900 dark:to-black w-full py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center">
                            <img
                                className={"size-32 object-center"}
                                src={logo}
                                alt={"logo"}
                            />
                        </Link>
                        <p className="text-gray-600 dark:text-gray-300 max-w-sm">
                            Your Go-To For Personalized Workouts, Meal Plans, And Expert Fitness Advice
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                                Follow Us On
                            </h3>
                            <div className="flex space-x-4">
                                {socialLinks.map((social) => (
                                    <Link
                                        key={social.label}
                                        to={social.href}
                                        className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="h-6 w-6"/>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <nav className="flex flex-wrap gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                            Contact
                        </h3>
                        <div className="space-y-2 text-gray-600 dark:text-gray-300">
                            <p>Monday-Sunday</p>
                            <p>8:00 AM - 5:00 PM</p>
                            <p className="pt-2">E-mail</p>
                            <a
                                href="mailto:balance360@gmail.com"
                                className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                            >
                                fittrack@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

