import {api} from "@/lib/axios.ts";

export const getAllClasses = async (page = 1, limit = 6) => {
    const response = await api.get(`/public/classes`, {
        params: { page, limit }
    });
    return response.data;
}

export const getAllTrainers = async () => {
    const response = await api.get(`/public/trainers`);
    return response.data;
}

export const getFeaturedTrainers = async () => {
    const response = await api.get(`/public/trainers/featured`);
    return response.data;
}

export const getUsersWithReviews = async () => {
    const response = await api.get(`/users/reviews`);
    return response.data;
}

export const getTrainerSlotsDetails = async (email: string) => {
    const response = await api.get(`/trainers/slots/details/${email}`);
    return response.data;
}

export const getTrainerSlots = async (email: string) => {
    const response = await api.get(`/trainers/slots/${email}`);
    return response.data;
}
