import {useQuery} from '@tanstack/react-query';
import ForumPostCard from "@/components/ForumPostCard.tsx";
import {getForumPosts} from "@/api/forum.ts";

export default function ForumPostsPage() {

    const {data: forumPosts, isLoading} = useQuery({
        queryKey: ['forumPosts'],
        queryFn: getForumPosts,
    })



    console.log(forumPosts)

    if (isLoading) {
        return <div className="text-center text-gray-400">Loading posts...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 py-32 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                        Fitness Knowledge Hub
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Discover expert tips, workout guides, and nutrition advice from our certified trainers
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {forumPosts?.map((post:any) => (
                        <ForumPostCard
                            key={post._id}
                            {...post}
                            votes={post.votes || { upvotes: 0, downvotes: 0, voters: [] }}
                        />
                    ))}
                </div>

                <div className="mt-12 flex justify-center gap-4">
                    {/*<Button*/}
                    {/*    variant="outline"*/}
                    {/*    onClick={() => setPage(p => Math.max(1, p - 1))}*/}
                    {/*    disabled={page === 1}*/}
                    {/*    className="border-gray-700 text-gray-400 hover:bg-gray-800"*/}
                    {/*>*/}
                    {/*    <ChevronLeft className="w-4 h-4 mr-2"/>*/}
                    {/*    Previous*/}
                    {/*</Button>*/}
                    {/*<div className="flex items-center gap-2">*/}
                    {/*    {Array.from({length: data?.totalPages || 1}).map((_, i) => (*/}
                    {/*        <Button*/}
                    {/*            key={i}*/}
                    {/*            variant={page === i + 1 ? 'default' : 'outline'}*/}
                    {/*            onClick={() => setPage(i + 1)}*/}
                    {/*            className={`w-10 h-10 ${*/}
                    {/*                page === i + 1*/}
                    {/*                    ? 'bg-purple-500 hover:bg-purple-600'*/}
                    {/*                    : 'border-gray-700 text-gray-400 hover:bg-gray-800'*/}
                    {/*            }`}*/}
                    {/*        >*/}
                    {/*            {i + 1}*/}
                    {/*        </Button>*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                    {/*<Button*/}
                    {/*    variant="outline"*/}
                    {/*    onClick={() => setPage(p => Math.min(data?.totalPages || 1, p + 1))}*/}
                    {/*    disabled={page === (data?.totalPages || 1)}*/}
                    {/*    className="border-gray-700 text-gray-400 hover:bg-gray-800"*/}
                    {/*>*/}
                    {/*    Next*/}
                    {/*    <ChevronRight className="w-4 h-4 ml-2"/>*/}
                    {/*</Button>*/}
                </div>
            </div>
        </div>
    );
}