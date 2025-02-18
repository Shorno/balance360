import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dumbbell, ImageIcon, FileText, Clock, Users, LayoutDashboardIcon } from "lucide-react"
import UploadAndPreviewPhoto from "@/components/UploadAndPreviewPhoto"
import toast from "react-hot-toast"
import { useMutation } from "@tanstack/react-query"
import { addClass } from "@/api/admin.ts"
import { classFormSchema, type ClassFormValues } from "@/schema/schema.ts"

export default function AddNewClassForm() {
    const form = useForm<ClassFormValues>({
        resolver: zodResolver(classFormSchema),
        defaultValues: {
            name: "",
            image: "",
            details: "",
            duration: "",
            maxParticipants: 0,
            intensity: "",
            category: "",
        },
    })

    const { mutateAsync, isPending } = useMutation({
        mutationFn: addClass,
        onSuccess: () => {
            toast.success("Class added successfully")
            form.reset()
        },
        onError: () => {
            toast.error("An error occurred, please try again")
        },
    })

    const onSubmit = async (data: ClassFormValues) => {
        await mutateAsync(data)
    }

    return (
        <div className="min-h-screen py-8 mt-32 sm:px-6 px-4 lg:px-8">
            <Card className="max-w-4xl mx-auto bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700">
                <CardHeader className="text-center pb-8 border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                        Add New Class
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
                        Create a new fitness class for your training program
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 dark:text-gray-200">
                                            <div className="flex items-center gap-2">
                                                <Dumbbell className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                                Class Name
                                            </div>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g., Advanced HIIT Training"
                                                {...field}
                                                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-purple-500 dark:focus:ring-purple-400"
                                            />
                                        </FormControl>
                                        <FormDescription className="text-gray-600 dark:text-gray-400">
                                            Choose a descriptive name for your class
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 dark:text-gray-200">
                                            <div className="flex items-center gap-2">
                                                <ImageIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                                Class Image
                                            </div>
                                        </FormLabel>
                                        <FormControl>
                                            <div className="h-[300px]">
                                                <UploadAndPreviewPhoto
                                                    onImageUpload={(url) => field.onChange(url)}
                                                    imageClassName="h-full w-full rounded-lg object-cover"
                                                    containerClassName="h-full"
                                                    previewClassName="h-full"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormDescription className="text-gray-600 dark:text-gray-400">
                                            Upload a high-quality image that represents your class
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="details"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700 dark:text-gray-200">
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                                Class Details
                                            </div>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Describe the class, its benefits, and what participants can expect..."
                                                {...field}
                                                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white h-32 focus:ring-purple-500 dark:focus:ring-purple-400"
                                            />
                                        </FormControl>
                                        <FormDescription className="text-gray-600 dark:text-gray-400">
                                            Provide comprehensive information about the class
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col lg:flex-row gap-10">
                                <FormField
                                    control={form.control}
                                    name="duration"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel className="text-gray-700 dark:text-gray-200">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                                    Class Duration
                                                </div>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g., 60 minutes"
                                                    {...field}
                                                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-purple-500 dark:focus:ring-purple-400"
                                                />
                                            </FormControl>
                                            <FormDescription className="text-gray-600 dark:text-gray-400">
                                                Specify the duration of the class
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="maxParticipants"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel className="text-gray-700 dark:text-gray-200">
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                                    Max Participants
                                                </div>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="e.g., 10"
                                                    {...field}
                                                    onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                                                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-purple-500 dark:focus:ring-purple-400"
                                                />
                                            </FormControl>
                                            <FormDescription className="text-gray-600 dark:text-gray-400">
                                                Specify the maximum number of participants allowed
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col lg:flex-row gap-10">
                                <FormField
                                    control={form.control}
                                    name="intensity"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel className="text-gray-700 dark:text-gray-200">
                                                <div className="flex items-center gap-2">
                                                    <Dumbbell className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                                    Intensity
                                                </div>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g., High / Medium"
                                                    {...field}
                                                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-purple-500 dark:focus:ring-purple-400"
                                                />
                                            </FormControl>
                                            <FormDescription className="text-gray-600 dark:text-gray-400">
                                                Specify the intensity level of the class
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel className="text-gray-700 dark:text-gray-200">
                                                <div className="flex items-center gap-2">
                                                    <LayoutDashboardIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                                    Category
                                                </div>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g., Dance / Martial Arts"
                                                    {...field}
                                                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-purple-500 dark:focus:ring-purple-400"
                                                />
                                            </FormControl>
                                            <FormDescription className="text-gray-600 dark:text-gray-400">
                                                Specify the category of the class
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                                <Button
                                    disabled={isPending}
                                    type="submit"
                                    className="w-full h-10 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white text-lg font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                                >
                                    {isPending ? <Dumbbell className="text-white animate-spin" size={50} /> : "Add Class"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

