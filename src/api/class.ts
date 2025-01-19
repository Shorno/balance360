import {api} from "@/lib/axios.ts";

export const getAllClasses = async () => {
    const response = await api.get('/classes');
    return response.data;
}