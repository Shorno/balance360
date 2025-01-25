import {ForumPost} from "@/pages/Dashboard/Admin/ForumForm.tsx";
import {secureApi} from "@/lib/axios.ts";

export const postForum = async (data: ForumPost) => {
    const response = await secureApi.post('/forum', data);
    return response.data;
}

export const getForumPosts = async () => {
    const response = await secureApi.get('/forum');
    return response.data;
}


export const voteOnPost = async (postId: string, voteType: 'up' | 'down') => {
    const response = await secureApi.post(`/forum/${postId}/vote`, {voteType});
    return response.data;
};