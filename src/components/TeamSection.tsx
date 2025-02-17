import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import TrainerCard from './TrainerCard';
import {useQuery} from "@tanstack/react-query";
import {LoadingState} from "@/components/data-states/loading-state.tsx";
import {getFeaturedTrainers} from "@/api/public.ts";

const TeamSection = () => {
    const {data: featuredTrainers, isLoading} = useQuery({
        queryKey: ['featured-trainers'],
        queryFn: () => getFeaturedTrainers(),
        select: (data) => data
    })

    console.log(featuredTrainers)

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">
                        Meet Our Expert Trainers
                    </h2>
                    <p className=" max-w-2xl mx-auto text-gray-700 dark:text-gray-400">
                        Work with world-class fitness professionals who are dedicated to helping
                        you achieve your fitness goals through personalized guidance and expertise.
                    </p>
                </div>

                {isLoading ? <LoadingState/> :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredTrainers?.slice(0, 3).map((trainer: any) => (
                            <TrainerCard key={trainer._id} trainer={trainer}/>
                        ))}
                    </div>
                }

                <div className="text-center mt-12">
                    <Link
                        to="/trainers"
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group"
                    >
                        <span className="text-lg">View All Trainers</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default TeamSection;