import {secureApi} from "@/lib/axios.ts";

export const getAllClasses = async (page = 1, limit = 6) => {
    const response = await secureApi.get(`/classes`, {
        params: { page, limit }
    });
    return response.data;
};

export const getClassWithTrainers = async (id: string) => {
    const response = await secureApi.get(`/classes/${id}`);
    return response.data;
}

export const featuredClasses = async () => {
    const response = await secureApi.get('/classes/featured');
    return response.data;
}