import {api} from "@/lib/axios.ts";


export const getClassWithTrainers = async (id: string) => {
    const response = await api.get(`/classes/${id}`);
    return response.data;
}

export const featuredClasses = async () => {
    const response = await api.get('/classes/featured');
    return response.data;
}