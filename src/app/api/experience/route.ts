import db from "@/server/db";
import { experiences } from "@/server/db/schema";
import { sendResponse } from "@/utils/Response";
import { experienceSchema } from "@/validations/experience";
import { count, desc } from "drizzle-orm";
import { NextRequest } from "next/server";

 export async function POST ( req: NextRequest){
    try {

        let body: unknown;
        try{
            body = await req.json();
        } catch {
            body = {}
        }
        

        const validatedExperience = experienceSchema.safeParse(body);

        if(!validatedExperience.success){
            const errors = Object.fromEntries(
                Object.entries(validatedExperience.error.flatten().fieldErrors).map(([k,v]) => [k,v ?? []])
            )
            return sendResponse(400, {errors}, "Validation failed");
        }
        const { period, title, company, description, tags } = validatedExperience.data;
        if(!period || !title || !company || !description || !tags){
            return sendResponse(400, null, "All fields are required");
        }
        await db.insert(experiences).values({
            period,
            title,
            company,
            description,
            tags,
        });
        return sendResponse(200, null, "Experience added successfully");
    } catch (error) {
        return sendResponse(500, null, error instanceof Error ? error.message : "Internal Server Error");
    }
}
const PAGE_SIZE = 4;

export async function GET (req: NextRequest){
    try {
        const { searchParams } = new URL(req.url);
        const pageParam = parseInt(searchParams.get("page") ?? "1", 10);
        const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
        const offset = (page - 1) * PAGE_SIZE;

        const [allExperiences, totalResult] = await Promise.all([
            db
                .select()
                .from(experiences)
                .orderBy(desc(experiences.createdAt))
                .limit(PAGE_SIZE)
                .offset(offset),
            db.select({ count: count() }).from(experiences),
        ]);

        const total = totalResult[0]?.count ?? 0;
        const totalPages = Math.max(Math.ceil(total / PAGE_SIZE), 1);

        return sendResponse(200, {
            items: allExperiences,
            pagination: {
                page,
                pageSize: PAGE_SIZE,
                total,
                totalPages,
            },
        }, "Experiences fetched successfully");
    } catch (error) {
        return sendResponse(500, null, error instanceof Error ? error.message : "Internal Server Error");
    }
}