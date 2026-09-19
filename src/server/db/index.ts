import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/neon-http";
import dotenv from "dotenv";


dotenv.config();
let dbInstance : ReturnType<typeof drizzle> | null = null
const {DATABASE_URL} = process.env;
function initDB(){
    if(!DATABASE_URL){
        throw new Error("DATABASE_URL is not defined in environment variables");
    }

    const sql = neon(DATABASE_URL)
    return drizzle(sql, {schema})
}

const db = new Proxy({} as ReturnType<typeof drizzle>, {
    get(target, prop, receiver){
        if(!dbInstance){
            dbInstance = initDB()
        } return Reflect.get(dbInstance as object, prop,receiver)
    }
})

export default db;

