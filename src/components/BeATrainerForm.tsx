import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Select from "react-select"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import UploadAndPreviewPhoto from "@/components/UploadAndPreviewPhoto"
import { type TrainerFormData, trainerFormSchema } from "@/schema/schema.ts"
import useAuthStore from "@/store/authStore.ts"
import { useMutation } from "@tanstack/react-query"
import { applyForTrainer } from "@/api/trainer.ts"
import { toast } from "react-hot-toast"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export interface TrainerApplication {
    fullName: string
    email: string
    yearsOfExperience: number
    skills: string[]
    availableDays: string[]
    availableTime: string
    profileImage: string
}

const skillOptions = [
    "Weight Training",
    "Cardio",
    "Yoga",
    "Pilates",
    "CrossFit",
    "Nutrition",
    "Martial Arts",
    "Dance Fitness",
]

const dayOptions = [
    { value: "Sunday", label: "Sunday" },
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
]

export default function BecomeATrainerForm() {
    const { currentUser } = useAuthStore()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: applyForTrainer,
        onSuccess: () => {
            toast.success("Your trainer application has been successfully submitted.")
        },
        onError: (error: any) => {
            console.error("Application submission error:", error)
            toast.error(`Application submission failed: ${error.message}`)
        },
    })

    const onSubmit = async (data: TrainerFormData) => {
        console.log(data)
        const transformedData = {
            ...data,
            status: data.status || "pending",
        }

        await mutateAsync(transformedData)
    }

    const form = useForm<TrainerFormData>({
        resolver: zodResolver(trainerFormSchema),
        defaultValues: {
            email: currentUser?.email || "",
            availableDays: [],
        },
    })

    const handleImageUpload = (url: string) => {
        form.setValue("profileImage", url, {
            shouldValidate: true,
            shouldDirty: true,
        })
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 py-8 sm:px-6 lg:px-8">
            <Card className="max-w-7xl mx-auto bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700">
                <CardHeader className="text-center pb-8 border-b border-gray-200 dark:border-gray-700">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                        Become a Trainer
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400 mt-2">
                        Join our team of professional trainers and help others achieve their fitness goals
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="fullName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 dark:text-gray-200">Full Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="John Doe"
                                                        {...field}
                                                        className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-purple-500 dark:focus:ring-purple-400"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 dark:text-gray-200">Email (read-only)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        readOnly
                                                        className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 opacity-50"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className={"flex flex-col sm:flex-row gap-4"}>
                                        <FormField
                                            control={form.control}
                                            name="age"
                                            render={({ field }) => (
                                                <FormItem className={"flex-1"}>
                                                    <FormLabel className="text-gray-700 dark:text-gray-200">Age</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            {...field}
                                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                                                            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-purple-500 dark:focus:ring-purple-400"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="yearsOfExperience"
                                            render={({ field }) => (
                                                <FormItem className={"flex-1"}>
                                                    <FormLabel className="text-gray-700 dark:text-gray-200">Years of Experience</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            {...field}
                                                            onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                                                            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-purple-500 dark:focus:ring-purple-400"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="skills"
                                        render={() => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 dark:text-gray-200">Skills & Expertise</FormLabel>
                                                <div className="grid grid-cols-2 gap-3 mt-2 bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                                    {skillOptions.map((skill) => (
                                                        <FormField
                                                            key={skill}
                                                            control={form.control}
                                                            name="skills"
                                                            render={({ field }) => (
                                                                <FormItem key={skill} className="flex flex-row items-start space-x-3 space-y-0">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={field.value?.includes(skill) || false}
                                                                            onCheckedChange={(checked) => {
                                                                                const value = field.value || []
                                                                                return checked
                                                                                    ? field.onChange([...value, skill])
                                                                                    : field.onChange(value.filter((val) => val !== skill))
                                                                            }}
                                                                            className="border-gray-300 dark:border-gray-600 data-[state=checked]:bg-purple-500 dark:data-[state=checked]:bg-purple-400"
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal text-gray-700 dark:text-gray-300">
                                                                        {skill}
                                                                    </FormLabel>
                                                                </FormItem>
                                                            )}
                                                        />
                                                    ))}
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="availableDays"
                                        render={({ field: { onChange, value } }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 dark:text-gray-200">Available Days</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        isMulti
                                                        options={dayOptions}
                                                        value={dayOptions.filter((option) => value?.includes(option.value))}
                                                        onChange={(selectedOptions) => onChange(selectedOptions.map((option) => option.value))}
                                                        className="react-select-container"
                                                        classNamePrefix="react-select"

                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="availableTime"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 dark:text-gray-200">Available Time</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="e.g., 9:00 AM - 5:00 PM"
                                                        {...field}
                                                        className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-purple-500 dark:focus:ring-purple-400"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="space-y-6 flex flex-col h-full">
                                    <FormField
                                        control={form.control}
                                        name="profileImage"
                                        render={() => (
                                            <FormItem className="h-full">
                                                <FormLabel className="text-gray-700 dark:text-gray-200">Profile Image</FormLabel>
                                                <FormControl>
                                                    <div className="h-[calc(100%-2rem)]">
                                                        <UploadAndPreviewPhoto
                                                            onImageUpload={handleImageUpload}
                                                            imageClassName="h-full w-full rounded-lg object-cover"
                                                            containerClassName="h-full"
                                                            previewClassName="h-full"
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="details"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 dark:text-gray-200">About You</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        {...field}
                                                        className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white h-32 focus:ring-purple-500 dark:focus:ring-purple-400"
                                                        placeholder="Tell us about yourself and your training experience"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white text-lg rounded-lg transition-all duration-200 transform"
                                    disabled={isPending}
                                >
                                    {isPending ? "Submitting..." : "Apply to Become a Trainer"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

