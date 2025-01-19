import { useForm } from "react-hook-form"
import Select from "react-select"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, Dumbbell, Info } from 'lucide-react'

// Mock data for demonstration - replace with actual data
const mockTrainerData = {
    fullName: "John Doe",
    email: "john@example.com",
    yearsOfExperience: 5,
    skills: ["Weight Training", "Cardio", "Yoga"],
    availableDays: ["Monday", "Wednesday", "Friday"],
    availableTime: "9:00 AM - 5:00 PM",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    details: "Experienced fitness trainer specializing in strength training and cardio workouts."
}

const mockClassOptions = [
    { value: "strength-training", label: "Strength Training" },
    { value: "hiit", label: "HIIT Workout" },
    { value: "yoga", label: "Yoga Flow" },
    { value: "cardio-blast", label: "Cardio Blast" },
    { value: "pilates", label: "Pilates" },
    { value: "zumba", label: "Zumba" },
]

const dayOptions = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
]

export default function AddNewSlotForm() {
    const form = useForm({
        defaultValues: {
            slotName: "",
            slotDuration: "",
            selectedDays: mockTrainerData.availableDays,
            selectedClasses: [],
            additionalInfo: ""
        }
    })

    const onSubmit = async (data: any) => {
        console.log(data)
    }

    return (
        <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-7xl mx-auto bg-gray-800/50 border-gray-700">
                <CardHeader className="text-center pb-8 border-b border-gray-700">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Add New Training Slot
                    </CardTitle>
                    <CardDescription className="text-gray-400 mt-2">
                        Create a new training slot for your classes
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Trainer Info Section */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-8 space-y-6 h-full flex flex-col">
                                <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 flex-grow">
                                    <div className="flex items-center space-x-4 mb-6">
                                        <img
                                            src={mockTrainerData.profileImage}
                                            alt={mockTrainerData.fullName}
                                            className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">{mockTrainerData.fullName}</h3>
                                            <p className="text-sm text-gray-400">{mockTrainerData.email}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-400 mb-2">Skills</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {mockTrainerData.skills.map((skill) => (
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
                                            <h4 className="text-sm font-medium text-gray-400 mb-2">Current Availability</h4>
                                            <p className="text-sm text-gray-300">{mockTrainerData.availableTime}</p>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {mockTrainerData.availableDays.map((day) => (
                                                    <Badge key={day} variant="outline">
                                                        {day}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                        {/*<div>*/}
                                        {/*    <h4 className="text-sm font-medium text-gray-400 mb-2">About</h4>*/}
                                        {/*    <p className="text-sm text-gray-300">{mockTrainerData.details}</p>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </div>
                        </div>

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
                                                            <Clock className="w-4 h-4 text-purple-400" />
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
                                                    <FormMessage />
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
                                                            <Clock className="w-4 h-4 text-purple-400" />
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
                                                    <FormMessage />
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
                                                        <Calendar className="w-4 h-4 text-purple-400" />
                                                        Available Days
                                                    </div>
                                                </FormLabel>
                                                <FormControl>
                                                    <Select
                                                        isMulti
                                                        options={dayOptions}
                                                        value={dayOptions.filter((option) =>
                                                            value?.includes(option.value)
                                                        )}
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
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="selectedClasses"
                                        render={({field: {onChange, value}}) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-200">
                                                    <div className="flex items-center gap-2">
                                                        <Dumbbell className="w-4 h-4 text-purple-400" />
                                                        Classes
                                                    </div>
                                                </FormLabel>
                                                <FormControl>
                                                    <Select
                                                        isMulti
                                                        options={mockClassOptions}
                                                        value={mockClassOptions.filter((option) =>
                                                            value?.includes(option.value)
                                                        )}
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
                                                <FormMessage />
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
                                                        <Info className="w-4 h-4 text-purple-400" />
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
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="pt-6 border-t border-gray-700">
                                        <Button
                                            type="submit"
                                            className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                                        >
                                            Add New Slot
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