'use server'

import { connectToDatabase } from "@/database";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

export const createProfileAction = async (formData, pathToRevalidate) => {
    await connectToDatabase()
    await Profile.create(formData)
    revalidatePath(pathToRevalidate)

    // try {
        
    // } catch (error) {
    //     console.log(error);
    //     return Response.json({
    //         success: false,
    //         message: 'Something went wrong! Please try again later.'
    //     })
        
    // }
}

export const fetchProfileAction = async (id) => {
    await connectToDatabase()
    const result = await Profile.findOne({userId: id})
    return JSON.parse(JSON.stringify(result))
}