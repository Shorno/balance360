import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import Select from "react-select"
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Checkbox} from "@/components/ui/checkbox"
import UploadAndPreviewPhoto from "@/components/UploadAndPreviewPhoto"
import {TrainerFormData, trainerFormSchema} from "@/schema/schema.ts";
import useAuthStore from "@/store/authStore.ts";
import {useMutation} from "@tanstack/react-query";
import {applyForTrainer} from "@/api/trainer.ts";
import {toast} from "react-hot-toast";
import {Textarea} from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export interface TrainerApplication {
    fullName: string;
    email: string;
    yearsOfExperience: number;
    skills: string[];
    availableDays: string[];
    availableTime: string;
    profileImage: string;
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
    {value: "Sunday", label: "Sunday"},
    {value: "Monday", label: "Monday"},
    {value: "Tuesday", label: "Tuesday"},
    {value: "Wednesday", label: "Wednesday"},
    {value: "Thursday", label: "Thursday"},
    {value: "Friday", label: "Friday"},
    {value: "Saturday", label: "Saturday"},
];

export default function BecomeATrainerForm() {
    const {currentUser} = useAuthStore()

    const {mutateAsync, isPending} = useMutation({
        mutationFn: applyForTrainer,
        onSuccess: () => {
            toast.success("Your trainer application has been successfully submitted.")
        },
        onError: (error: any) => {
            console.error("Application submission error:", error)
            toast.error(`Application submission failed: ${error.message}`)
        }
    })

    const onSubmit = async (data: TrainerFormData) => {
        console.log(data)
        const transformedData = {
            ...data,
            status: data.status || 'pending'
        };

        await mutateAsync(transformedData);
    }

    const form = useForm<TrainerFormData>({
        resolver: zodResolver(trainerFormSchema),
        defaultValues: {
            email: currentUser?.email || '',
            availableDays: [],
        }
    })

    const handleImageUpload = (url: string) => {
        form.setValue('profileImage', url, {
            shouldValidate: true,
            shouldDirty: true,
        })
    }

    return (
        <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-7xl mx-auto bg-gray-800/50 border-gray-700">
                <CardHeader className="text-center pb-8 border-b border-gray-700">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Become a Trainer
                    </CardTitle>
                    <CardDescription className="text-gray-400 mt-2">
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
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-200">Full Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="John Doe"
                                                        {...field}
                                                        className="bg-gray-800 border-gray-600 text-white focus:ring-purple-400"
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-200">Email (read-only)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        readOnly
                                                        className="bg-gray-800 border-gray-600 text-white opacity-50"
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="yearsOfExperience"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-200">Years of Experience</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                        className="bg-gray-800 border-gray-600 text-white focus:ring-purple-400"
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="skills"
                                        render={() => (
                                            <FormItem>
                                                <FormLabel className="text-gray-200">Skills & Expertise</FormLabel>
                                                <div className="grid grid-cols-2 gap-3 mt-2 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                                                    {skillOptions.map((skill) => (
                                                        <FormField
                                                            key={skill}
                                                            control={form.control}
                                                            name="skills"
                                                            render={({field}) => (
                                                                <FormItem
                                                                    key={skill}
                                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                                >
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={field.value?.includes(skill) || false}
                                                                            onCheckedChange={(checked) => {
                                                                                const value = field.value || [];
                                                                                return checked
                                                                                    ? field.onChange([...value, skill])
                                                                                    : field.onChange(
                                                                                        value.filter((val) => val !== skill)
                                                                                    );
                                                                            }}
                                                                            className="border-gray-600 data-[state=checked]:bg-purple-500"
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal text-gray-300">
                                                                        {skill}
                                                                    </FormLabel>
                                                                </FormItem>
                                                            )}
                                                        />
                                                    ))}
                                                </div>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="availableDays"
                                        render={({field: {onChange, value}}) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-200">Available Days</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        isMulti
                                                        options={dayOptions}
                                                        value={dayOptions.filter((option) => value?.includes(option.value))}
                                                        onChange={(selectedOptions) =>
                                                            onChange(selectedOptions.map((option) => option.value))
                                                        }
                                                        className="react-select-container"
                                                        classNamePrefix="react-select"
                                                        styles={{
                                                            control: (base) => ({
                                                                ...base,
                                                                backgroundColor: '#1f2937',
                                                                borderColor: '#4B5563',
                                                            }),
                                                            menu: (base) => ({
                                                                ...base,
                                                                backgroundColor: '#1f2937',
                                                            }),
                                                            option: (base, state) => ({
                                                                ...base,
                                                                backgroundColor: state.isFocused ? '#374151' : '#1f2937',
                                                                color: 'white',
                                                            }),
                                                            multiValue: (base) => ({
                                                                ...base,
                                                                backgroundColor: '#374151',
                                                            }),
                                                            multiValueLabel: (base) => ({
                                                                ...base,
                                                                color: 'white',
                                                            }),
                                                            multiValueRemove: (base) => ({
                                                                ...base,
                                                                color: 'white',
                                                                ':hover': {
                                                                    backgroundColor: '#4B5563',
                                                                },
                                                            }),
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="availableTime"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-200">Available Time</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="e.g., 9:00 AM - 5:00 PM"
                                                        {...field}
                                                        className="bg-gray-800 border-gray-600 text-white focus:ring-purple-400"
                                                    />
                                                </FormControl>
                                                <FormMessage/>
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
                                                <FormLabel className="text-gray-200">Profile Image</FormLabel>
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
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="details"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-200">About You</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        {...field}
                                                        className="bg-gray-800 border-gray-600 text-white h-32 focus:ring-purple-400"
                                                        placeholder="Tell us about yourself and your training experience"
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-700">
                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
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

