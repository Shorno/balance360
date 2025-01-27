import {useQuery} from "@tanstack/react-query";
import TrainerCard, {TrainerInfoDetails} from "@/components/TrainerCard.tsx";
import {LoadingState} from "@/components/data-states/loading-state.tsx";
import {getAllTrainers} from "@/api/public.ts";
import useDynamicTitle from "@/hooks/useDynamicTitle.tsx";


export default function AllTrainersPage() {
    useDynamicTitle("Trainers")
    const {data: trainers, isLoading} = useQuery({
        queryKey: ['trainers-list'],
        queryFn: () => getAllTrainers(),
        select: (data) => data?.data
    })


    return (
        <div className="min-h-screen bg-gray-900 py-32 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                        Our Expert Trainers
                    </h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Work with our certified fitness professionals to achieve your health and fitness goals.
                        Each trainer brings unique expertise and a personalized approach to your fitness journey.
                    </p>
                </div>

                {
                    isLoading ? <LoadingState/>
                        :
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {trainers?.map((trainer: TrainerInfoDetails) => (
                                <TrainerCard key={trainer._id} trainer={trainer}/>
                            ))}
                        </div>
                }
            </div>
        </div>
    )
}