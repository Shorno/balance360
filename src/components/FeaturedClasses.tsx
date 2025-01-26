import {featuredClasses} from "@/api/class.ts";
import {LoadingState} from "@/components/data-states/loading-state.tsx";
import {useQuery} from "@tanstack/react-query";
import ClassDetailsCard from "@/components/ClassDetailsCard.tsx";

export default function FeaturedClasses() {
    const {data: classList, isLoading, isError} = useQuery({
        queryKey: ['featuredClasses'],
        queryFn: () => featuredClasses(),
        select: (data) => data?.data
    })
    console.log(classList)

    if (isError) {
        return <div>Error</div>
    }


    return (
        <div className="min-h-screen bg-gray-900 py-32 px-6 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                        Explore Our Classes
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Discover a wide range of fitness classes designed to help you achieve your goals.
                        Join our expert trainers and start your fitness journey today.
                    </p>
                </div>

                {
                    isLoading ? <LoadingState/> :
                        (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                                {classList.map((classItem: any) => (
                                    <ClassDetailsCard key={classItem._id} classItem={classItem}/>
                                ))}
                            </div>
                        )
                }

            </div>
        </div>
    );
}