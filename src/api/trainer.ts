import {secureApi} from "@/lib/axios.ts";
import {TrainerApplication} from "@/components/BeATrainerForm.tsx";

export const applyForTrainer = async (trainer: TrainerApplication) => {
    console.log(trainer);
    const response = await secureApi.post('/trainers/apply', trainer);
    return response.data;
}