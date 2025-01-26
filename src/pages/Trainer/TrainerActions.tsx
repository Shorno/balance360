import {useState} from "react";
import {Button} from "@/components/ui/button";
import {TrashIcon} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {removeTrainer} from "@/api/admin.ts";
import toast from "react-hot-toast";
import {TrainerApplicationData} from "@/types";

export function TrainerActions({row}: { row: { original: TrainerApplicationData } }) {
    const _id = row.original._id;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const queryClient = useQueryClient();


    const mutation = useMutation({
        mutationFn: () => removeTrainer(_id),
        onSuccess: () => {
            toast.success("Trainer removed successfully");
            setIsDialogOpen(false);
            queryClient.invalidateQueries({
                queryKey: ['trainers'],
                exact: true
            });


        },
        onError: (error) => {
            toast.error("Failed to remove trainer");
            console.error(error);
        }
    });

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant={"destructive"} size={"sm"}>
                    <TrashIcon className="h-4 w-4 text-red-500"/>
                    Remove Trainer
                </Button>
            </DialogTrigger>
            <DialogContent
                className="fixed left-[50%] top-[50%] z-50 grid w-[90vw] max-w-[425px] translate-x-[-50%] translate-y-[-50%] gap-4 border-gray-700 bg-gray-800 p-6 rounded-lg shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl sm:text-2xl text-white">
                        Confirm Removal
                    </DialogTitle>
                    <DialogDescription className="text-gray-400 text-sm sm:text-base">
                        Are you sure you want to remove this trainer?
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <img
                            src={row.original.profileImage}
                            alt={row.original.fullName}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <h4 className="text-base font-semibold text-white">
                                {row.original.fullName}
                            </h4>
                            <p className="text-sm text-gray-400">
                                {row.original.email}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                            className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => mutation.mutate()}
                            disabled={mutation.isPending}
                            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                        >
                            {mutation.isPending ? "Removing..." : "Confirm Removal"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}