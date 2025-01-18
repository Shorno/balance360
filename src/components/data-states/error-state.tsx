import {Dumbbell} from "lucide-react";
import {cn} from "@/lib/utils.ts";

interface ErrorStateProps {
    className?: string
    message?: string
    retry?: () => void
}

export function ErrorState({ className, message = "Something went wrong", retry }: ErrorStateProps) {
    return (
        <div className={cn(
            "flex flex-col items-center justify-center min-h-[200px] w-1/2 text-center p-6",
            "bg-gray-800/50 border border-red-500/20 rounded-lg",
            className
        )}>
            <div className="relative mb-4">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                    <Dumbbell className="w-8 h-8 text-red-500 transform rotate-45" />
                </div>
                <div className="absolute -top-1 -right-1">
                    <div className="w-4 h-4 rounded-full bg-red-500 animate-ping" />
                    <div className="w-4 h-4 rounded-full bg-red-500 absolute inset-0" />
                </div>
            </div>
            <h3 className="text-lg font-semibold text-red-400 mb-2">Workout Interrupted</h3>
            <p className="text-gray-400 mb-4">{message}</p>
            {retry && (
                <button
                    onClick={retry}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium transition-all duration-200 transform hover:scale-105"
                >
                    Try Again
                </button>
            )}
        </div>
    )
}