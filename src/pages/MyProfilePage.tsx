import {useState, useRef, useEffect} from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {Camera, Mail, Clock, Loader2, MapPin, LinkIcon, Edit2} from "lucide-react"
import {updateProfile} from "firebase/auth"
import toast from "react-hot-toast"
import useAuthStore from "@/store/authStore"
import {useImageUpload} from "@/hooks/useImageUpload"
import {createUserInDB, getUserDetails} from "@/api/user.ts"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {LoadingState} from "@/components/data-states/loading-state.tsx";

const formSchema = z.object({
    fullName: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    profileImage: z.string().url({
        message: "Please provide a valid image URL.",
    }),
    bio: z.string().max(160, {
        message: "Bio must not exceed 160 characters.",
    }),
    location: z.string().max(50, {
        message: "Location must not exceed 50 characters.",
    }),
    website: z.string().url().or(z.literal("")),
})

type FormValues = z.infer<typeof formSchema>

export default function ClientProfilePage() {
    const {currentUser} = useAuthStore()
    const {mutateAsync: uploadImage, isPending: isUploading} = useImageUpload()
    const [isEditing, setIsEditing] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const queryClient = useQueryClient()


    const {data: userDetails, isLoading} = useQuery({
        queryKey: ["user-details"],
        queryFn: () => getUserDetails(currentUser?.email || ""),
    })

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: currentUser?.displayName || "",
            profileImage: currentUser?.photoURL || "",
            bio: userDetails?.bio || "",
            location: userDetails?.location || "",
            website: userDetails?.website || "",
        },
    })

    useEffect(() => {
        if (userDetails) {
            form.reset({
                fullName: currentUser?.displayName || "",
                profileImage: currentUser?.photoURL || "",
                bio: userDetails.bio || "",
                location: userDetails.location || "",
                website: userDetails.website || "",
            });
        }
    }, [userDetails, currentUser, form]);



   if (isLoading) return  <LoadingState className={"mt-40"}/>


    const {isSubmitting} = form.formState;


    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        try {
            const imageUrl = await uploadImage(file)
            form.setValue("profileImage", imageUrl, {shouldValidate: true})
            toast.success("Image uploaded successfully")
        } catch {
            toast.error("Failed to upload image. Please try again.")
        }
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    const onSubmit = async (data: FormValues) => {
        if (!currentUser) {
            toast.error("User not found. Please login again.")
            return
        }

        try {
            await updateProfile(currentUser, {
                displayName: data.fullName,
                photoURL: data.profileImage,
            })

            const updatedUser = {
                ...currentUser,
                bio: data.bio,
                location: data.location,
                website: data.website
            }
            await createUserInDB(updatedUser)
            await queryClient.invalidateQueries({ queryKey: ["user-details"] })


            setIsEditing(false)
            toast.success("Profile updated successfully.")
        } catch {
            toast.error("Failed to update profile. Please try again.")
        }
    }

    const formatLastLogin = (date: string) => {
        if (!date) return "Never"
        return new Date(date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <div className="min-h-screen py-32 dark:bg-gray-900  px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                <div className="relative h-48 bg-gradient-to-r from-purple-400 to-pink-500">
                    <div className="absolute -bottom-12 left-8">
                        <div className="relative">
                            <img
                                src={form.watch("profileImage") || "/placeholder.svg"}
                                alt="Profile"
                                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"
                            />
                            {isEditing && (
                                <button
                                    onClick={triggerFileInput}
                                    className="absolute bottom-0 right-0 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    disabled={isUploading}
                                >
                                    {isUploading ? (
                                        <Loader2 className="w-5 h-5 text-gray-600 dark:text-gray-300 animate-spin"/>
                                    ) : (
                                        <Camera className="w-5 h-5 text-gray-600 dark:text-gray-300"/>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <Edit2 className="w-5 h-5 text-gray-600 dark:text-gray-300"/>
                        </button>
                    )}
                </div>
                <div className="pt-16 px-8 pb-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                {isEditing ? (
                                    <FormField
                                        control={form.control}
                                        name="fullName"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className="text-2xl font-bold text-gray-900 dark:text-white bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 px-0"
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                ) : (
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{form.watch("fullName")}</h1>
                                )}
                                <p className="text-gray-600 dark:text-gray-400 flex items-center">
                                    <Mail className="w-4 h-4 mr-2"/>
                                    {currentUser?.email}
                                </p>
                            </div>

                            {isEditing ? (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="bio"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Bio</FormLabel>
                                                <FormControl>
                                                    <Textarea {...field} placeholder="Tell us about yourself"
                                                              className="resize-none"/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="location"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Location</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="Your location"/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="website"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Website</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="https://yourwebsite.com"/>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </>
                            ) : (
                                <div className="space-y-4">
                                    <p className="text-gray-700 dark:text-gray-300">{userDetails?.bio ?? "No bio provided"}</p>
                                    {userDetails?.location && (
                                        <p className="text-gray-600 dark:text-gray-400 flex items-center">
                                            <MapPin className="w-4 h-4 mr-2"/>
                                            {userDetails?.location}
                                        </p>
                                    )}
                                    {userDetails?.website && (
                                        <p className="text-gray-600 dark:text-gray-400 flex items-center">
                                            <LinkIcon className="w-4 h-4 mr-2"/>
                                            <a
                                                href={form.watch("website")}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:underline"
                                            >
                                                {userDetails?.website}
                                            </a>
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <Clock className="w-4 h-4 mr-2"/>
                                Last login: {formatLastLogin(currentUser?.metadata.lastSignInTime || "")}
                            </div>

                            {isEditing && (
                                <div className="flex justify-end space-x-4">
                                    <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting || isUploading}
                                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                                    >
                                        {(isSubmitting || isUploading) &&
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                                        {isSubmitting ? "Saving..." : "Save Changes"}
                                    </Button>
                                </div>
                            )}
                        </form>
                    </Form>
                </div>
            </div>
            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
            />
        </div>
    )
}

