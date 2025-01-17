import {secureApi} from "@/lib/axios.ts";

export const getTrainerApplications = async () => {
    const response = await secureApi.get('/admin/trainer-applications');
    return response.data;
}