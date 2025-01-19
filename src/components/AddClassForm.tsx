import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card"
import {Dumbbell, ImageIcon, Info, FileText} from 'lucide-react'
import UploadAndPreviewPhoto from "@/components/UploadAndPreviewPhoto"
import * as z from "zod"
import toast from "react-hot-toast";
import {useMutation} from "@tanstack/react-query";
import {addClass} from "@/api/admin.ts";

const classFormSchema = z.object({
    name: z.string().min(2, {
        message: "Class name must be at least 2 characters.",
    }),
    image: z.string().min(1, {
        message: "Please upload a class image.",
    }),
    details: z.string().min(10, {
        message: "Details must be at least 10 characters.",
    }),
    additionalInfo: z.string().optional(),
})

export type ClassFormValues = z.infer<typeof classFormSchema>

export default function AddNewClassForm() {
    const form = useForm<ClassFormValues>({
        resolver: zodResolver(classFormSchema),
        defaultValues: {
            name: "",
            image: "",
            details: "",
            additionalInfo: "",
        },
    })

    const {mutateAsync, isPending} = useMutation({
        mutationFn: addClass,
        onSuccess: () => {
            toast.success("Class added successfully")
        },
        onError: () => {
            toast.error("An error occurred, please try again")
        }
    })


    const onSubmit = async (data: ClassFormValues) => {
        await mutateAsync(data)
    }

    return (
        <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-4xl mx-auto bg-gray-800/50 border-gray-700">
                <CardHeader className="text-center pb-8 border-b border-gray-700">
                    <CardTitle
                        className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Add New Class
                    </CardTitle>
                    <CardDescription className="text-gray-400 mt-2">
                        Create a new fitness class for your training program
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-200">
                                            <div className="flex items-center gap-2">
                                                <Dumbbell className="w-4 h-4 text-purple-400"/>
                                                Class Name
                                            </div>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g., Advanced HIIT Training"
                                                {...field}
                                                className="bg-gray-800 border-gray-600 text-white focus:ring-purple-400"
                                            />
                                        </FormControl>
                                        <FormDescription className="text-gray-400">
                                            Choose a descriptive name for your class
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="image"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-200">
                                            <div className="flex items-center gap-2">
                                                <ImageIcon className="w-4 h-4 text-purple-400"/>
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
                                        <FormDescription className="text-gray-400">
                                            Upload a high-quality image that represents your class
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="details"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-200">
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-purple-400"/>
                                                Class Details
                                            </div>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Describe the class, its benefits, and what participants can expect..."
                                                {...field}
                                                className="bg-gray-800 border-gray-600 text-white h-32 focus:ring-purple-400"
                                            />
                                        </FormControl>
                                        <FormDescription className="text-gray-400">
                                            Provide comprehensive information about the class
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="additionalInfo"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-200">
                                            <div className="flex items-center gap-2">
                                                <Info className="w-4 h-4 text-purple-400"/>
                                                Additional Information
                                            </div>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Any additional information, requirements, or special instructions..."
                                                {...field}
                                                className="bg-gray-800 border-gray-600 text-white h-24 focus:ring-purple-400"
                                            />
                                        </FormControl>
                                        <FormDescription className="text-gray-400">
                                            Optional: Add any extra details that might be helpful
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <div className="pt-6 border-t border-gray-700">
                                <Button
                                    disabled={isPending}
                                    type="submit"
                                    className="w-full h-10 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                                >
                                    {isPending ?
                                        <Dumbbell className="text-white animate-spin" size={"50"}/>
                                        :
                                        "Add Class"

                                    }
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}