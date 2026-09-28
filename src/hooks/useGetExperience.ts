import { getExperiences } from "@/services/experiences"
import { useQuery } from "@tanstack/react-query"

export const useGetExperience = () => {
    const { data, isPending, error} = useQuery({
        queryKey: ['Experiences'],
        queryFn: getExperiences,
    })


    return {
        data,
        isPending,
        error
    }
}