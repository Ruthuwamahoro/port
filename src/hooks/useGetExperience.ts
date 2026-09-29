import { keepPreviousData, useQuery } from "@tanstack/react-query"

export function useGetExperience(page = 1, pageSize = 4) {
    return useQuery({
      queryKey: ["experience", page, pageSize], // page must be in the key
      queryFn: async () => {
        const res = await fetch(`/api/experience?page=${page}&pageSize=${pageSize}`);
        if (!res.ok) throw new Error("Failed to fetch experience");
        return res.json();
      },
      placeholderData: keepPreviousData, // keeps old page visible while the next loads
    });
  }