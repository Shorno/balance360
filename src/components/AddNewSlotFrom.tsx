import {useForm} from "react-hook-form"
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
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Clock, Calendar, Dumbbell, Info, SaveIcon} from 'lucide-react'
import {useMutation, useQuery} from "@tanstack/react-query";
import {addSlot, getTrainerDetails} from "@/api/trainer.ts";
import useAuthStore from "@/store/authStore.ts";
import {AddNewSlotFormData, addNewSlotSchema, TrainerFormData} from "@/schema/schema.ts";
import {LoadingState} from "@/components/data-states/loading-state.tsx";
import {useClassList} from "@/hooks/useClassList.ts";
import {reactSelectStyles} from "@/lib/selectStyle.ts";
import {TimePicker} from "@/components/ui/time-picker.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-hot-toast";


export default function AddNewSlotForm() {
    const {currentUser} = useAuthStore()
    const {classList} = useClassList()

    const {data: trainerInfo, isLoading} = useQuery<TrainerFormData>({
        queryKey: ['trainer', currentUser?.email],
        queryFn: () => getTrainerDetails(currentUser?.email || ""),
        select: (data) => data
    })

    const {mutateAsync, isPending} = useMutation({
        mutationFn: addSlot,
        onSuccess: () => {
            toast.success("Slot added successfully")
        },
        onError: () => {
            toast.error("Failed to add new slot")
        }
    })

    const availableDayOptions = trainerInfo?.availableDays.map(day => ({
        value: day,
        label: day
    })) || []

    const classOptions = classList?.map((classItem: { id: string; name: string }) => ({
        value: classItem.name,
        label: classItem.name
    })) as { value: string; label: string }[] || []

    const form = useForm<AddNewSlotFormData>({
        resolver: zodResolver(addNewSlotSchema),
        defaultValues: {
            slotName: "",
            slotDuration: "",
            selectedDays: trainerInfo?.availableDays || [],
            selectedClass: "",
            additionalInfo: "",
            startTime: ""
        }
    })


    const onSubmit = async (data: AddNewSlotFormData) => {
        const updatedFormData = {...data, trainerEmail: currentUser?.email}
        await mutateAsync(updatedFormData)
    }

    return (
        <div className="min-h-screen bg-gray-900 py-8  sm:px-6 lg:px-8">
            <Card className="max-w-7xl mx-auto bg-gray-800/50 border-gray-700">
                <CardHeader className="text-center pb-8 border-b border-gray-700">
                    <CardTitle
                        className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Add New Training Slot
                    </CardTitle>
                    <CardDescription className="text-gray-400 mt-2">
                        Create a new training slot for your classes
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {
                            isLoading ? (
                                    <LoadingState/>
                                )
                                :
                                (
                                    <div className="lg:col-span-1">
                                        <div className="sticky top-8 space-y-6 h-full flex flex-col">
                                            <div
                                                className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 flex-grow">
                                                <div className="flex items-center md:flex-col space-x-4 mb-6">
                                                    <img
                                                        src={trainerInfo?.profileImage}
                                                        alt={trainerInfo?.fullName}
                                                        className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
                                                    />
                                                    <div className={""}>
                                                        <h3 className="md:text-lg lg:text-center xl:text-lg font-semibold text-white">{trainerInfo?.fullName}</h3>
                                                        {/*<p className="text-sm lg:text-center text-gray-400">{trainerInfo?.email}</p>*/}
                                                    </div>
                                                </div>
                                                <div className="space-y-6">
                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-400 mb-2">Skills</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {trainerInfo?.skills.map((skill) => (
                                                                <Badge
                                                                    key={skill}
                                                                    className="bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                                                >
                                                                    {skill}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-400 mb-2">Current
                                                            Availability</h4>
                                                        <p className="text-sm text-gray-300">{trainerInfo?.availableTime}</p>
                                                        <div className="flex flex-wrap gap-2 mt-2 ">
                                                            {trainerInfo?.availableDays.map((day) => (
                                                                <Badge key={day} variant="default">
                                                                    {day}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                        }

                        <div className="lg:col-span-2">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="slotName"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-200">
                                                        <div className="flex items-center gap-2">
                                                            <SaveIcon className="w-4 h-4 text-purple-400"/>
                                                            Slot Name
                                                        </div>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="e.g., Morning Workout"
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
                                            name="slotDuration"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-200">
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="w-4 h-4 text-purple-400"/>
                                                            Duration
                                                        </div>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="e.g., 1 hour"
                                                            {...field}
                                                            className="bg-gray-800 border-gray-600 text-white focus:ring-purple-400"
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="selectedDays"
                                        render={({field: {onChange, value}}) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-200">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-purple-400"/>
                                                        Available Days
                                                    </div>
                                                </FormLabel>
                                                <FormControl>
                                                    <Select
                                                        isMulti
                                                        options={availableDayOptions}
                                                        value={availableDayOptions.filter((option) =>
                                                            value?.includes(option.value)
                                                        )}
                                                        // @ts-ignore
                                                        onChange={(selectedOptions: readonly { value: string; label: string }[]) =>
                                                            onChange(selectedOptions.map((option) => option.value))
                                                        }
                                                        className="react-select-container"
                                                        classNamePrefix="react-select"
                                                        styles={reactSelectStyles}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />


                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="selectedClass"
                                            render={({field: {onChange, value}}) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-200">
                                                        <div className="flex items-center gap-2">
                                                            <Dumbbell className="w-4 h-4 text-purple-400"/>
                                                            Select Class
                                                        </div>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Select

                                                            options={classOptions}
                                                            value={classOptions.find((option) => option.value === value)}
                                                            // @ts-ignore
                                                            onChange={(selectedOption: { value: string; label: string } | null) =>
                                                                onChange(selectedOption ? selectedOption.value : '')
                                                            }
                                                            className="react-select-container"
                                                            classNamePrefix="react-select"
                                                            styles={reactSelectStyles}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="startTime"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel className="text-gray-200">
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="w-4 h-4 text-purple-400"/>
                                                            Slot Time
                                                        </div>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <TimePicker onChange={field.onChange}/>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>


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
                                                    <Input
                                                        placeholder="Any additional details about the slot"
                                                        {...field}
                                                        className="bg-gray-800 border-gray-600 text-white focus:ring-purple-400"
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <div className="pt-6 border-t border-gray-700">
                                        <Button
                                            disabled={isPending}
                                            type="submit"
                                            className="w-full h-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white  font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                                        >
                                            {isPending ?
                                                <div><Dumbbell className={"animate-spin"}/> Adding Slot..</div>
                                                : "Add Slot"
                                            }
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}