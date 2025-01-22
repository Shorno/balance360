import {Card, CardContent} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Award, Calendar, ChevronRight, Clock} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router";

export interface TrainerInfoDetails {
    _id: string
    fullName: string
    email: string
    profileImage: string
    yearsOfExperience: number
    age: number
    availableDays: string[]
    availableTime: string
    details: string
    skills: string[]
}

export default function TrainerCard({trainer}: { trainer: TrainerInfoDetails }) {
    return (
            <Card
                key={trainer._id}
                className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 group"
            >
                <CardContent className="p-0">
                    <div className="relative">
                        <div className="aspect-[4/3] overflow-hidden">
                            <img
                                src={trainer.profileImage}
                                alt={trainer.fullName}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="absolute top-4 right-4">
                            <Badge className="bg-purple-500/90 text-white">
                                {trainer.availableDays.length} days available
                            </Badge>
                        </div>
                    </div>

                    {/* Trainer Info */}
                    <div className="p-6 space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors mb-2">
                                {trainer.fullName}
                            </h3>
                            <p className="text-gray-300 line-clamp-2">{trainer.details}</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-300">
                                <Award className="w-4 h-4 text-purple-400"/>
                                <span>{trainer.yearsOfExperience} years of experience</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <Clock className="w-4 h-4 text-purple-400"/>
                                <span>{trainer.availableTime}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <Calendar className="w-4 h-4 text-purple-400"/>
                                <span>{trainer.availableDays.join(", ")}</span>
                            </div>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-gray-400 mb-2">Skills & Expertise</p>
                            <div className="flex flex-wrap gap-2">
                                {trainer.skills.map((skill) => (
                                    <Badge
                                        key={skill}
                                        className="bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                    >
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>


                       <Link to={trainer._id}>
                           <Button
                               className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                           >
                               View Profile
                               <ChevronRight className="w-4 h-4 ml-2"/>
                           </Button>
                       </Link>
                    </div>
                </CardContent>
            </Card>
    )
}