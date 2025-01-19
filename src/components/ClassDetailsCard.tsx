import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {ClassFormValues} from "@/schema/schema.ts";
import {Clock, Dumbbell, Users} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";



export default function ClassDetailsCard({classItem} : {classItem: ClassFormValues}) {
    return (
        <Card
              className="bg-gray-800/50 border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all duration-300">
            <div className="aspect-video w-full overflow-hidden">
                <img
                    src={classItem?.image}
                    alt={classItem?.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                       <div className={"flex justify-between items-center"}>
                           <CardTitle className="text-xl text-white mb-2">{classItem?.name}</CardTitle>
                           <Badge
                               variant="secondary"
                               className="bg-purple-500/20 text-purple-300 border border-purple-500/30"
                           >
                               {classItem?.category}
                           </Badge>
                       </div>
                        <CardDescription className="text-gray-400">
                            {classItem?.details}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-purple-400"/>
                        {classItem?.duration}
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-400"/>
                        Max {classItem?.maxParticipants}
                    </div>
                    <div className="flex items-center gap-2">
                        <Dumbbell className="w-4 h-4 text-purple-400"/>
                        {classItem?.intensity}
                    </div>
                </div>

                {/*<div>*/}
                {/*    <h4 className="text-sm font-medium text-gray-300 mb-3">Class Trainers</h4>*/}
                {/*    <div className="flex -space-x-2 overflow-hidden">*/}
                {/*        <TooltipProvider>*/}
                {/*            {classItem.trainers.map((trainer) => (*/}
                {/*                <Tooltip key={trainer.id}>*/}
                {/*                    <TooltipTrigger>*/}
                {/*                        <Avatar*/}
                {/*                            className="border-2 border-gray-800 cursor-pointer hover:scale-105 transition-transform"*/}
                {/*                            // onClick={() => handleTrainerClick(trainer.id)}*/}
                {/*                        >*/}
                {/*                            <AvatarImage src={trainer.image} alt={trainer.name}/>*/}
                {/*                            <AvatarFallback>{trainer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>*/}
                {/*                        </Avatar>*/}
                {/*                    </TooltipTrigger>*/}
                {/*                    <TooltipContent>*/}
                {/*                        <div className="text-sm">*/}
                {/*                            <p className="font-medium">{trainer.name}</p>*/}
                {/*                            <p className="text-xs text-gray-400">{trainer.specialization}</p>*/}
                {/*                        </div>*/}
                {/*                    </TooltipContent>*/}
                {/*                </Tooltip>*/}
                {/*            ))}*/}
                {/*        </TooltipProvider>*/}
                {/*    </div>*/}
                {/*</div>*/}

            </CardContent>
        </Card>
    )
}

