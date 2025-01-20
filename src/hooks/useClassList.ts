import {useQuery} from "@tanstack/react-query";
import {getAllClasses} from "@/api/class.ts";

export const useClassList = () => {
    const {data: classList, isLoading, isError} = useQuery({
        queryKey: ['classes'],
        queryFn: () => getAllClasses(),
        select: (data) => data?.data
    })

    return {classList, isLoading, isError}

}