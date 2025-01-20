import * as React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TimePickerProps {
    onChange: (time: string) => void
}

export function TimePicker({ onChange }: TimePickerProps) {
    const [hour, setHour] = React.useState("12")
    const [minute, setMinute] = React.useState("00")
    const [period, setPeriod] = React.useState("AM")

    React.useEffect(() => {
        onChange(`${hour}:${minute} ${period}`)
    }, [hour, minute, period, onChange])

    return (
        <div className="flex flex-col space-y-2">
            <div className="flex space-x-2" id="time-picker">
                <Select value={hour} onValueChange={setHour}>
                    <SelectTrigger className="w-[70px] bg-gray-800 border-gray-600 text-white focus:ring-purple-400">
                        <SelectValue placeholder="Hour" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                            <SelectItem key={h} value={h.toString().padStart(2, '0')} className="text-white hover:bg-gray-700">
                                {h.toString().padStart(2, '0')}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={minute} onValueChange={setMinute}>
                    <SelectTrigger className="w-[70px] bg-gray-800 border-gray-600 text-white focus:ring-purple-400">
                        <SelectValue placeholder="Min" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                            <SelectItem key={m} value={m.toString().padStart(2, '0')} className="text-white hover:bg-gray-700">
                                {m.toString().padStart(2, '0')}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger className="w-[70px] bg-gray-800 border-gray-600 text-white focus:ring-purple-400">
                        <SelectValue placeholder="AM/PM" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        <SelectItem value="AM" className="text-white hover:bg-gray-700">AM</SelectItem>
                        <SelectItem value="PM" className="text-white hover:bg-gray-700">PM</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
