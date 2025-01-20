import {secureApi} from "@/lib/axios.ts";
import {TrainerApplication} from "@/components/BeATrainerForm.tsx";
import {AddNewSlotFormData} from "@/schema/schema.ts";

export const applyForTrainer = async (trainer: TrainerApplication) => {
    console.log(trainer);
    const response = await secureApi.post('/trainers/apply', trainer);
    return response.data;
}


export const getTrainerDetails = async (email: string) => {
    const response = await secureApi.get(`/trainers/${email}`);
    return response.data;
}

export const addSlot = async (slot: AddNewSlotFormData,) => {
    const response = await secureApi.post(`/trainers/slots/`, slot);
    return response.data;
}

export const getTrainerSlots = async (email: string) => {
    const response = await secureApi.get(`/trainers/slots/${email}`);
    return response.data;
}