import { motion } from "framer-motion"
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {Link} from "react-router";

interface SocialLink {
    platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin'
    url: string
}

export interface TrainerCardProps {
    _id: string
    name: string
    image: string
    experience: number
    availableSlots: number
    socialLinks: SocialLink[]
}

const socialIcons = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin
}

export function TrainerCard({ _id, name, image, experience, availableSlots, socialLinks }: TrainerCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="overflow-hidden bg-gray-800 text-white">
                <div className="relative h-64">
                    <img
                        src={image || "/placeholder.svg"}
                        alt={name}
                    />
                </div>
                <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{name}</h3>
                    <p className="text-gray-300 mb-2">{experience} years of experience</p>
                    <p className="text-gray-300 mb-4">{availableSlots} available slots</p>
                    <div className="flex space-x-4">
                        {socialLinks.map(({ platform, url }) => {
                            const Icon = socialIcons[platform]
                            return (
                                <a
                                    key={platform}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors"
                                    aria-label={`${name}'s ${platform} profile`}
                                >
                                    <Icon size={20} />
                                </a>
                            )
                        })}
                    </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                    <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                        <Link to={`/trainers/${_id}`}>
                            Know More
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    )
}

