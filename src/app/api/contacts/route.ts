import { sendResponse } from "@/utils/Response";
import { sendMail } from "@/utils/sendMail";
import { contactsSchema } from "@/validations/contacts";
import { NextRequest } from "next/server";

export async function POST (req: NextRequest){
    try{
        let body: unknown;
        try{
            body = await req.json();
        } catch {
            body = {}
        }

        const validatedData = contactsSchema.safeParse(body);
        if(!validatedData.success){
            const errors = Object.fromEntries(
                Object.entries(validatedData.error.flatten().fieldErrors).map(([k,v]) => [k,v ?? []])
            )
            return sendResponse(400, {errors}, "Validation failed");
        }

        const {name, email, message} = validatedData.data;
        if(!name || !email || !message){
            return sendResponse(400, null, "All fields are required");
        }

        await sendMail(name, email, message);
        return sendResponse(200, null, "Message sent successfully");
    } catch(error){
        return sendResponse(500, null, error instanceof Error ? error.message : "Internal Server Error");
    }
}