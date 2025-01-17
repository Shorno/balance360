export enum Role {
    Member = "member",
    Trainer = "trainer",
    Admin = "admin"
}

export interface TrainerApplicationData {
    _id: string;
    email: string;
    fullName: string;
    profileImage: string;
    skills: string[];
    availableDays: string[];
    availableTime: string;
    details: string;
    yearsOfExperience: number;
    status?: "pending" | "approved" | "rejected";
    rejectionReason?: string;
}

