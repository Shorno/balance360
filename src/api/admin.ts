import {secureApi} from "@/lib/axios.ts";

export const getTrainerApplications = async () => {
    const response = await secureApi.get('/admin/trainer-applications');
    return response.data;
}

export const getTrainerApplicationDetails = async (id: string) => {
    const response = await secureApi.get(`/admin/trainer-applications/${id}`);
    return response.data;
}