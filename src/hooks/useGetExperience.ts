import { getExperiences } from "@/services/experiences"
import { useQuery } from "@tanstack/react-query"

export const useGetExperience = () => {
    const { data, isPending, error} = useQuery({
        queryKey: ['Experiences'],
        queryFn: getExperiences,
    })

    console.log('data from useGetExperiences hook', data)

    return {
        data,
        isPending,
        error
    }
}