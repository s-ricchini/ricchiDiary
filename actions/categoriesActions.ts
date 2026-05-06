'use server'

import { FormState,hex } from "@/types/types"
import { newCategory } from "@/queries/categories"
import { revalidatePath } from "next/cache"

export async function createNewCategory(prevState:FormState, data: FormData) {
    
    const name = data.get('name') as string
    const color = data.get('color') as hex

    console.log(name)
    console.log(color)


    try {

        await newCategory(name,color)
        revalidatePath('/dashboard/')
        return {success:true}    
    } catch (error) {
        console.error(error)
        return {error:"Error at creating the category "}
    }

}