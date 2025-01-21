import {api} from "@/lib/axios.ts";

export const getAllClasses = async () => {
    const response = await api.get('/classes');
    return response.data;
}

export const getClassWithTrainers = async (id: string) => {
    const response = await api.get(`/classes/${id}`);
    return response.data;
}