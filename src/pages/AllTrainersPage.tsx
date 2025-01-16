import { TrainerCard, TrainerCardProps } from "@/components/TrainerCard"
import {Link} from "react-router";

const trainers: TrainerCardProps[] = [
    {
        _id: "1",
        name: "John Doe",
        image: "/images/trainers/john-doe.jpg",
        experience: 5,
        availableSlots: 3,
        socialLinks: [
            { platform: "facebook", url: "https://facebook.com/johndoe" },
            { platform: "twitter", url: "https://twitter.com/johndoe" },
            { platform: "instagram", url: "https://instagram.com/johndoe" },
            { platform: "linkedin", url: "https://linkedin.com/in/johndoe" }
        ]
    },
    {
        _id: "2",
        name: "Jane Smith",
        image: "/images/trainers/jane-smith.jpg",
        experience: 7,
        availableSlots: 2,
        socialLinks: [
            { platform: "facebook", url: "https://facebook.com/janesmith" },
            { platform: "twitter", url: "https://twitter.com/janesmith" },
            { platform: "instagram", url: "https://instagram.com/janesmith" }
        ]
    },
    {
        _id: "3",
        name: "Mike Johnson",
        image: "/images/trainers/mike-johnson.jpg",
        experience: 3,
        availableSlots: 5,
        socialLinks: [
            { platform: "facebook", url: "https://facebook.com/mikejohnson" },
            { platform: "linkedin", url: "https://linkedin.com/in/mikejohnson" }
        ]
    },
]

export default function AllTrainersPage() {
    return (
        <div className="py-32 min-h-screen bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center text-white">
                    Our Expert Trainers
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {trainers.map((trainer) => (
                        <TrainerCard key={trainer._id} {...trainer} />
                    ))}
                </div>
                <Link to={"/become-a-trainer"}>
                    <button className="bg-gray-800 text-white px-4 py-2 rounded-lg mt-8">
                        Become a Trainer
                    </button>
                </Link>
            </div>
        </div>
    )
}

