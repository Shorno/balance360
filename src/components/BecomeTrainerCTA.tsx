import {Card, CardContent} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Dumbbell} from "lucide-react";

export default function BecomeTrainerCTA(){
    return(
        <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
            <CardContent className="p-8 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                        Want to Join Our Elite Training Team?
                    </h2>
                    <p className="text-gray-300 mb-6">
                        Share your passion for fitness and help others achieve their goals. Join our team of
                        professional
                        trainers and make a difference in people's lives.
                    </p>
                    <Button
                        // onClick={handleBecomeTrainer}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                    >
                        <Dumbbell className="w-5 h-5 mr-2"/>
                        Become a Trainer
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}