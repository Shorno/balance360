import axios from 'axios'
import toast from "react-hot-toast";


export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const secureApi = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

secureApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject("from request interceptor: " + error);
    }
);

secureApi.interceptors.response.use(
    (response) => response, // Pass successful responses
    (error) => {
        if (error.response) {
            const {status, data} = error.response;

            if (status === 401 || status === 403) {
                toast.error(data?.message || "Unauthorized access");
            } else {
                toast.error(data?.message || "An error occurred");
            }
        } else {
            toast.error("Network error. Please try again later.");
        }
        return Promise.reject(error);
    }
);