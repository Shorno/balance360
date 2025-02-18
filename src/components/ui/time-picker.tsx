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
                    <SelectTrigger className="w-[70px] dark:border border-gray-300/50">
                        <SelectValue placeholder="Hour" />
                    </SelectTrigger>
                    <SelectContent className="dark:border border-gray-300/50 dark:bg-gray-900">
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                            <SelectItem key={h} value={h.toString().padStart(2, '0')}>
                                {h.toString().padStart(2, '0')}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={minute} onValueChange={setMinute}>
                    <SelectTrigger className="w-[70px] dark:border border-gray-300/50">
                        <SelectValue placeholder="Min" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-900">
                        {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                            <SelectItem key={m} value={m.toString().padStart(2, '0')} className="">
                                {m.toString().padStart(2, '0')}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger className="w-[70px] dark:border border-gray-300/50">
                        <SelectValue placeholder="AM/PM" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-900">
                        <SelectItem value="AM">AM</SelectItem>
                        <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
