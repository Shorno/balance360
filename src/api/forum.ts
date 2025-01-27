import {ForumPost} from "@/pages/Dashboard/Admin/ForumForm.tsx";
import {api, secureApi} from "@/lib/axios.ts";

export const postForum = async (data: ForumPost) => {
    const response = await secureApi.post('/forum', data);
    return response.data;
}

export const getForumPosts = async () => {
    const response = await api.get('/forum');
    return response.data;
}


export const voteOnPost = async (postId: string, voteType: 'up' | 'down', userEmail: string | undefined | null) => {
    const response = await secureApi.post(`/forum/${postId}/vote`, {voteType, userEmail});
    return response.data;
};