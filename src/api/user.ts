import {api, secureApi} from "@/lib/axios.ts";
import {User} from "firebase/auth";

export const createUserInDB = async (user: User) => {
    const dbUser = {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
    };

    const response = await secureApi.post('/users', dbUser);
    const token = response.data.token;
    localStorage.setItem('token', token);
    return response.data;
}

export const getRoleByEmail = async (email: string) => {
    const response = await api.get(`/users/role/${email}`);
    return response.data;
}

export const getApplicationStatus = async (email: string) => {
    const response = await api.get(`/users/application/${email}`);
    return response.data;
}


export const getUserDetails = async (email: string) => {
    console.log(email)
    const response = await api.get(`/users/info/${email}`);
    return response.data;
}

export const addReview = async (review: any) => {
    console.log(review)
    const response = await secureApi.post(`/reviews`, review);
    return response.data;
}

export const getAllUsers = async () => {
    const response = await secureApi.get(`/users/all`);
    return response.data;
}

// export const getUsersWithReviews = async () => {
//     const response = await secureApi.get(`/users/reviews`);
//     return response.data;
// }