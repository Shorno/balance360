import { Loader2, TrashIcon, Upload } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { useImageUpload } from "@/hooks/useImageUpload";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
    onImageUpload: (url: string) => void;
    className?: string;
    containerClassName?: string;
    previewClassName?: string;
    imageClassName?: string;
}

export default function UploadAndPreviewPhoto({
                                                  onImageUpload,
                                                  className = "",
                                                  containerClassName,
                                                  previewClassName,
                                                  imageClassName,
                                              }: ImageUploadProps) {
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
        <div className={cn(
            "w-full",
            className,
            containerClassName
        )}>
            {preview ? (
                <div className={cn(
                    "relative h-full w-full flex flex-col justify-center items-center",
                    previewClassName
                )}>
                    <img
                        src={preview}
                        alt="Preview"
                        className={cn(
                            "object-cover",
                            imageClassName
                        )}
                    />
                    <div className="absolute -bottom-16 left-0 w-full ">
                        <div className="flex justify-between items-center bg-gray-800 bg-opacity-75 rounded-lg py-1 px-1">
                            <Badge className="bg-gray-700 hover:bg-red-500 text-white">
                                {fileName && fileName.length > 20 ? `${fileName.substring(0, 19)}...` : fileName}
                            </Badge>
                            <TrashIcon onClick={removeImage} className="cursor-pointer text-red-500" size={18}/>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cn(
                    "flex items-center justify-center w-full h-full"
                )}>
                    <label
                        htmlFor="dropzone-file"
                        className={cn(
                            "flex flex-col items-center justify-center w-full h-full rounded-md",
                            "border-2 border-gray-300 border-dashed cursor-pointer",
                            "bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700",
                            "hover:bg-gray-100 dark:border-gray-600",
                            "dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        )}
                    >
                        {uploading ? (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Loader2 className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400 animate-spin"/>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Uploading...</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 rounded-md">
                                <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"/>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Click to upload</span>
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">PNG , JPG or SVG</p>
                            </div>
                        )}
                        <Input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            onChange={handleImageUpload}
                            accept="image/*"
                            disabled={uploading}
                        />
                    </label>
                </div>
            )}
        </div>
    );
}