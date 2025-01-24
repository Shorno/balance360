import {secureApi} from "@/lib/axios.ts";

export const getAllClasses = async () => {
    const response = await secureApi.get('/classes');
    return response.data;
}

export const getClassWithTrainers = async (id: string) => {
    const response = await secureApi.get(`/classes/${id}`);
    return response.data;
}