import {LoadingState} from "@/components/data-states/loading-state.tsx";
import {useQuery} from "@tanstack/react-query";
import {latestForumPosts} from "@/api/public.ts";
import ForumPostCard from "@/components/ForumPostCard.tsx";
import {Link} from "react-router";
import {ChevronRight} from "lucide-react";

export default function LatestForumPosts() {
    const {data: latestPots, isLoading} = useQuery({
        queryKey: ['latestForumPosts'],
        queryFn: () => latestForumPosts(),
        select: (data) => data
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-32 px-6 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Fitness Knowledge Hub
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Discover expert tips, workout guides, and nutrition advice from our certified trainers.
                    </p>
                </div>

                {isLoading ? <LoadingState/> : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                        {latestPots?.map((post: any) => (
                            <ForumPostCard
                                key={post._id}
                                {...post}
                                votes={post.votes || {upvotes: 0, downvotes: 0, voters: []}}
                            />
                        ))}
                    </div>
                )}

                <div className="text-center mt-12">
                    <Link
                        to="/community"
                        className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors group"
                    >
                        <span className="text-lg">Explore All Posts</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                    </Link>
                </div>
            </div>
        </div>
    );
}