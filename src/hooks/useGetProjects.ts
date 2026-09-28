import { getProjects } from "@/services/projects"
import { useQuery } from "@tanstack/react-query"

export const useGetProjects = () => {
    const { data, isPending, error} = useQuery({
        queryKey: ['projects'],
        queryFn: getProjects,
    })

    return {
        data,
        isPending,
        error
    }
}