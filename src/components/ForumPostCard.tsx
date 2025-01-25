import {Card, CardHeader} from './ui/card';
import {Badge} from './ui/badge';
import {ThumbsUp, ThumbsDown, Clock, Trophy, BookOpen, Tag} from 'lucide-react';
import {Button} from './ui/button';
import {useVoteMutation} from "@/hooks/useVoteMutation.ts";
import useAuthStore from "@/store/authStore.ts";
import toast from "react-hot-toast";

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


    const {mutate: handleVote, isPending} = useVoteMutation();
    const {currentUser} = useAuthStore();

    const userVote = votes?.voters?.find(v => v.email === currentUser?.email)?.voteType;


    const tagList = tags.split(',').map(tag => tag.trim());
    const formattedContent = content.slice(0, 150) + '...';

    return (
        <Card
            className="bg-gray-800/50 border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all duration-300">
            <div className="aspect-video w-full overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>
            <CardHeader className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-semibold text-white">{title}</h2>
                            <Badge
                                variant="secondary"
                                className="bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1 capitalize"
                            >
                                <Trophy className="w-3 h-3"/>
                                {role}
                            </Badge>

                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Badge variant="outline" className="border-gray-600">
                                {category}
                            </Badge>
                            <Badge variant="outline" className="border-gray-600">
                                {difficulty}
                            </Badge>
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4"/>
                                {estimatedReadTime}
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-gray-300">{formattedContent}</p>
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {tagList.map((tag, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="bg-gray-700/50 text-gray-300"
                            >
                                <Tag className="w-3 h-3 mr-1"/>
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleVote({postId: _id, voteType: 'up'})}
                                disabled={isPending || !currentUser}
                                className={`text-gray-400 hover:text-green-400 hover:bg-green-400/10 ${
                                    userVote === 'up' ? 'text-green-400' : ''
                                } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <ThumbsUp className="w-4 h-4 mr-1"/>
                                {votes.upvotes}
                            </Button>

                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleVote({postId: _id, voteType: 'down'})}
                                disabled={isPending || !currentUser}
                                className={`text-gray-400 hover:text-red-400 hover:bg-red-400/10 ${
                                    userVote === 'down' ? 'text-red-400' : ''
                                } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <ThumbsDown className="w-4 h-4 mr-1"/>
                                {votes.downvotes}
                            </Button>
                        </div>
                        <Button
                            onClick={() => toast('Feature coming soon!',{icon: 'ℹ️'})}
                            variant="ghost"
                            size="sm"
                            className="text-purple-400 hover:bg-purple-400/10"
                        >
                            <BookOpen className="w-4 h-4 mr-1"/>
                            Read More
                        </Button>
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
}