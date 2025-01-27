import {useQuery} from '@tanstack/react-query';
import ForumPostCard from "@/components/ForumPostCard.tsx";
import {LoadingState} from "@/components/data-states/loading-state.tsx";
import {useNavigate, useParams} from "react-router";
import {getForumPosts} from "@/api/forum.ts";
import ForumPagination from "@/components/ForumPagination.tsx";
import useDynamicTitle from "@/hooks/useDynamicTitle.tsx";

const ITEMS_PER_PAGE = 6;

export default function ForumPostsPage() {
    useDynamicTitle("Forums")
    const {page} = useParams<{ page?: string }>();
    const navigate = useNavigate();
    const currentPage = parseInt(page || '1', 10) || 1;

    const {data: forumData, isLoading} = useQuery({
        queryKey: ['forumPosts', currentPage],
        queryFn: () => getForumPosts(currentPage, ITEMS_PER_PAGE),
    });

    const handlePageChange = (newPage: number) => {
        navigate(`/community/${newPage}`);
    };

    return (
        <div className="min-h-screen bg-gray-900 py-32 px-6 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                        Fitness Knowledge Hub
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Discover expert tips, workout guides, and nutrition advice from our certified trainers.
                    </p>
                </div>

                {isLoading ? (
                    <LoadingState/>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                            {forumData?.data.map((post: any) => (
                                <ForumPostCard
                                    key={post._id}
                                    {...post}
                                    votes={post.votes || {upvotes: 0, downvotes: 0, voters: []}}
                                />
                            ))}
                        </div>

                        {forumData && forumData.totalPages > 0 && (
                            <ForumPagination
                                currentPage={currentPage}
                                totalPages={forumData.totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
