import {Card, CardHeader} from './ui/card';
import {Badge} from './ui/badge';
import {ThumbsUp, ThumbsDown, Clock, Trophy, BookOpen, Tag} from 'lucide-react';
import {Button} from './ui/button';
import {useVoteMutation} from "@/hooks/useVoteMutation.ts";
import useAuthStore from "@/store/authStore.ts";
import toast from "react-hot-toast";
import {useNavigate} from "react-router";

interface PostCardProps {
    _id: string;
    title: string;
    content: string;
    category: string;
    image: string;
    tags: string;
    difficulty: string;
    estimatedReadTime: string;
    role: string;
    votes: {
        upvotes: number;
        downvotes: number;
        voters: Array<{ email: string; voteType: 'up' | 'down' }>;
    };
}

export default function ForumPostCard({
                                          _id,
                                          title,
                                          content,
                                          category,
                                          image,
                                          tags,
                                          difficulty,
                                          estimatedReadTime,
                                          role,
                                          votes = {upvotes: 0, downvotes: 0, voters: []}
                                      }: PostCardProps) {

    const navigate = useNavigate();
    const {mutate: handleVote, isPending} = useVoteMutation();
    const {currentUser} = useAuthStore();

    const handleVoteClick = (voteType: 'up' | 'down') => {
        if (!currentUser) {
            toast.error('Please login to vote');
            navigate('/login');
            return;
        }
        handleVote({postId: _id, voteType});
    };

    const userVote = votes?.voters?.find(v => v.email === currentUser?.email)?.voteType;
    const tagList = tags.split(',').map(tag => tag.trim());
    const formattedContent = content.slice(0, 150) + '...';

    return (
        <Card className="bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all duration-300 shadow-sm dark:shadow-none h-full">
            <div className="flex flex-col h-full">
                <div className="aspect-video w-full overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>
                <CardHeader className="flex-grow flex flex-col">
                    <div className="flex-grow space-y-4">
                        <div className="flex justify-between items-start gap-4">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
                                    <Badge
                                        variant="secondary"
                                        className="bg-purple-100/80 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 flex items-center gap-1 capitalize"
                                    >
                                        <Trophy className="w-3 h-3"/>
                                        {role}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <Badge variant="outline" className="border-gray-300 dark:border-gray-600">
                                        {category}
                                    </Badge>
                                    <Badge variant="outline" className="border-gray-300 dark:border-gray-600">
                                        {difficulty}
                                    </Badge>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400"/>
                                        {estimatedReadTime}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">{formattedContent}</p>
                        <div className="flex flex-wrap gap-2">
                            {tagList.map((tag, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300"
                                >
                                    <Tag className="w-3 h-3 mr-1 text-gray-500 dark:text-gray-400"/>
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleVoteClick('up')}
                                    className={`text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-100 dark:hover:bg-green-400/10 ${
                                        userVote === 'up' ? 'text-green-600 dark:text-green-400' : ''
                                    } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <ThumbsUp className="w-4 h-4 mr-1"/>
                                    {votes.upvotes}
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleVoteClick('down')}
                                    className={`text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-400/10 ${
                                        userVote === 'down' ? 'text-red-600 dark:text-red-400' : ''
                                    } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <ThumbsDown className="w-4 h-4 mr-1"/>
                                    {votes.downvotes}
                                </Button>
                            </div>
                            <Button
                                onClick={() => toast('Feature coming soon!', {icon: 'ℹ️'})}
                                variant="ghost"
                                size="sm"
                                className="text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-400/10"
                            >
                                <BookOpen className="w-4 h-4 mr-1"/>
                                Read More
                            </Button>
                        </div>
                    </div>
                </CardHeader>
            </div>
        </Card>
    );
}