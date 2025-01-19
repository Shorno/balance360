import {secureApi} from "@/lib/axios.ts";
import {ClassFormValues} from "@/schema/schema.ts";

export const getTrainerApplications = async () => {
    const response = await secureApi.get('/admin/trainer-applications');
    return response.data;
}

export const getTrainerApplicationDetails = async (id: string) => {
    const response = await secureApi.get(`/admin/trainer-applications/${id}`);
    return response.data;
}

export const approveTrainerApplication = async (id: string) => {
    const response = await secureApi.post(`/admin/trainer-applications/${id}/approve`);
    return response.data;
}

export const getApprovedTrainers = async () => {
    const response = await secureApi.get('/admin/trainers');
    return response.data;
}

export const rejectTrainerApplication = async (id: string, rejectionReason: string) => {
    const response = await secureApi.post(`/admin/trainer-applications/${id}/reject`, { rejectionReason });
    return response.data;
};

export const addClass = async (classData: ClassFormValues) => {
    const response = await secureApi.post('/admin/classes', classData);
    return response.data;
}