import {Loader2, TrashIcon, Upload} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {ChangeEvent, useState} from "react";
import {useImageUpload} from "@/hooks/useImageUpload.ts";
import {Badge} from "@/components/ui/badge.tsx";

interface ImageUploadProps {
    onImageUpload: (url: string) => void;
}

export default function UploadAndPreviewPhoto({onImageUpload}: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const uploadProfile = useImageUpload();

    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setFileName(file.name);
        setUploading(true);
        const result = await uploadProfile.mutateAsync(file);
        setUploading(false);
        setPreview(result);
        onImageUpload(result);
    };

    const removeImage = () => {
        setPreview(null);
        setFileName(null);
        onImageUpload('');
    };

    return (
        <div className="h-28 w-full">
            {preview ? (
                <div className="relative h-full w-full justify-center items-center flex">
                    <img src={preview} alt="Preview" className="size-24 object-cover rounded-full"/>
                    <div className="absolute -bottom-10 left-0 w-full">
                        <div className={"flex justify-between"}>
                            <Badge
                                className={"bg-gray-800 text-white hover:bg-gray-700"}>
                                {fileName && fileName.length > 30 ? `${fileName.substring(0, 29)}...` : fileName}
                            </Badge>
                            <TrashIcon onClick={removeImage} className={"cursor-pointer text-red-500"} size={18}/>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center my-2 justify-center w-full h-full">
                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                        {uploading ? (
                            <div className="flex flex-col items-center justify-center">
                                <Loader2 className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400 animate-spin"/>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Uploading...</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"/>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Upload Profile Photo</span>
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    PNG or JPG
                                </p>
                            </div>
                        )}
                        <Input
                            id="dropzone-file"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={uploading}
                        />
                    </label>
                </div>
            )}
        </div>
    );
}
