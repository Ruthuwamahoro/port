import db from "@/server/db";
import { projects } from "@/server/db/schema";
import { sendResponse } from "@/utils/Response";
import { projectsSchema, updateProjectSchema } from "@/validations/projects";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";


export async function PATCH(req: NextRequest, {params}: {params: Promise<{id: string}>}){
    try {
        const { id} = await params;
        if(!id){
            sendResponse(400, null, "Project id is required");
        }

        const existingProject = await db.select().from(projects).where(eq(projects.id, id));
        if(!existingProject.length){
            sendResponse(404, null, "Project not found");
        }
        let body: unknown;
        try{
            body = await req.json();
        } catch {
            body = {}
        }

        const validatedData = updateProjectSchema.partial().safeParse(body);
        if(!validatedData.success){
            const errors = Object.fromEntries(
                Object.entries(validatedData.error.flatten().fieldErrors).map(([k,v]) => [k,v ?? []])
            )
            return sendResponse(400, {errors}, "Validation failed");
        }

        await db.update(projects).set(validatedData.data).where(eq(projects.id, id));
        return sendResponse(200, null, "Project updated successfully");

    } catch (error) {
        sendResponse(500, null, error instanceof Error ? error.message: "internal server error");
    }
}