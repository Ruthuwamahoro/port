import axios from "axios";

export interface ContactPayload {
    name: string;
    email: string;
    message: string;
}

export async function sendContact(payload: ContactPayload) {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/contacts`,
            payload
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message ?? error.message);
        }
        const err = error instanceof Error ? error.message : "Internal Server Error";
        throw new Error(err);
    }
}