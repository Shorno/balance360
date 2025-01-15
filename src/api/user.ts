import {DBUser} from "@/store/authStore.ts";
import {api} from "@/lib/axios.ts";

export const createUserInDB = async (fireBaseUser: DBUser) => {
    const user = {
        email: fireBaseUser.email,
        displayName: fireBaseUser.displayName,
        photoURL: fireBaseUser.photoURL
    }
    const response = await api.post('/users', user);
    const token = response.data.token;
    localStorage.setItem('jwtToken', token);
    return response.data;
}