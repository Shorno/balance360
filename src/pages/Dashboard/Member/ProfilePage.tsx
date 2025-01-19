import {Camera, User, Mail, Clock, Loader2} from 'lucide-react'
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {BreadcrumbItem, BreadcrumbPage} from "@/components/ui/breadcrumb"
import DashboardBreadcrumb from "@/components/DashboardBreadcrumb"
import useAuthStore from "@/store/authStore"
import {useImageUpload} from '@/hooks/useImageUpload'
import {updateProfile} from 'firebase/auth'
import toast from "react-hot-toast"
import {ChangeEvent, useEffect, useState, useRef} from "react"
import {createUserInDB} from "@/api/user.ts"

const breadcrumb = (
    <BreadcrumbItem>
        <BreadcrumbPage>Profile Settings</BreadcrumbPage>
    </BreadcrumbItem>
)

const formSchema = z.object({
    fullName: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    profileImage: z.string().url({
        message: "Please provide a valid image URL.",
    }),
})

type FormValues = z.infer<typeof formSchema>

export default function ProfilePage() {
    const {currentUser} = useAuthStore()
    const {mutateAsync: uploadImage, isPending: isUploading} = useImageUpload()
    const [hasChanges, setHasChanges] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: currentUser?.displayName || '',
            profileImage: currentUser?.photoURL || ''
        },
    })

    const {isSubmitting} = form.formState

    useEffect(() => {
        const subscription = form.watch((value) => {
            const hasNameChanged = value.fullName !== currentUser?.displayName
            const hasImageChanged = value.profileImage !== currentUser?.photoURL
            setHasChanges(hasNameChanged || hasImageChanged)
        })
        return () => subscription.unsubscribe()
    }, [form.watch, currentUser])

    const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        try {
            const imageUrl = await uploadImage(file)
            form.setValue('profileImage', imageUrl, {shouldValidate: true})
            toast.success("Image uploaded successfully")
        } catch (error: any) {
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
                photoURL: data.profileImage
            })
            await createUserInDB(currentUser)
            setHasChanges(false)
            toast.success("Profile updated successfully.")
        } catch (error: any) {
            toast.error("Failed to update profile. Please try again.")
        }
    }

    const formatLastLogin = (date: string) => {
        if (!date) return 'Never'
        return new Date(date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <>
            <DashboardBreadcrumb breadcrumb={breadcrumb}/>

            <div className="min-h-screen bg-gray-900 sm:p-6 lg:p-8">
                <div className="max-w-3xl mx-auto space-y-6">
                    <Card className="bg-gray-800/50 border-gray-700">
                        <CardHeader className="border-b border-gray-700">
                            <CardTitle
                                className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Profile Settings
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                                Manage your account details and preferences
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="profileImage"
                                        render={({field}) => (
                                            <FormItem className="space-y-4">
                                                <FormLabel className="text-sm font-medium text-gray-400">
                                                    Profile Picture
                                                </FormLabel>
                                                <div className="flex items-center gap-6">
                                                    <div className="relative">
                                                        <img
                                                            src={field.value}
                                                            alt="Profile"
                                                            className="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
                                                        />
                                                        <label
                                                            htmlFor="profile-image"
                                                            className={`absolute bottom-0 right-0 p-1.5 rounded-full bg-gray-800 border border-gray-600 cursor-pointer hover:bg-gray-700 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                            onClick={triggerFileInput}
                                                        >
                                                            {isUploading ? (
                                                                <Loader2
                                                                    className="w-4 h-4 mt-1 text-gray-300 animate-spin"/>
                                                            ) : (
                                                                <Camera className="w-4 h-4 text-gray-300"/>
                                                            )}
                                                        </label>
                                                    </div>
                                                    <div className="flex-1 space-y-1">
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            onClick={triggerFileInput}
                                                            disabled={isUploading}
                                                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white disabled:opacity-50"
                                                        >
                                                            Change Photo
                                                        </Button>
                                                        <p className="text-sm text-gray-500">
                                                            JPG or PNG.
                                                        </p>
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
                                                <FormMessage className="text-red-400"/>
                                            </FormItem>
                                        )}
                                    />

                                    <div className="space-y-4">
                                        <div className="grid gap-4">
                                            <FormField
                                                control={form.control}
                                                name="fullName"
                                                render={({field}) => (
                                                    <FormItem className="space-y-2">
                                                        <FormLabel className="text-sm font-medium text-gray-400">
                                                            <User className="w-4 h-4 inline-block mr-2 text-gray-500"/>
                                                            Full Name
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                className="bg-gray-800/50 border-gray-700 text-white"
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-red-400"/>
                                                    </FormItem>
                                                )}
                                            />

                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-sm font-medium text-gray-400">
                                                    <Mail className="w-4 h-4 inline-block mr-2 text-gray-500"/>
                                                    Email Address
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={currentUser?.email || ''}
                                                    disabled
                                                    className="bg-gray-800/30 border-gray-700 text-gray-400 cursor-not-allowed"
                                                />
                                                <p className="text-xs text-gray-500">Email address cannot be changed</p>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium text-gray-400">
                                                    <Clock className="w-4 h-4 inline-block mr-2 text-gray-500"/>
                                                    Last Login
                                                </Label>
                                                <p className="text-sm text-gray-300">
                                                    {formatLastLogin(currentUser?.metadata.lastSignInTime || "")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting || isUploading || !hasChanges}
                                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white disabled:opacity-50"
                                        >
                                            {(isSubmitting || isUploading) && (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                            )}
                                            {isSubmitting ? 'Updating...' : 'Save Changes'}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}