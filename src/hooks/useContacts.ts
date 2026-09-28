import { sendContact } from "@/services/contacts"
import { useMutation } from "@tanstack/react-query"

export const useSendContact = () => {
    const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
        mutationFn: sendContact,
    })
    return {
        mutate,
        isPending,
        isSuccess,
        isError,
        error,
        reset,
    }
}