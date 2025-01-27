import {useMutation, useQueryClient} from '@tanstack/react-query';
import {voteOnPost} from '@/api/forum';
import useAuthStore from "@/store/authStore.ts";

interface Vote {
    email: string;
    voteType: 'up' | 'down';
}

export interface Post {
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
        voters: Vote[];
    };
}

export const useVoteMutation = () => {
    const queryClient = useQueryClient();
    const {currentUser} = useAuthStore();

    return useMutation({
        mutationFn: ({postId, voteType}: { postId: string; voteType: 'up' | 'down' }) =>
            voteOnPost(postId, voteType, currentUser?.email),
        onMutate: async ({postId, voteType}) => {
            await queryClient.cancelQueries({queryKey: ['forumPosts']});
            const previousPosts = queryClient.getQueryData<Post[]>(['forumPosts']);

            queryClient.setQueryData<Post[]>(['forumPosts'], (old = []) =>
                old.map(post => {
                    if (post._id === postId) {
                        const existingVote = post.votes.voters.find(v => v.email === currentUser?.email);
                        let newVoters = [...post.votes.voters];
                        let newUpvotes = post.votes.upvotes;
                        let newDownvotes = post.votes.downvotes;

                        if (existingVote) {
                            newUpvotes -= existingVote.voteType === 'up' ? 1 : 0;
                            newDownvotes -= existingVote.voteType === 'down' ? 1 : 0;
                            newVoters = newVoters.filter(v => v.email !== currentUser?.email);

                            if (existingVote.voteType === voteType) {
                                return {
                                    ...post,
                                    votes: {
                                        upvotes: newUpvotes,
                                        downvotes: newDownvotes,
                                        voters: newVoters
                                    }
                                };
                            }
                        }

                        newUpvotes += voteType === 'up' ? 1 : 0;
                        newDownvotes += voteType === 'down' ? 1 : 0;
                        newVoters.push({email: currentUser?.email || '', voteType});

                        return {
                            ...post,
                            votes: {
                                upvotes: newUpvotes,
                                downvotes: newDownvotes,
                                voters: newVoters
                            }
                        };
                    }
                    return post;
                })
            );
            return {previousPosts};
        },
        onError: (_err, _variables, context) => {
            queryClient.setQueryData(['forumPosts'], context?.previousPosts);
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['forumPosts']});
        }
    });
};