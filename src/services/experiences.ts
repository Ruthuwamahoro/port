import axios from "axios";


export async function getExperiences (){

    try{

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/experience`)

        return response.data;
    } catch(error){
        const err = error instanceof Error ? error.message : "Internal Server Error";
        throw new Error(err);
    }
}