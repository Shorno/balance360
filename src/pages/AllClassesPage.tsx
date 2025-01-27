import {useQuery} from "@tanstack/react-query";
import ClassDetailsCard from "@/components/ClassDetailsCard.tsx";
import {LoadingState} from "@/components/data-states/loading-state.tsx";
import {ClassPagination} from "@/components/ClassPagination.tsx";
import {useNavigate, useParams} from "react-router";
import {getPaginatedClasses} from "@/api/public.ts";
import useDynamicTitle from "@/hooks/useDynamicTitle.tsx";

const ITEMS_PER_PAGE = 6;
export default function AllClassesPage() {
    useDynamicTitle("Classes")
    const {page} = useParams<{ page?: string }>()
    const navigate = useNavigate();
    const currentPage = parseInt(page || '1', 10) || 1;


    const {data: classesData, isLoading} = useQuery({
        queryKey: ['allClasses', currentPage],
        queryFn: () => getPaginatedClasses(currentPage, ITEMS_PER_PAGE),
    });


    const handlePageChange = (newPage: number) => {
        navigate(`/classes/${newPage}`);
    };

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

                {isLoading ? (
                    <LoadingState/>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                            {classesData?.data.map((classItem: any) => (
                                <ClassDetailsCard key={classItem._id} classItem={classItem}/>
                            ))}
                        </div>

                        {classesData && classesData.totalPages > 0 && (
                            <ClassPagination
                                currentPage={currentPage}
                                totalPages={classesData.totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}