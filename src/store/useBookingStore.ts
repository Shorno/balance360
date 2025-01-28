import {create} from 'zustand';
import {Slot} from "@/components/TimeSlots.tsx";

interface BookingState {
    slot: Slot | null;
    trainerName: string | null;
    email: string | null;
    setBookingInfo: (slot: Slot, email: string, trainerName: string) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
    slot: null,
    trainerName: null,
    email: null,
    setBookingInfo: (slot, email, trainerName) => set({slot, email, trainerName}),
}));