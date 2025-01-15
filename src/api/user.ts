import {api} from "@/lib/axios.ts";
import {User} from "firebase/auth";

export const createUserInDB = async (user: User) => {
    const dbUser = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
    };

    const response = await api.post('/users', dbUser);
    const token = response.data.token;
    localStorage.setItem('token', token);
    return response.data;
}