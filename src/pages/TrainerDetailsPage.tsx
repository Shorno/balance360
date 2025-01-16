import { motion } from "motion/react"
import { Calendar, Clock, Award, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {Link} from "react-router";

interface Slot {
    id: string
    day: string
    time: string
}

interface TrainerDetails {
    _id: string
    name: string
    image: string
    bio: string
    expertise: string[]
    experience: number
    rating: number
    availableSlots: Slot[]
}

const trainerDetails: TrainerDetails = {
    _id: "1",
    name: "John Doe",
    image: "/images/trainers/john-doe.jpg",
    bio: "John is a certified personal trainer with over 10 years of experience in fitness and nutrition. He specializes in strength training and weight loss programs.",
    expertise: ["Strength Training", "Weight Loss", "Nutrition", "HIIT"],
    experience: 10,
    rating: 4.8,
    availableSlots: [
        { id: "1", day: "Monday", time: "9:00 AM - 10:00 AM" },
        { id: "2", day: "Monday", time: "2:00 PM - 3:00 PM" },
        { id: "3", day: "Wednesday", time: "11:00 AM - 12:00 PM" },
        { id: "4", day: "Friday", time: "4:00 PM - 5:00 PM" },
    ]
}

export default function TrainerDetailsPage() {
    return (
        <div className="bg-gray-900 min-h-screen py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Trainer Information Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="bg-gray-800 text-white overflow-hidden">
                            <div className="relative h-64 md:h-96">
                                <img
                                    src={trainerDetails.image || "/placeholder.svg"}
                                    alt={trainerDetails.name}
                                />
                            </div>
                            <CardContent className="p-6">
                                <h1 className="text-3xl font-bold mb-4">{trainerDetails.name}</h1>
                                <p className="text-gray-300 mb-4">{trainerDetails.bio}</p>
                                <div className="flex items-center mb-4">
                                    <Award className="mr-2 text-yellow-500" />
                                    <span>{trainerDetails.experience} years of experience</span>
                                </div>
                                <div className="flex items-center mb-4">
                                    <Star className="mr-2 text-yellow-500" />
                                    <span>{trainerDetails.rating} rating</span>
                                </div>
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-2">Expertise</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {trainerDetails.expertise.map((skill, index) => (
                                            <Badge key={index} variant="secondary">{skill}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Available Slots Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card className="bg-gray-800 text-white">
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-bold mb-4">Available Slots</h2>
                                <div className="grid gap-4">
                                    {trainerDetails.availableSlots.map((slot) => (
                                        <Link key={slot.id} to={`/booking/${trainerDetails._id}/${slot.id}`}>
                                            <div className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors">
                                                <div className="flex items-center mb-2">
                                                    <Calendar className="mr-2 text-purple-500" />
                                                    <span>{slot.day}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Clock className="mr-2 text-purple-500" />
                                                    <span>{slot.time}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Be A Trainer Section */}
                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <h2 className="text-3xl font-bold text-white mb-6">Want to Join Our Team?</h2>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                        Are you passionate about fitness and helping others achieve their goals?
                        Join our team of expert trainers and make a difference in people's lives!
                    </p>
                    <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                        <Link to="/become-a-trainer">
                            Become a Trainer
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </div>
    )
}

