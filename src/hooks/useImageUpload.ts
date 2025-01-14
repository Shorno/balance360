import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

interface CloudinaryResponse {
    url: string;
}

export const uploadImageToCloudinary = async (file: File) : Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
    const { data } = await axios.post<CloudinaryResponse>(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return data.url;
};

export const useImageUpload = () => {
    return useMutation({
        mutationFn: uploadImageToCloudinary,
        onError: (error) => {
            console.error('Upload failed:', error);
            throw new Error('Image upload failed');
        },
    });
};

