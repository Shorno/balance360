import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TrainerListProps {
    trainers: Array<{
        id: string
        name: string
        image: string
    }>
}

export default function TrainerList({ trainers }: TrainerListProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {trainers.slice(0, 5).map((trainer) => (
                <Avatar
                    key={trainer.id}
                    className="w-10 h-10 cursor-pointer hover:ring-2 hover:ring-purple-400 transition-all"
                    onClick={() => console.log(`Navigate to trainer ${trainer.id}`)}
                >
                    <AvatarImage src={trainer.image} alt={trainer.name} />
                    <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
                </Avatar>
            ))}
        </div>
    )
}

