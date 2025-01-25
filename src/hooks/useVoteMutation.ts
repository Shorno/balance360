import {useMutation, useQueryClient} from '@tanstack/react-query';
import {voteOnPost} from '@/api/forum';
import useAuthStore from "@/store/authStore.ts";

interface Vote {
    email: string;
    voteType: 'up' | 'down';
}

interface Post {
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
            voteOnPost(postId, voteType),
        onMutate: async ({postId, voteType}) => {
            await queryClient.cancelQueries({queryKey: ['forumPosts']});

            const previousPosts = queryClient.getQueryData<Post[]>(['forumPosts']);

            queryClient.setQueryData<Post[]>(['forumPosts'], (old = []) =>
                old.map(post => {
                    if (post._id === postId) {
                        const newVoters = post.votes.voters
                            .filter(v => v.email !== currentUser?.email)
                            .concat(currentUser?.email ? {email: currentUser.email, voteType} : []);

                        return {
                            ...post,
                            votes: {
                                upvotes: voteType === 'up' ? post.votes.upvotes + 1 : post.votes.upvotes,
                                downvotes: voteType === 'down' ? post.votes.downvotes + 1 : post.votes.downvotes,
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