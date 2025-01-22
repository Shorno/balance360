import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {TrainerDetails} from "@/components/ClassDetailsCard.tsx";
import {Link} from "react-router";


export default function TrainerList({trainers}: { trainers: TrainerDetails[] }) {
    return (
        <div className="flex flex-wrap gap-2">
            {trainers.slice(0, 5).map((trainer) => (
                <Link to={`/trainers/${trainer._id}`} key={trainer._id}>
                    <Avatar
                        key={trainer._id}
                        className="w-10 h-10 cursor-pointer hover:ring-2 hover:ring-purple-400 transition-all"
                    >
                        <AvatarImage src={trainer.profileImage} alt={trainer.fullName}/>
                        <AvatarFallback>{trainer.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                </Link>
            ))}
        </div>
    )
}

