import db from "@/server/db";
import { projects } from "@/server/db/schema";
import { uploadImage } from "@/utils/cloudinary";
import { sendResponse } from "@/utils/Response";
import { projectsSchema } from "@/validations/projects";
import { desc } from "drizzle-orm";
import {NextRequest} from "next/server";

export async function POST (req: NextRequest){
    try {
        console.log("++++++++++++++++++++++++++++", req.headers.get("content-type"))
        const formData = await req.formData();
        const cover = formData.get("cover") as File 


        const rowData = {
            title: formData.get("title"),
            description: formData.get("description"),
            releaseTime: formData.get("releaseTime"),
            cover: cover,
            githubLink: formData.get("githubLink"),
            livelink: formData.get("livelink"),
            techStack: formData.get("techStack")
        }

        console.log("++++++++++++++++++++++++++++", rowData)


        const data = projectsSchema.safeParse(rowData);
        if(!data.success){
            const errors =  Object.fromEntries(
                Object.entries(data.error.flatten().fieldErrors).map(([k,v]) => [k,v ?? []])
            )

            return sendResponse(400, {errors}, "Validation failed");
        }


        

        const {title, description, releaseTime, githubLink, livelink, techStack} = await data.data;

        if (!(cover instanceof File) || cover.size === 0) {
            return sendResponse(400, null, "Cover image is required");
        }

        const arrayBuffer = await cover.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64 = `data:${cover.type};base64,${buffer.toString("base64")}`;

        const CoverImage = await uploadImage(base64);

        if (!CoverImage.startsWith("http")) {
            return sendResponse(500, null, "Failed to upload cover image");
        }

        await db.insert(projects).values({
            title,
            description,
            releaseTime,
            cover: CoverImage,
            githubLink,
            livelink,
            techStack,
        });


        return sendResponse(201, null, "Project created successfully");
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal Server Error";
        return sendResponse(500, null, message);        
    }
}

export async function GET(){
    try {
        const projectsData = (await db.select().from(projects).orderBy(desc(projects.createdAt)));
        if(!projectsData || projectsData.length === 0){
            sendResponse(404, null, "No projects found");
        }
        return sendResponse(200, projectsData, "Projects fetched successfully");
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal Server Error";
        return sendResponse(500, null, message);
        
    }
}